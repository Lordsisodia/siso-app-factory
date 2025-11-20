#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: checklist <command> [options]');
  process.exit(1);
}
const command = args.shift();
const flags = parseFlags(args);

const handlers = {
  'setup:jtbd': setupJtbd,
  'setup:status': setupStatus,
  'discovery:refresh': discoveryRefresh,
  'phase3:ac': phase3Ac,
  'prd:shard': prdShard,
  'arch:compile': archCompile,
  'spec:verify': specVerify,
  'prd:diff': prdDiff,
  'mcp:init': mcpInit,
  'po:report': poReport,
  'logs:append': logsAppend,
  'status:complete': statusComplete,
  validate,
};

if (!handlers[command]) {
  console.error(`Unknown checklist command: ${command}`);
  process.exit(1);
}

try {
  await handlers[command](flags);
} catch (error) {
  console.error(`\n❌ ${command} failed: ${error.message}`);
  process.exit(1);
}

function parseFlags(argv) {
  const out = { _: [] };
  let pendingKey = null;
  for (const token of argv) {
    if (token.startsWith('--')) {
      pendingKey = token.replace(/^--/, '');
      if (!pendingKey) continue;
      out[pendingKey] = true;
    } else if (pendingKey) {
      out[pendingKey] = token;
      pendingKey = null;
    } else {
      out._.push(token);
    }
  }
  if (pendingKey) out[pendingKey] = true;
  return out;
}

function resolvePath(rel) {
  return path.resolve(root, rel);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readFileSafe(rel) {
  try {
    return fs.readFileSync(resolvePath(rel), 'utf8');
  } catch {
    return null;
  }
}

function writeFile(rel, data) {
  const abs = resolvePath(rel);
  ensureDir(path.dirname(abs));
  fs.writeFileSync(abs, data);
}

function appendFile(rel, data) {
  const abs = resolvePath(rel);
  ensureDir(path.dirname(abs));
  fs.appendFileSync(abs, data);
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function timestamp() {
  return new Date().toISOString();
}

function ensureProjectConfig() {
  const projectConfigPath = resolvePath('project-config.yaml');
  if (!fs.existsSync(projectConfigPath)) {
    const templatePath = resolvePath('project-setup-system/templates/project-config.yaml');
    if (fs.existsSync(templatePath)) {
      ensureDir(path.dirname(projectConfigPath));
      fs.copyFileSync(templatePath, projectConfigPath);
      console.log('Created project-config.yaml from template.');
    } else {
      writeFile('project-config.yaml', '# Auto-generated project config\n');
    }
  }
  return projectConfigPath;
}

async function setupJtbd(flags) {
  const projectConfigPath = ensureProjectConfig();
  let content = fs.readFileSync(projectConfigPath, 'utf8');
  if (/jtbd\s*:/i.test(content)) {
    console.log('JTBD block already present.');
    return;
  }
  const jtbd = flags.jtbd || 'When [trigger], [persona] wants to [job] so they can [outcome].';
  const metric = flags.metric || 'Activation rate +15% within 60 days.';
  const region = flags.region || 'Primary market TBD';
  const block = `\nproduct:\n  jtbd: "${jtbd}"\n  success_metrics:\n    - "${metric}"\n  non_goals:\n    - "Document explicit non-goals here"\n  target_regions:\n    - "${region}"\n  primary_personas:\n    - name: "Primary Persona"\n      description: "Add persona summary"\n      needs:\n        - "Primary need"\n      pains:\n        - "Primary pain"\n`;
  if (!content.endsWith('\n')) content += '\n';
  content += block;
  fs.writeFileSync(projectConfigPath, content);
  console.log('Inserted JTBD + metrics block into project-config.yaml');
}

async function setupStatus(flags) {
  const statusPath = resolvePath('project-status.json');
  let status = {};
  if (fs.existsSync(statusPath)) {
    try {
      status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
    } catch {}
  }
  status.phase = flags.phase || status.phase || 'not-started';
  status.attempt = Number(flags.attempt ?? status.attempt ?? 0);
  status.score = Number(flags.score ?? status.score ?? 0);
  status.last_artifact = status.last_artifact || null;
  status.updated_at = timestamp();
  writeFile('project-status.json', JSON.stringify(status, null, 2));
  console.log('project-status.json initialized/updated.');
}

async function discoveryRefresh(flags) {
  const filePath = 'docs/03-features/feedback.md';
  const source = flags.source || 'Manual research';
  const notes = flags.notes || 'Summaries from interviews, CRM exports, analytics, and support logs.';
  const attachments = flags.attachments || 'Link evidence or dataset path';
  const entry = `## Evidence Refresh - ${timestamp()}\n- Source: ${source}\n- Notes: ${notes}\n- Attachments: ${attachments}\n\n`;
  appendFile(filePath, entry);
  console.log(`Logged evidence ingestion entry in ${filePath}`);
}

async function phase3Ac() {
  let content = readFileSafe('docs/03-features/features.md');
  if (!content) {
    const template = readFileSafe('project-setup-system/templates/02-feature-planning.md') || '# Features\n';
    content = template;
  }
  const lines = content.split('\n');
  let inserted = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().toLowerCase().startsWith('**acceptance criteria**')) continue;
    let j = i + 1;
    let hasGherkin = false;
    while (j < lines.length) {
      const probe = lines[j].trim();
      if (!probe) {
        j++;
        continue;
      }
      if (probe.startsWith('**') || probe.startsWith('####') || probe.startsWith('---')) break;
      if (/\bgiven\b/i.test(probe)) {
        hasGherkin = true;
        break;
      }
      j++;
    }
    if (!hasGherkin) {
      const template = [
        '- [ ] Given [precondition or state]',
        '- [ ] When [action or trigger]',
        '- [ ] Then [observable outcome/metric]'
      ];
      lines.splice(i + 1, 0, ...template);
      inserted += 1;
      i += template.length;
    }
  }
  if (inserted > 0) {
    writeFile('docs/03-features/features.md', lines.join('\n'));
    console.log(`Inserted Gherkin acceptance templates for ${inserted} feature block(s).`);
  } else {
    console.log('All acceptance criteria already contain Given/When/Then coverage.');
  }
}

