import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const appDir = path.join(rootDir, 'app');

console.log('====================================================');
console.log('🚀 RUNNING HARD TEST ACROSS ALL VUE COMPONENTS & EXAMPLES');
console.log('====================================================\n');

function getAllFiles(dir, ext = '.vue') {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(filePath, ext));
    } else if (file.endsWith(ext)) {
      files.push(filePath);
    }
  }
  return files;
}

const componentFiles = getAllFiles(path.join(appDir, 'registry/default/components'));
const exampleFiles = getAllFiles(path.join(appDir, 'components/examples'));
const uiFiles = getAllFiles(path.join(appDir, 'registry/default/ui'));
const pageFiles = getAllFiles(path.join(appDir, 'pages'));
const layoutFiles = getAllFiles(path.join(appDir, 'layouts'));
const customComponentFiles = getAllFiles(path.join(appDir, 'components')).filter(
  (f) => !f.includes('/examples/')
);

const allVueFiles = [
  ...componentFiles,
  ...exampleFiles,
  ...uiFiles,
  ...pageFiles,
  ...layoutFiles,
  ...customComponentFiles,
];

console.log(`📊 Found ${allVueFiles.length} total Vue files to test:`);
console.log(`  - Origin UI Components: ${componentFiles.length}`);
console.log(`  - Component Showcase Examples: ${exampleFiles.length}`);
console.log(`  - UI Primitives: ${uiFiles.length}`);
console.log(`  - Pages & Layouts: ${pageFiles.length + layoutFiles.length}`);
console.log(`  - App Components: ${customComponentFiles.length}\n`);

let passedCount = 0;
let failedCount = 0;
const errors = [];

function resolveImport(importPath, currentFilePath) {
  // Ignore standard node_modules packages
  if (!importPath.startsWith('.') && !importPath.startsWith('@/') && !importPath.startsWith('~/')) {
    return { ok: true };
  }

  let resolvedPath = '';
  if (importPath.startsWith('@/') || importPath.startsWith('~/')) {
    const sub = importPath.substring(2);
    resolvedPath = path.join(appDir, sub);
  } else {
    resolvedPath = path.resolve(path.dirname(currentFilePath), importPath);
  }

  const extensions = ['', '.vue', '.ts', '.js', '.tsx', '/index.vue', '/index.ts', '/index.js'];
  for (const ext of extensions) {
    const candidate = resolvedPath + ext;
    if (fs.existsSync(candidate) && !fs.statSync(candidate).isDirectory()) {
      return { ok: true, path: candidate };
    }
  }

  return { ok: false, importPath, resolvedPath };
}

// Test each Vue SFC
for (const [index, filePath] of allVueFiles.entries()) {
  const relPath = path.relative(rootDir, filePath);
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const { descriptor, errors: parseErrors } = parse(source, { filename: filePath });

    if (parseErrors.length > 0) {
      throw new Error(`SFC Parse Error: ${parseErrors.map((e) => e.message).join(', ')}`);
    }

    // 1. Check Script
    if (descriptor.script || descriptor.scriptSetup) {
      try {
        compileScript(descriptor, {
          id: `test-${index}`,
          isProd: false,
          fs: {
            fileExists(file) {
              return fs.existsSync(file);
            },
            readFile(file) {
              return fs.readFileSync(file, 'utf-8');
            },
          },
        });
      } catch (err) {
        // Ignore external type resolution warnings in isolated scripts, but catch real syntax errors
        const isTypeErr =
          err.message.includes('cannot find module') ||
          err.message.includes('type argument') ||
          err.message.includes('Failed to resolve type') ||
          err.message.includes('Failed to resolve import source') ||
          err.message.includes('TypeScript is required as a peer dep');
        if (!isTypeErr) {
          throw new Error(`Script Compile Error: ${err.message}`);
        }
      }

      // Check Import statements in script
      const scriptContent = (descriptor.script?.content || '') + '\n' + (descriptor.scriptSetup?.content || '');
      const importRegex = /import\s+(?:(?:(?:\w+|\{[^}]*\}|\*\s+as\s+\w+)\s+from\s+)?['"]([^'"]+)['"]|['"]([^'"]+)['"])/g;
      let match;
      while ((match = importRegex.exec(scriptContent)) !== null) {
        const imp = match[1] || match[2];
        const res = resolveImport(imp, filePath);
        if (!res.ok) {
          throw new Error(`Unresolved local import '${imp}' in ${relPath}`);
        }
      }
    }

    // 2. Check Template
    if (descriptor.template) {
      const templateResult = compileTemplate({
        id: `test-tmpl-${index}`,
        filename: filePath,
        source: descriptor.template.content,
        compilerOptions: {
          isCustomElement: () => false,
        },
      });

      if (templateResult.errors.length > 0) {
        throw new Error(`Template Compile Error: ${templateResult.errors.map((e) => (typeof e === 'string' ? e : e.message)).join(', ')}`);
      }
    }

    passedCount++;
  } catch (err) {
    failedCount++;
    errors.push({ file: relPath, error: err.message });
  }
}

console.log('----------------------------------------------------');
console.log(`✅ Passed: ${passedCount} / ${allVueFiles.length}`);
console.log(`❌ Failed: ${failedCount} / ${allVueFiles.length}`);
console.log('----------------------------------------------------\n');

if (errors.length > 0) {
  console.error('💥 FAILURES DETECTED:');
  for (const err of errors) {
    console.error(`- [${err.file}]: ${err.error}`);
  }
}

// 3. Test Config Consistency (catalog and components)
console.log('🔍 Checking Catalog and Registry Config Consistency...');
let configErrors = 0;

try {
  const catalogContent = fs.readFileSync(path.join(appDir, 'config/catalog.ts'), 'utf-8');
  const catalogImports = [...catalogContent.matchAll(/import\s+(\w+)\s+from\s+["']@\/components\/examples\/(\w+)\.vue["']/g)];
  console.log(`  - Found ${catalogImports.length} catalog example imports in catalog.ts`);
  for (const match of catalogImports) {
    const exampleName = match[2];
    const examplePath = path.join(appDir, `components/examples/${exampleName}.vue`);
    if (!fs.existsSync(examplePath)) {
      console.error(`  ❌ Missing example file for catalog: ${exampleName}.vue`);
      configErrors++;
    }
  }

  const componentsContent = fs.readFileSync(path.join(appDir, 'config/components.ts'), 'utf-8');
  const componentMatches = [...componentsContent.matchAll(/name:\s*["'](comp-[^"']+|extended-[^"']+)["']/g)];
  console.log(`  - Found ${componentMatches.length} Origin UI component entries in components.ts`);
  for (const match of componentMatches) {
    const compName = match[1];
    const compPath = path.join(appDir, `registry/default/components/${compName}.vue`);
    if (!fs.existsSync(compPath)) {
      console.error(`  ❌ Missing component file in registry: ${compName}.vue`);
      configErrors++;
    }
  }
} catch (err) {
  console.error(`  ❌ Config check error: ${err.message}`);
  configErrors++;
}

console.log('\n====================================================');
if (failedCount === 0 && configErrors === 0) {
  console.log('🎉 ALL VUE COMPONENTS, EXAMPLES & CONFIGS PASSED HARD TEST!');
  console.log('====================================================');
  process.exit(0);
} else {
  console.error(`💥 HARD TEST FAILED WITH ${failedCount + configErrors} TOTAL ISSUES!`);
  console.log('====================================================');
  process.exit(1);
}
