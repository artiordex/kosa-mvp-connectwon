import fs from 'fs';
import path from 'path';

const root = process.cwd();
const packagesDir = path.join(root, 'dist', 'packages');

if (!fs.existsSync(packagesDir)) {
  console.error('[postbuild] dist/packages 폴더가 없음. 먼저 build를 실행하세요.');
  process.exit(1);
}

for (const pkg of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, pkg);
  const srcPath = path.join(pkgPath, 'src');

  if (fs.existsSync(srcPath)) {
    console.log(`[postbuild] Flattening ${pkg}...`);

    for (const f of fs.readdirSync(srcPath)) {
      fs.renameSync(path.join(srcPath, f), path.join(pkgPath, f));
    }

    fs.rmSync(srcPath, { recursive: true, force: true });
  }
}
