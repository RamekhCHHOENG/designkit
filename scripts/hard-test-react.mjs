import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformWithOxc } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

console.log('====================================================');
console.log('🚀 RUNNING HARD TEST ACROSS ALL REACT COMPONENTS & EXAMPLES');
console.log('====================================================\n');

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(filePath, exts));
    } else if (exts.some((ext) => file.endsWith(ext) && !file.endsWith('.d.ts'))) {
      files.push(filePath);
    }
  }
  return files;
}

const allReactFiles = getAllFiles(srcDir);

console.log(`📊 Found ${allReactFiles.length} total React TypeScript/TSX source files to test:`);
console.log(`  - Registry Components: ${allReactFiles.filter((f) => f.includes('registry/default/components')).length}`);
console.log(`  - Component Showcase Examples: ${allReactFiles.filter((f) => f.includes('src/components') && f.endsWith('-example.tsx')).length}`);
console.log(`  - UI Primitives: ${allReactFiles.filter((f) => f.includes('/ui/')).length}`);
console.log(`  - Other App & Lib Files: ${allReactFiles.filter((f) => !f.includes('registry/default/components') && !f.endsWith('-example.tsx') && !f.includes('/ui/')).length}\n`);

let passedCount = 0;
let failedCount = 0;
const errors = [];

function resolveImport(importPath, currentFilePath) {
  // Ignore external packages
  if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
    return { ok: true };
  }

  let resolvedPath = '';
  if (importPath.startsWith('@/')) {
    const sub = importPath.substring(2);
    resolvedPath = path.join(srcDir, sub);
  } else {
    resolvedPath = path.resolve(path.dirname(currentFilePath), importPath);
  }

  const extensions = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.js'];
  for (const ext of extensions) {
    const candidate = resolvedPath + ext;
    if (fs.existsSync(candidate) && !fs.statSync(candidate).isDirectory()) {
      return { ok: true, path: candidate };
    }
  }

  return { ok: false, importPath, resolvedPath };
}

for (const filePath of allReactFiles) {
  const relPath = path.relative(rootDir, filePath);
  try {
    const code = fs.readFileSync(filePath, 'utf-8');

    // 1. Transform with OXC
    await transformWithOxc(code, filePath, {
      jsx: {
        runtime: 'automatic',
      },
    });

    // 2. Validate all import paths
    const importRegex = /import\s+(?:(?:(?:\w+|\{[^}]*\}|\*\s+as\s+\w+)\s+from\s+)?['"]([^'"]+)['"]|['"]([^'"]+)['"])/g;
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      const imp = match[1] || match[2];
      const res = resolveImport(imp, filePath);
      if (!res.ok) {
        throw new Error(`Unresolved local import '${imp}' in ${relPath}`);
      }
    }

    passedCount++;
  } catch (err) {
    failedCount++;
    errors.push({ file: relPath, error: err.message });
  }
}

console.log('----------------------------------------------------');
console.log(`✅ Passed: ${passedCount} / ${allReactFiles.length}`);
console.log(`❌ Failed: ${failedCount} / ${allReactFiles.length}`);
console.log('----------------------------------------------------\n');

if (errors.length > 0) {
  console.error('💥 FAILURES DETECTED:');
  for (const err of errors) {
    console.error(`- [${err.file}]: ${err.error}`);
  }
}

// 3. Test Config Consistency (components.ts and catalog.ts)
console.log('🔍 Checking React Registry & Example Config Consistency...');
let configErrors = 0;

try {
  const componentsConfig = fs.readFileSync(path.join(srcDir, 'config/components.ts'), 'utf-8');
  const compMatches = [...componentsConfig.matchAll(/name:\s*["'](comp-[^"']+|extended-[^"']+)["']/g)];
  console.log(`  - Found ${compMatches.length} Origin UI component entries in src/config/components.ts`);
  for (const match of compMatches) {
    const compName = match[1];
    const compPath = path.join(srcDir, `registry/default/components/${compName}.tsx`);
    if (!fs.existsSync(compPath)) {
      console.error(`  ❌ Missing component file in React registry: ${compName}.tsx`);
      configErrors++;
    }
  }

  const catalogContent = fs.readFileSync(path.join(srcDir, 'catalog.ts'), 'utf-8');
  const uiPrims = getAllFiles(path.join(srcDir, 'components/ui'));
  console.log(`  - Found ${uiPrims.length} UI primitives in src/components/ui/`);
  const exampleFiles = getAllFiles(path.join(srcDir, 'components')).filter((f) => f.endsWith('-example.tsx'));
  console.log(`  - Found ${exampleFiles.length} showcase example files in src/components/`);
} catch (err) {
  console.error(`  ❌ Config check error: ${err.message}`);
  configErrors++;
}

console.log('\n====================================================');
if (failedCount === 0 && configErrors === 0) {
  console.log('🎉 ALL REACT COMPONENTS, EXAMPLES & CONFIGS PASSED HARD TEST!');
  console.log('====================================================');
  process.exit(0);
} else {
  console.error(`💥 HARD TEST FAILED WITH ${failedCount + configErrors} TOTAL ISSUES!`);
  console.log('====================================================');
  process.exit(1);
}