async function prdShard() {
  const features = readFileSafe('docs/03-features/features.md');
  if (!features) throw new Error('docs/03-features/features.md not found.');
  const regex = /####\s+(.+)\n([\s\S]*?)(?=\n####\s+|\n##\s|$)/g;
  const epicsDir = 'docs/06-pdr/epics';
  ensureDir(resolvePath(epicsDir));
  const meta = [];
  let match;
  const usedSlugs = new Set();
  while ((match = regex.exec(features))) {
    const name = match[1].trim();
    const body = match[2].trim();
    if (!name) continue;
    let slug = slugify(name);
    let suffix = 1;
    while (usedSlugs.has(slug)) {
      slug = `${slugify(name)}-${suffix++}`;
    }
    usedSlugs.add(slug);
    const epicPath = `${epicsDir}/${slug}.md`;
    const frontmatter = `---\nid: ${slug}\ntitle: "${name.replace(/"/g, '\\"')}"\nsource: docs/03-features/features.md\nupdated: ${timestamp()}\n---\n\n`;
    writeFile(epicPath, frontmatter + body + '\n');
    meta.push({ id: slug, title: name, file: epicPath });
  }
  writeFile(`${epicsDir}/_meta.json`, JSON.stringify({ generated_at: timestamp(), epics: meta }, null, 2));
  console.log(`Sharded ${meta.length} epic file(s) into ${epicsDir}`);
}

async function archCompile() {
  const architecture = readFileSafe('docs/05-technical/architecture.md');
  if (!architecture) throw new Error('docs/05-technical/architecture.md not found.');
  const regex = /^###\s+(.+)\n([\s\S]*?)(?=^###\s+|\Z)/gim;
  const interfaces = [];
  let match;
  while ((match = regex.exec(architecture))) {
    const section = match[1].trim();
    const body = match[2].trim();
    if (!section) continue;
    const summary = body.split('\n').find(line => line.trim())?.trim() || '';
    const responsibilities = body
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());
    interfaces.push({
      id: slugify(section),
      name: section,
      summary,
      responsibilities,
    });
  }
  if (!interfaces.length) {
    console.warn('No sections detected under ### headings; generated file will be empty.');
  }
  writeFile('docs/05-technical/interfaces/generated-interfaces.json', JSON.stringify({
    generated_at: timestamp(),
    interfaces,
  }, null, 2));
  console.log('Generated docs/05-technical/interfaces/generated-interfaces.json');
}

