# Ghibli Style Image Generator

Generate breathtaking **Studio Ghibli-style illustrations** from a text prompt using AI. Powered by the Neta talesofai API, this skill produces dreamy, hand-painted anime artwork with the warmth and whimsy of a Miyazaki film — delivered as a direct image URL in seconds.

---

## Install

**Via npx skills:**
```bash
npx skills add wkl-nieta/ghibli-style-skill
```

**Via ClawHub:**
```bash
clawhub install ghibli-style-skill
```

---

## Usage

```bash
# Use the built-in default Ghibli prompt
node ghiblistyle.js

# Describe your own scene
node ghiblistyle.js "A young girl walking through a misty bamboo forest at dawn"

# Choose a size
node ghiblistyle.js "Seaside village with red torii gates" --size portrait

# Choose a style
node ghiblistyle.js "Castle in the clouds" --size landscape --style cinematic

# Pass a token inline
node ghiblistyle.js "Spirit river crossing" --token sk-xxxxxxxx
```

The script prints a single image URL to stdout on success — easy to pipe or capture.

---

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--size` | `square`, `portrait`, `landscape`, `tall` | `landscape` | Output image dimensions |
| `--style` | `anime`, `cinematic`, `realistic` | `anime` | Visual style preset |
| `--token` | any string | — | Override the API token for this run |

### Size dimensions

| Name | Width × Height |
|------|---------------|
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

---

## Token setup

You need a **Neta API token** (`NETA_TOKEN`). The script looks for it in this order:

1. `--token <TOKEN>` CLI flag
2. `NETA_TOKEN` environment variable
3. `~/.openclaw/workspace/.env` file (line matching `NETA_TOKEN=...`)

### Option A — environment variable
```bash
export NETA_TOKEN=your_token_here
node ghiblistyle.js "Totoro in a rainy field"
```

### Option B — .env file
```bash
mkdir -p ~/.openclaw/workspace
echo "NETA_TOKEN=your_token_here" >> ~/.openclaw/workspace/.env
```

---

## Default prompt

When called with no positional argument, the skill uses:

> Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition

---

## Example output

```
Task created: a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx
[4/60] status=PENDING ...
https://cdn.talesofai.cn/results/a1b2c3d4.png
```

The final line is the image URL — ready to open or embed.

---

Built with Claude Code · Powered by Neta
