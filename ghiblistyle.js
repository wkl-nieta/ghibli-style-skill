#!/usr/bin/env node
/**
 * Ghibli Style Image Generator
 * Generates studio ghibli ai art generator using the Neta talesofai API.
 */
import { readFileSync } from 'fs';
import { homedir } from 'os';

const args    = process.argv.slice(2);
const getFlag = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i+1] : null; };
const PROMPT  = args.find(a => !a.startsWith('--')) || 'Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition';
const SIZE    = getFlag('--size')  || 'landscape';
const TOKEN   = getFlag('--token') || process.env.NETA_TOKEN || (() => {
  for (const p of [`${homedir()}/.openclaw/workspace/.env`, `${homedir()}/developer/clawhouse/.env`]) {
    try { const m = readFileSync(p, 'utf8').match(/NETA_TOKEN=(.+)/); if (m) return m[1].trim(); } catch {}
  }
  return null;
})();

if (!TOKEN) { console.error('NETA_TOKEN not set'); process.exit(1); }

const SIZES = { square:{w:1024,h:1024}, portrait:{w:832,h:1216}, landscape:{w:1216,h:832}, tall:{w:704,h:1408} };
const { w: width, h: height } = SIZES[SIZE] || SIZES.landscape;
const HEADERS = { 'x-token': TOKEN, 'x-platform': 'nieta-app/web', 'content-type': 'application/json' };

const res = await fetch('https://api.talesofai.cn/v3/make_image', {
  method: 'POST', headers: HEADERS,
  body: JSON.stringify({
    storyId: 'DO_NOT_USE', jobType: 'universal',
    rawPrompt: [{ type: 'freetext', value: PROMPT, weight: 1 }],
    width, height,
    meta: { entrance: 'PICTURE,VERSE' },
  }),
});
if (!res.ok) { console.error(`make_image failed (${res.status}):`, await res.text()); process.exit(1); }
const taskData = await res.json();
const task_uuid = typeof taskData === 'string' ? taskData : taskData?.task_uuid;
if (!task_uuid) { console.error('No task_uuid returned:', JSON.stringify(taskData)); process.exit(1); }

process.stderr.write(`Task: ${task_uuid}\n`);
for (let i = 0; i < 90; i++) {
  await new Promise(r => setTimeout(r, 2000));
  const poll = await fetch(`https://api.talesofai.cn/v1/artifact/task/${task_uuid}`, { headers: HEADERS });
  const data = await poll.json();
  const status = data.task_status || '';
  if (status !== 'PENDING' && status !== 'MODERATION' && status !== '') {
    const url = data.artifacts?.[0]?.url ?? data.result_image_url ?? data.image_url;
    if (url) { console.log(url); process.exit(0); }
    console.error('Done but no URL:', JSON.stringify(data)); process.exit(1);
  }
  process.stderr.write(`[${i+1}] ${status}...\r`);
}
console.error('Timed out'); process.exit(1);