async function validate(flags) {
  const target = flags._[0];
  if (!target) throw new Error('Specify validation target: definition | delivery');
  if (target === 'foundation') {
    return runValidation('foundation', foundationChecks(), 'validation/logs/foundation-phase.json');
  }
  if (target === 'definition') {
    return runValidation('definition', definitionChecks(), 'validation/logs/definition-phase.json');
  }
  if (target === 'delivery') {
    return runValidation('delivery', deliveryChecks(), 'validation/logs/delivery-phase.json');
  }
  throw new Error(`Unknown validation target: ${target}`);
}

function foundationChecks() {
  return [
    { id: 'project-config', path: 'project-config.yaml', type: 'file', minLength: 80 },
    { id: 'project-status', path: 'project-status.json', type: 'file', minLength: 20 },
    { id: 'ai-start', path: 'project-setup-system/AI-START.md', type: 'file', minLength: 200 },
    { id: 'master-setup', path: 'project-setup-system/MASTER-SETUP-PROMPT.md', type: 'file', minLength: 400 },
    { id: 'validation-folder', path: 'project-setup-system/validation', type: 'dir', minEntries: 5 },
    { id: 'checklist', path: 'project-setup-system/PRD-SETUP-CHECKLIST.md', type: 'file', minLength: 400 },
    { id: 'docs-dir', path: 'docs', type: 'dir', minEntries: 1 },
    { id: 'packages-dir', path: 'packages', type: 'dir', minEntries: 1 },
    { id: 'tools-dir', path: 'tools', type: 'dir', minEntries: 1 },
  ];
}

function definitionChecks() {
  return [
    { id: 'architecture', path: 'docs/05-technical/architecture.md', type: 'file', minLength: 400 },
    { id: 'component-catalog', path: 'docs/05-technical/component-catalog.md', type: 'file', minLength: 200 },
    { id: 'schema-spec', path: 'docs/05-technical/schema-spec.md', type: 'file', minLength: 200 },
    { id: 'domain-flows', path: 'docs/00-methods/bmad/domain-flows', type: 'dir', minEntries: 1 },
    { id: 'epic-shards', path: 'docs/06-pdr/epics', type: 'dir', minEntries: 1 },
  ];
}

function deliveryChecks() {
  return [
    { id: 'build-plan', path: 'docs/08-build-plan/master-checklist.md', type: 'file', minLength: 200 },
    { id: 'pdr', path: 'docs/06-pdr/PDR.md', type: 'file', minLength: 800 },
    { id: 'buildplan-yaml', path: 'buildplan.yaml', type: 'file', minLength: 50 },
    { id: 'prd-changelog', path: 'docs/06-pdr/changelog.md', type: 'file', minLength: 10 },
  ];
}

function runValidation(label, checks, outputFile) {
  const results = checks.map(check => runCheck(check));
  const passed = results.filter(r => r.pass).length;
  const score = checks.length ? passed / checks.length : 1;
  const payload = { label, timestamp: timestamp(), score, results };
  writeFile(outputFile, JSON.stringify(payload, null, 2));
  console.log(`Validation ${label} score: ${(score * 100).toFixed(1)}% (${passed}/${checks.length})`);
  if (score < 0.8) {
    throw new Error(`${label} validation below 80% threshold. See ${outputFile}.`);
  }
}

function runCheck(check) {
  const abs = resolvePath(check.path);
  const exists = fs.existsSync(abs);
  if (!exists) {
    return { id: check.id, pass: false, reason: 'Missing file/directory' };
  }
  if (check.type === 'dir') {
    const entries = fs.readdirSync(abs);
    const pass = entries.length >= (check.minEntries ?? 1);
    return { id: check.id, pass, reason: pass ? undefined : `Need at least ${check.minEntries ?? 1} entries` };
  }
  const content = fs.readFileSync(abs, 'utf8').trim();
  const pass = content.length >= (check.minLength ?? 1);
  return { id: check.id, pass, reason: pass ? undefined : `Content too short (<${check.minLength} chars)` };
}

