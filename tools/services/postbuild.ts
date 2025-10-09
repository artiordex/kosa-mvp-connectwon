/**
 * Description : postbuild.ts - 📌 빌드 산출물 구조 정리 스크립트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 * 10-09 - 절대경로 정리, 예외 처리 추가, JSDoc 표준화
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const packagesDir = path.join(root, 'dist', 'packages');

/**
 * @description 패키지 폴더가 존재하는지 확인
 */
if (!fs.existsSync(packagesDir)) {
  console.error('[postbuild] dist/packages 폴더가 없습니다. 먼저 build를 실행하세요.');
  process.exit(1);
}

/**
 * @description packages 하위 각 폴더(src) 정리 및 flatten
 */
for (const pkg of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, pkg);
  const srcPath = path.join(pkgPath, 'src');

  if (!fs.existsSync(pkgPath) || !fs.lstatSync(pkgPath).isDirectory()) continue;

  if (fs.existsSync(srcPath)) {
    console.log(`[postbuild] Flattening ${pkg}...`);

    try {
      // src 내부 파일 이동
      for (const f of fs.readdirSync(srcPath)) {
        const from = path.join(srcPath, f);
        const to = path.join(pkgPath, f);
        fs.renameSync(from, to);
      }

      // src 폴더 삭제
      fs.rmSync(srcPath, { recursive: true, force: true });
      console.log(`[postbuild] ${pkg} 정리 완료`);
    } catch (err) {
      console.error(`[postbuild] ${pkg} 처리 중 오류 발생:`, err);
    }
  }
}
