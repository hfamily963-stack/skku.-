import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const b64 = fs.readFileSync('foundry-build.b64', 'utf8').trim();
const tgz = '.foundry-build.tgz';
fs.writeFileSync(tgz, Buffer.from(b64, 'base64'));
execFileSync('tar', ['-xzf', tgz, '-C', '.'], { stdio: 'inherit' });
fs.rmSync(tgz, { force: true });
console.log('Foundry Test source unpacked.');
