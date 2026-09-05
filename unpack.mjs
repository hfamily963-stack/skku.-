import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const parts = fs.readdirSync('.').filter((n) => n.startsWith('foundry-source.b64.part')).sort();
if (!parts.length) throw new Error('No bundle parts found');
const b64 = parts.map((p) => fs.readFileSync(p, 'utf8')).join('');
fs.writeFileSync('.foundry-build.tgz', Buffer.from(b64, 'base64'));
execFileSync('tar', ['-xzf', '.foundry-build.tgz', '-C', '.'], { stdio: 'inherit' });
console.log(`Unpacked ${parts.length} parts`);