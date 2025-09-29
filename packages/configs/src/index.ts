/**
 * Description : index.ts - 📌 ConnectWon 통합 Config Export
 * Author : Shiwoo Min
 * Date : 2025-09-24
 */

// eslint
export { default as eslint } from './eslint/base.js';

// testing
export { default as testingPlaywright } from './testing/playwright.js';
export { default as testingVitest } from './testing/vitest.js';

// typescript
export { default as tsconfigBase } from './typescript/base.json';
export { default as tsconfigNode } from './typescript/node.json';
export { default as tsconfigWeb } from './typescript/web.json';
