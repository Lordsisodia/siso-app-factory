const fs = require('fs');
const path = require('path');

function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function ensureBridgeFiles(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const subdir = path.join(currentDir, entry.name);
    const indexJs = path.join(subdir, 'index.js');
    const indexDts = path.join(subdir, 'index.d.ts');

    if (fileExists(indexJs)) {
      const bridgeJs = path.join(currentDir, `${entry.name}.js`);
      const relativeImport = `./${entry.name}/index.js`;
      if (!fileExists(bridgeJs)) {
        fs.writeFileSync(bridgeJs, `export * from '${relativeImport}';\n`);
      }
    }

    if (fileExists(indexDts)) {
      const bridgeDts = path.join(currentDir, `${entry.name}.d.ts`);
      const relativeTypesImport = `./${entry.name}/index.js`;
      if (!fileExists(bridgeDts)) {
        fs.writeFileSync(bridgeDts, `export * from '${relativeTypesImport}';\n`);
      }
    }

    ensureBridgeFiles(subdir);
  }
}

ensureBridgeFiles(path.join(process.cwd(), 'dist'));
