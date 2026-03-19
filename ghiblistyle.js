#!/usr/bin/env node
/**
 * Ghibli Style Image Generator
 * Generates studio ghibli ai art generator using the Neta talesofai API.
 *
 * Usage:
 *   node ghiblistyle.js "your prompt here"
 *   node ghiblistyle.js "your prompt" --size portrait --style anime
 *   node ghiblistyle.js "your prompt" --token YOUR_NETA_TOKEN
 */
import { readFileSync } from 'fs';
import { homedir } from 'os';

const args   = process.argv.slice(2);
const getFlag = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };

const PROMPT = args.find(a => !a.startsWith('--')) || 'Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition';
const SIZE   = getFlag('--size')  || 'landscape';
const STYLE  = getFlag('--style') || 'anime';
const TOKEN  = getFlag('--token') || process.env.NETA_TOKEN || (() => {
  try {
    return readFileSync(`${homedir()}/.openclaw/workspace/.env`, 'utf8')
      .match(/NETA_TOKEN=(.+)/)?.[1]?.trim();
  } catch { return null; }
})();

if (!TOKEN) {
  console.error('Error: NETA_TOKEN not set. Use --token or add NETA_TOKEN to ~/.openclaw/workspace/.env');
  process.exit(1);
}

const SIZES = {
  square:    { width: 1024, height: 1024 },
  portrait:  { width: 832,  height: 1216 },
  landscape: { width: 1216, height: 832  },
  tall:      { width: 704,  height: 1408 },
};
const { width, height } = SIZES[SIZE] || SIZES.landscape;

async function run() {
  const res = await fetch('https://api.talesofai.cn/v3/make_image', {
    method: 'POST',
    headers: { 'x-token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: PROMPT,
      extra_param: { width, height },
      style_args: [{ style_name: STYLE }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('API error:', res.status, text);
    process.exit(1);
  }

  const { task_uuid } = await res.json();
  if (!task_uuid) { console.error('No task ID returned'); process.exit(1); }

  // Poll until done
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const poll = await fetch(`https://api.talesofai.cn/v1/artifact/task/${task_uuid}`, {
      headers: { 'x-token': TOKEN },
    });
    const data = await poll.json();
    const status = (data.status || '').toUpperCase();

    if (status === 'DONE') {
      console.log(data.result_image_url || data.image_url || data.url);
      return;
    }
    if (status === 'FAILED') {
      console.error('Generation failed:', JSON.stringify(data));
      process.exit(1);
    }
  }

  console.error('Timed out waiting for image');
  process.exit(1);
}

run();
