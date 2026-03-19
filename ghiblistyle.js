#!/usr/bin/env node
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

// --- Config ---
const DEFAULT_PROMPT =
  "Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition";

const SIZES = {
  square:    { width: 1024, height: 1024 },
  portrait:  { width: 832,  height: 1216 },
  landscape: { width: 1216, height: 832  },
  tall:      { width: 704,  height: 1408 },
};

// --- CLI parsing ---
const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    const key = args[i].slice(2);
    flags[key] = args[i + 1] ?? true;
    i++;
  } else {
    positional.push(args[i]);
  }
}

const prompt   = positional.join(" ") || DEFAULT_PROMPT;
const sizeName = flags.size  || "landscape";
const style    = flags.style || "anime";

if (!SIZES[sizeName]) {
  console.error(`Unknown size "${sizeName}". Valid: ${Object.keys(SIZES).join(", ")}`);
  process.exit(1);
}
const { width, height } = SIZES[sizeName];

// --- Token resolution ---
function readToken() {
  if (flags.token) return flags.token;
  if (process.env.NETA_TOKEN) return process.env.NETA_TOKEN;

  const envPath = join(homedir(), ".openclaw", "workspace", ".env");
  try {
    const content = readFileSync(envPath, "utf8");
    const match = content.match(/NETA_TOKEN=(.+)/);
    if (match) return match[1].trim();
  } catch {
    // file not found or unreadable
  }

  console.error(
    "No NETA_TOKEN found. Set the env var, pass --token <TOKEN>, " +
    "or add NETA_TOKEN=... to ~/.openclaw/workspace/.env"
  );
  process.exit(1);
}

const TOKEN = readToken();

// --- API calls ---
async function makeImage() {
  const res = await fetch("https://api.talesofai.cn/v3/make_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": TOKEN,
    },
    body: JSON.stringify({
      prompt,
      extra_param: { width, height },
      style_args: [{ style_name: style }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`make_image failed (${res.status}): ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  const taskUuid = data.task_uuid ?? data.uuid ?? data.id;
  if (!taskUuid) {
    console.error("No task_uuid in response:", JSON.stringify(data));
    process.exit(1);
  }
  return taskUuid;
}

async function pollTask(taskUuid) {
  const maxAttempts = 60;
  const intervalMs  = 3000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, intervalMs));

    const res = await fetch(
      `https://api.talesofai.cn/v1/artifact/task/${taskUuid}`,
      { headers: { "x-token": TOKEN } }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Poll failed (${res.status}): ${text}`);
      process.exit(1);
    }

    const data = await res.json();
    const status = (data.status ?? "").toUpperCase();

    if (status === "DONE") {
      const url =
        data.result_image_url ?? data.image_url ?? data.url;
      if (!url) {
        console.error("Task DONE but no image URL found:", JSON.stringify(data));
        process.exit(1);
      }
      console.log(url);
      process.exit(0);
    }

    if (status === "FAILED") {
      console.error("Task FAILED:", data.error ?? data.message ?? JSON.stringify(data));
      process.exit(1);
    }

    // still pending — keep polling
    process.stderr.write(`[${attempt}/${maxAttempts}] status=${status} ...\r`);
  }

  console.error("Timed out waiting for task to complete.");
  process.exit(1);
}

// --- Main ---
(async () => {
  const taskUuid = await makeImage();
  process.stderr.write(`Task created: ${taskUuid}\n`);
  await pollTask(taskUuid);
})();
