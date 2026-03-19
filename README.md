# Ghibli Style Image Generator

Generate **studio ghibli ai art generator** images with AI. Describe what you want in plain English and get a direct image URL back in seconds.

Powered by the [Neta](https://talesofai.cn) AI image API.

---

## Getting started

Install the skill:

```bash
npx skills add wkl-nieta/ghibli-style-skill
```

Then use it in your Claude/OpenClaw agent, or run directly:

```bash
node ghiblistyle.js "Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition"
```

---

## Examples

**Basic:**
```bash
node ghiblistyle.js "Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition"
```

**Portrait format:**
```bash
node ghiblistyle.js "your description here" --size portrait
```

**Different style:**
```bash
node ghiblistyle.js "your description here" --style cinematic
```

---

## Options

| Flag | Values | Default |
|------|--------|---------|
| `--size` | `square`, `portrait`, `landscape`, `tall` | `landscape` |
| `--style` | `anime`, `cinematic`, `realistic` | `anime` |
| `--token` | your Neta API token | `NETA_TOKEN` env var |

---

## Token setup

Get your Neta API token from [talesofai.cn](https://talesofai.cn) and add it to your environment:

```bash
# Add to ~/.openclaw/workspace/.env
NETA_TOKEN=your_token_here
```

Or pass it directly with `--token your_token`.

---

## Install via ClawHub

```bash
clawhub install ghibli-style-skill
```

---

Built with [Claude Code](https://claude.ai/claude-code) · Powered by [Neta](https://talesofai.cn)
