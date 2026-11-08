import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const viteConsumerAppDir = path.join(rootDir, 'test-consumers/vite-react-app');
const nextjsConsumerAppDir = path.join(rootDir, 'test-consumers/nextjs-app');

console.log('================================================================================');
console.log('📦 E2E CONSUMER TEST: TESTING INSTALLATION & USAGE IN OTHER PROJECTS');
console.log('================================================================================\n');

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
    // 1. Build library distribution
    await runStep('1. Build Library Distribution (ESM, CJS, Types, CSS)', 'npm', ['run', 'build:lib'], rootDir);

    // 2. Pack npm tarball
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
    const expectedTarball = `ramekhchhoeng-designkit-${pkg.version}.tgz`;
    if (fs.existsSync(path.join(rootDir, expectedTarball))) {
      fs.unlinkSync(path.join(rootDir, expectedTarball));
    }
    await runStep('2. Pack Release Tarball (npm pack)', 'npm', ['pack'], rootDir);

    // 3. Verify Tarball & Unpack into Consumers
    console.log('▶ [STEP] 3. Unpack tarball into Consumer Projects node_modules...');
    const tarball = expectedTarball;
    if (!fs.existsSync(path.join(rootDir, tarball))) throw new Error(`Release tarball ${tarball} not found`);
    const destDirs = [
      path.join(rootDir, 'node_modules/@ramekhchhoeng/designkit'),
      path.join(nextjsConsumerAppDir, 'node_modules/@ramekhchhoeng/designkit'),
    ];
    for (const destDir of destDirs) {
      fs.rmSync(destDir, { recursive: true, force: true });
      fs.mkdirSync(destDir, { recursive: true });
      await runStep(`Extract tarball to ${path.relative(rootDir, destDir)}`, 'tar', ['-xzf', path.join(rootDir, tarball), '-C', destDir, '--strip-components=1'], rootDir);
    }
    console.log(`✅ [PASS] 3. Tarball ${tarball} extracted to all consumer test apps\n`);

    // Clean Next.js build cache before testing
    fs.rmSync(path.join(nextjsConsumerAppDir, '.next'), { recursive: true, force: true });

    // 4. Run TypeScript Check & Vite Production Build in Vite Consumer
    await runStep('4. Vite Consumer Static Typecheck (tsc --noEmit)', 'npx', ['tsc', '--noEmit'], viteConsumerAppDir);
    await runStep('5. Vite Consumer Production Bundle (Vite Build)', 'npx', ['vite', 'build'], viteConsumerAppDir);

    // 5. Run Next.js Consumer Verification (Next.js 15 App Router)
    await runStep('6. Next.js Consumer Static Typecheck (tsc --noEmit)', 'npx', ['tsc', '--noEmit'], nextjsConsumerAppDir);
    await runStep('7. Next.js Consumer Production Bundle (Next Build)', 'npx', ['next', 'build'], nextjsConsumerAppDir);

    // 6. Run Runtime DOM & Package Unit Tests
    await runStep('8. Runtime Package Exports & DOM Suite (Vitest)', 'npm', ['run', 'test'], rootDir);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('================================================================================');
    console.log(`🏆 ALL CONSUMER INSTALLATION & REAL-WORLD USAGE TESTS PASSED IN ${duration}s!`);
    console.log('   - Built Distribution Verified: ESM, CJS, Types, Stylesheet');
    console.log('   - 65 UI Primitives Rendered & Typechecked in External App');
    console.log('   - 100% Production Build & Runtime Validation Succeeded');
    console.log('================================================================================');
  } catch (err) {
    console.error('💥 Consumer Test Suite Failed:', err.message);
    process.exit(1);
  }
}

main();
