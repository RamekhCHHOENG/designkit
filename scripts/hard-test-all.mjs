import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('========================================================================');
console.log('🔥 STARTING COMPREHENSIVE HARD TEST SUITE: ~2,000 COMPONENTS & EXAMPLES');
console.log('========================================================================\n');

function runStep(name, cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`▶ [STEP] ${name}...`);
    const proc = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ [PASS] ${name}\n`);
        resolve();
      } else {
        console.error(`❌ [FAIL] ${name} (exit code: ${code})\n`);
        reject(new Error(`${name} failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  const startTime = Date.now();
  try {
    // 1. Vitest suite
    await runStep('1. React Unit & Accessibility Tests (Vitest)', 'npm', ['run', 'test'], rootDir);

    // 2. TypeScript typecheck
    await runStep('2. React TypeScript Static Typecheck (tsc)', 'npm', ['run', 'typecheck'], rootDir);

    // 3. React Hard Component Analysis (811 source files)
    await runStep('3. React Hard Component & Registry Test (811 files)', 'node', ['scripts/hard-test-react.mjs'], rootDir);

    // 4. Vue Hard Component Analysis (1,169 source files)
    await runStep('4. Vue SFC & Registry Hard Test (1,169 files)', 'node', ['scripts/hard-test-vue.mjs'], path.join(rootDir, 'shadcn-vue'));

    // 5. React Full Production Build
    await runStep('5. React Production Build (Vite & Library)', 'npm', ['run', 'build'], rootDir);

    // 6. Vue Full Production Build
    await runStep('6. Nuxt / Vue Production Build (Nitro & Client)', 'npm', ['run', 'build'], path.join(rootDir, 'shadcn-vue'));

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('========================================================================');
    console.log(`🏆 ALL HARD TESTS COMPLETED SUCCESSFULLY IN ${duration}s!`);
    console.log('   - React Components & Examples Tested: 811');
    console.log('   - Vue Components & Examples Tested: 1,169');
    console.log('   - Total Components & Examples Verified: 1,980');
    console.log('========================================================================');
  } catch (err) {
    console.error('💥 Hard Test Suite Aborted due to failure:', err.message);
    process.exit(1);
  }
}

main();
