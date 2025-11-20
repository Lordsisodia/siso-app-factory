#!/usr/bin/env ts-node
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

interface TaskNode {
  domain?: string;
  page?: string;
  id?: string;
  title?: string;
  name?: string;
  [key: string]: any;
}

const cwd = process.cwd();
const planPath = join(cwd, 'BUILD-MASTER-PLAN.md');
const buildplanCandidates = [
  join(cwd, '..', 'buildplan.yaml'),
  join(cwd, '..', 'docs', '08-build-plan', 'buildplan.yaml'),
  join(cwd, 'buildplan.yaml'),
];

const args = process.argv.slice(2);
const manualDomains = getArg('--domains');
const manualStories = getArg('--stories');

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx === -1) return undefined;
  return args[idx + 1];
}

function parsePairs(input?: string): string[] {
  if (!input) return [];
  return input.split(',').map((item) => item.trim()).filter(Boolean);
}

function loadBuildplan(): any | undefined {
  for (const candidate of buildplanCandidates) {
    if (existsSync(candidate)) {
      try {
        const raw = readFileSync(candidate, 'utf8');
        return parse(raw);
      } catch (err) {
        console.warn(`[update-build-checklists] Failed to parse ${candidate}:`, err);
      }
    }
  }
  return undefined;
}

function traverse(node: any, cb: (task: TaskNode) => void) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((child) => traverse(child, cb));
    return;
  }
  if (typeof node === 'object') {
    cb(node as TaskNode);
    Object.values(node).forEach((child) => traverse(child, cb));
  }
}

const buildplan = loadBuildplan();
const domainSet = new Map<string, { domain: string; page?: string; summary?: string }>();
const storySet = new Map<string, { id: string; title?: string }>();

if (buildplan) {
  traverse(buildplan, (task) => {
    if (task.domain) {
      const key = `${task.domain}::${task.page || ''}`;
      if (!domainSet.has(key)) {
        domainSet.set(key, {
          domain: task.domain,
          page: task.page,
          summary: task.title || task.name,
        });
      }
    }
    if (task.id) {
      storySet.set(task.id, {
        id: task.id,
        title: task.title || task.name,
      });
    }
  });
}

parsePairs(manualDomains).forEach((entry) => {
  const [domain, page] = entry.split(':');
  if (domain) {
    domainSet.set(`${domain}::${page || ''}`, { domain, page });
  }
});

parsePairs(manualStories).forEach((entry) => {
  const [id, title] = entry.split(':');
  if (id) storySet.set(id, { id, title });
});

if (!existsSync(planPath)) {
  console.error(`[update-build-checklists] Cannot find ${planPath}`);
  process.exit(1);
}

const planContent = readFileSync(planPath, 'utf8');

const activeChecklistBody = domainSet.size
  ? Array.from(domainSet.values())
      .map((item) => {
        const label = item.page ? `${item.domain}/${item.page}` : item.domain;
        const suffix = item.summary ? ` – ${item.summary}` : '';
        return `- [ ] ${label}${suffix}`;
      })
      .join('\n')
  : '- [ ] (No domains detected; pass --domains or ensure buildplan has domain/page metadata.)';

const storyChecklistBody = storySet.size
  ? Array.from(storySet.values())
      .map((item) => {
        const suffix = item.title ? ` – ${item.title}` : '';
        return `- [ ] ${item.id}${suffix}`;
      })
      .join('\n')
  : '- [ ] (No stories detected; run with --stories or verify buildplan tasks have IDs.)';

let updatedContent = replaceSection(planContent, '### Active Build Checklist', activeChecklistBody);
updatedContent = replaceSection(updatedContent, '### Story Tracker', storyChecklistBody, '#### Story Sub-Checklists Template');

writeFileSync(planPath, updatedContent);
console.log('[update-build-checklists] Synced checklist sections.');

function replaceSection(content: string, header: string, newBody: string, endMarker?: string) {
  const marker = `${header}\n`;
  const start = content.indexOf(marker);
  if (start === -1) {
    console.warn(`[update-build-checklists] Header "${header}" not found.`);
    return content;
  }
  const sectionStart = start + marker.length;
  let sectionEnd: number;
  if (endMarker) {
    const endIdx = content.indexOf(endMarker, sectionStart);
    if (endIdx === -1) {
      console.warn(`[update-build-checklists] End marker "${endMarker}" not found after ${header}.`);
      return content;
    }
    sectionEnd = endIdx;
  } else {
    const nextHeaderIdx = content.indexOf('\n### ', sectionStart);
    sectionEnd = nextHeaderIdx === -1 ? content.length : nextHeaderIdx + 1;
  }
  const before = content.slice(0, sectionStart);
  const after = content.slice(sectionEnd);
  return `${before}${newBody}\n\n${after}`;
}