async function specVerify() {
  const plan = readFileSafe('buildplan.yaml');
  if (!plan) throw new Error('buildplan.yaml not found.');
  const lines = plan.split('\n');
  const missing = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('- id:')) continue;
    const taskId = lines[i].split(':')[1].trim();
    let hasRequirement = false;
    let hasAcceptance = false;
    for (let j = i + 1; j < lines.length; j++) {
      const next = lines[j].trim();
      if (next.startsWith('- id:')) break;
      if (next.includes('requirement_id')) hasRequirement = true;
      if (/acceptance/i.test(next)) hasAcceptance = true;
    }
    if (!hasRequirement || !hasAcceptance) {
      missing.push({ task: taskId || `line-${i + 1}`, hasRequirement, hasAcceptance });
    }
  }
  if (missing.length) {
    const details = missing
      .map(item => `• ${item.task}: requirement link=${item.hasRequirement}, acceptance=${item.hasAcceptance}`)
      .join('\n');
    throw new Error(`Some tasks missing requirement/acceptance refs:\n${details}`);
  }
  console.log('All tasks contain requirement and acceptance references.');
}

async function prdDiff() {
  const pdr = readFileSafe('docs/06-pdr/PDR.md');
  if (!pdr) throw new Error('docs/06-pdr/PDR.md not found.');
  const snapshotPath = 'docs/06-pdr/.last-pdr-snapshot.md';
  const changelogPath = 'docs/06-pdr/changelog.md';
  const newHash = crypto.createHash('sha256').update(pdr).digest('hex');
  const prev = readFileSafe(snapshotPath);
  if (prev && crypto.createHash('sha256').update(prev).digest('hex') === newHash) {
    console.log('No PDR changes detected since last snapshot.');
    return;
  }
  writeFile(snapshotPath, pdr);
  const headings = Array.from(pdr.matchAll(/^##\s+(.+)$/gm)).map(match => match[1]);
  const summary = headings.slice(0, 5).map(h => `- ${h}`).join('\n') || '- (unable to extract section summaries)';
  const entry = `## ${timestamp()}\n- Hash: ${newHash}\n${summary}\n\n`;
  appendFile(changelogPath, entry);
  console.log('Appended diff summary to docs/06-pdr/changelog.md');
}

async function mcpInit(flags) {
  const targetRoot = flags.workspace ? path.resolve(flags.workspace) : root;
  const templateDir = resolvePath('tools/mcp/templates');
  if (!fs.existsSync(templateDir)) throw new Error('tools/mcp/templates not found. Ensure the tools folder was copied.');
  const mcpDir = path.join(targetRoot, '.mcp');
  const configDir = path.join(mcpDir, 'config');
  fs.mkdirSync(configDir, { recursive: true });
  const templates = fs
    .readdirSync(templateDir)
    .filter(name => name.endsWith('.json') || name.endsWith('.jsonc'));
  if (!templates.length) throw new Error('No MCP templates available.');
  const summary = [];
  for (const template of templates) {
    const src = path.join(templateDir, template);
    const destName = template.replace(/\.jsonc$/, '.json');
    const dest = path.join(configDir, destName);
    fs.copyFileSync(src, dest);
    summary.push({ template, destination: path.relative(targetRoot, dest) });
  }
  const readme = `# MCP Config\n\nGenerated ${timestamp()} via mcp:init. Fill in credentials before use.\n\n| Template | Destination |\n|----------|-------------|\n${summary
    .map(item => `| ${item.template} | ${item.destination} |`)
    .join('\n')}\n`;
  fs.writeFileSync(path.join(mcpDir, 'README.md'), readme);
  console.log(`MCP configs written to ${mcpDir}`);
}

async function poReport(flags) {
  const projectConfig = readFileSafe('project-config.yaml') || '';
  const projectName = matchLine(projectConfig, /name:\s*"?(.+?)"?$/im) || 'PROJECT_NAME';
  const jtbd = matchLine(projectConfig, /jtbd:\s*"?(.+?)"?$/im) || 'When [trigger], [persona] wants to [job] so they can [outcome].';
  const metrics = matchList(projectConfig, 'success_metrics');
  const targetPath = flags.path || 'docs/06-pdr/po-dashboard.md';
  const statusNarrative = flags.status || 'Highlights, risks, and upcoming decisions go here.';
  const rows = (metrics.length ? metrics : ['Activation +15%', 'Retention ≥45%'])
    .map(metric => `| ${metric} | Definition TBD | Target | Current | Δ | Owner | Notes |`)
    .join('\n');
  const content = `# KPI Dashboard – ${projectName}\n\n> Autogenerated via pnpm po:report on ${timestamp()}\n\n**JTBD**: ${jtbd}\n\n| Metric | Definition | Target | Current | Δ | Owner | Notes |\n|--------|------------|--------|---------|----|-------|-------|\n${rows}\n\n## Status Narrative\n${statusNarrative}\n\n## Linked Artifacts\n- Stakeholder Brief: docs/06-pdr/stakeholder-brief.md\n- Acceptance Bundle: docs/03-features/acceptance-bundle.md\n- Comms Log: docs/client-ops/comms-log.md\n`;
  writeFile(targetPath, content);
  console.log(`Updated ${targetPath}`);
}

async function logsAppend(flags) {
  const historyPath = 'validation/logs/run-history.json';
  const history = readJsonArray(historyPath);
  const projectConfig = readFileSafe('project-config.yaml') || '';
  const status = readJsonSafe('project-status.json') || {};
  const mcpServers = listMcpServers();
  const cypressArtifacts = listCypressArtifacts();
  const entry = {
    timestamp: timestamp(),
    project: matchLine(projectConfig, /^project:\s*\n\s*name:\s*"?(.+?)"?$/im) || 'unknown-project',
    jtbd: matchLine(projectConfig, /jtbd:\s*"?(.+?)"?$/im) || 'TBD',
    success_metrics: matchList(projectConfig, 'success_metrics'),
    non_goals: matchList(projectConfig, 'non_goals'),
    target_regions: matchList(projectConfig, 'target_regions'),
    phase: status.phase || 'unknown',
    score: status.score ?? null,
    notes: flags.notes || '',
    validation: {
      definition: readJsonSafe('validation/logs/definition-phase.json')?.score ?? null,
      delivery: readJsonSafe('validation/logs/delivery-phase.json')?.score ?? null,
    },
    telemetry: {
      mcp_servers: mcpServers,
      cypress_artifacts: cypressArtifacts,
      ci_status: flags.ci || null,
      token_savings: flags.tokens ? Number(flags.tokens) : null,
    },
  };
  history.push(entry);
  writeFile(historyPath, JSON.stringify(history, null, 2));
  console.log('Appended telemetry entry to validation/logs/run-history.json');
}

function readJsonArray(rel) {
  const raw = readFileSafe(rel);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readJsonSafe(rel) {
  const raw = readFileSafe(rel);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function matchLine(content, regex) {
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function matchList(content, key) {
  const regex = new RegExp(`${key}:\\s*\n((?:\\s+-\\s+.+\n)+)`);
  const match = content.match(regex);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean);
}

function listMcpServers() {
  const dir = resolvePath('.mcp/config');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(name => name.endsWith('.json'))
    .map(name => name.replace(/\.json$/, ''));
}

function listCypressArtifacts() {
  const dir = resolvePath('validation/logs/cypress');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(name => !name.startsWith('.'))
    .slice(-5);
}

async function statusComplete(flags) {
  await setupStatus({ phase: 'complete', attempt: flags.attempt, score: flags.score });
  const statusPath = resolvePath('project-status.json');
  const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  status.phase = 'complete';
  status.last_artifact = 'docs/06-pdr/PDR.md';
  status.completed_at = timestamp();
  writeFile('project-status.json', JSON.stringify(status, null, 2));
  console.log('Marked project-status.json as complete.');
}
