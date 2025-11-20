#!/usr/bin/env ts-node

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const [, , domainArg, pageArg] = process.argv;

if (!domainArg) {
  console.error('Usage: pnpm scaffold:domain <domain-slug> [page-slug]');
  process.exit(1);
}

const projectRoot = process.cwd();
const domainSlug = domainArg;
const pageSlug = pageArg || 'sample-page';

const domainRoot = join(projectRoot, 'src', 'domains', domainSlug);

const ensureDir = (path: string) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

const writeIfMissing = (path: string, contents: string) => {
  if (!existsSync(path)) {
    writeFileSync(path, contents);
  }
};

const domainDocs = join(domainRoot, 'docs');
const pagesRoot = join(domainRoot, 'pages', pageSlug);
const pageDocs = join(pagesRoot, 'docs');
const desktopRoot = join(pagesRoot, 'desktop');
const desktopComponents = join(desktopRoot, 'components');
const desktopHooks = join(desktopRoot, 'components', 'hooks');
const mobileRoot = join(pagesRoot, 'mobile');
const mobileComponents = join(mobileRoot, 'components');
const hooksRoot = join(pagesRoot, 'hooks');
const utilsRoot = join(pagesRoot, 'utils');
const stylesRoot = join(pagesRoot, 'styles');
const workflowsRoot = join(domainRoot, 'workflows');
const servicesRoot = join(domainRoot, 'services');
const uiRoot = join(domainRoot, 'ui');
const domainHooksRoot = join(domainRoot, 'hooks');
const domainUtilsRoot = join(domainRoot, 'utils');
const testsRoot = join(domainRoot, 'tests');
const unitTests = join(testsRoot, 'unit');
const e2eTests = join(testsRoot, 'e2e');

[
  domainRoot,
  domainDocs,
  join(domainRoot, 'pages'),
  pagesRoot,
  pageDocs,
  desktopRoot,
  desktopComponents,
  desktopHooks,
  mobileRoot,
  mobileComponents,
  hooksRoot,
  utilsRoot,
  stylesRoot,
  workflowsRoot,
  servicesRoot,
  uiRoot,
  domainHooksRoot,
  domainUtilsRoot,
  testsRoot,
  unitTests,
  e2eTests,
  join(workflowsRoot, 'triggers'),
  join(servicesRoot, 'policies'),
].forEach(ensureDir);

writeIfMissing(join(domainDocs, 'domain-overview.md'), `# ${domainSlug} Domain\n\nDescribe KPIs, personas, and mission for this domain.\n`);
writeIfMissing(join(domainDocs, 'data-contracts.md'), `# Data Contracts\n\nList entities/events owned by the ${domainSlug} domain.\n`);
writeIfMissing(join(domainDocs, 'runbooks.md'), `# Runbooks\n\nDocument troubleshooting + ops runbooks.\n`);
writeIfMissing(join(pageDocs, 'ux-notes.md'), `# ${pageSlug} UX Notes\n\nCapture requirements, wireframes, state machines.\n`);
writeIfMissing(join(desktopComponents, 'Hero.tsx'), `export function Hero() {\n  return <div>TODO: ${domainSlug}/${pageSlug} desktop hero</div>;\n}\n`);
writeIfMissing(join(desktopComponents, 'Hero.docs.md'), `# Hero Component\n\nExplain intent, props, and variations for desktop hero.\n`);
writeIfMissing(join(desktopHooks, 'useHeroMetrics.ts'), `export const useHeroMetrics = () => {\n  // TODO: track KPIs\n};\n`);
writeIfMissing(join(mobileComponents, 'HeroMobile.tsx'), `export function HeroMobile() {\n  return <div>TODO: ${domainSlug}/${pageSlug} mobile hero</div>;\n}\n`);
writeIfMissing(join(mobileComponents, 'utils.ts'), `export const formatMobileHero = () => {};\n`);
writeIfMissing(join(hooksRoot, 'usePageState.ts'), `export const use${pageSlug.replace(/-/g, '')}State = () => {\n  // TODO: implement\n};\n`);
writeIfMissing(join(utilsRoot, 'format.ts'), `export const format${pageSlug.replace(/-/g, '')} = () => {};\n`);
writeIfMissing(join(stylesRoot, `${pageSlug}.css`), `/* Styles for ${domainSlug}/${pageSlug} */\n`);
writeIfMissing(join(workflowsRoot, `${pageSlug}-flow.machine.ts`), `// XState or similar definition for ${pageSlug}\n`);
writeIfMissing(join(servicesRoot, 'api.ts'), `export const ${domainSlug}Api = {};\n`);
writeIfMissing(join(servicesRoot, 'repository.ts'), `export const ${domainSlug}Repository = {};\n`);
writeIfMissing(join(servicesRoot, 'policies', 'index.ts'), `export const ${domainSlug}Policies = {};\n`);
writeIfMissing(join(uiRoot, 'README.md'), `# ${domainSlug} UI components\n`);
writeIfMissing(join(domainHooksRoot, 'useDomainContext.ts'), `export const use${domainSlug.replace(/-/g, '')}Context = () => {};\n`);
writeIfMissing(join(domainUtilsRoot, 'index.ts'), `export * from './formatters';\n`);
writeIfMissing(join(unitTests, `${pageSlug}.test.ts`), `describe('${domainSlug}/${pageSlug}', () => {\n  it('should render', () => {});\n});\n`);
writeIfMissing(join(e2eTests, `${pageSlug}.spec.ts`), `describe('${domainSlug} ${pageSlug} e2e', () => {});\n`);

console.log(`✅ Scaffolded domain '${domainSlug}' with page '${pageSlug}'.`);
