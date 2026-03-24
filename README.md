# Ghibli Style Image Generator

Generate beautiful **studio ghibli ai art generator** images using AI — powered by the Neta talesofai API. Get a direct image URL back in seconds.

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
# Use the default Ghibli prompt
node ghiblistyle.js

# Describe your scene
node ghiblistyle.js "a girl standing on a hilltop watching the sunset over a misty valley"

# Specify size
node ghiblistyle.js "forest path with glowing spirits" --size portrait

# Use a reference image (picture_uuid)
node ghiblistyle.js "same scene but at night" --ref <picture_uuid>
```

The script prints a single image URL to stdout on success.

---

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--size` | `square`, `portrait`, `landscape`, `tall` | `landscape` | Output image dimensions |
| `--style` | `anime`, `cinematic`, `realistic` | `anime` | Visual style hint |
| `--token` | string | — | Override API token |
| `--ref` | picture_uuid | — | Inherit params from an existing image |

### Size reference

| Name | Dimensions |
|------|-----------|
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

---

## Token setup

The script resolves `NETA_TOKEN` in this order:

1. `--token <value>` CLI flag
2. `NETA_TOKEN` environment variable
3. `~/.openclaw/workspace/.env` — line matching `NETA_TOKEN=...`
4. `~/developer/clawhouse/.env` — line matching `NETA_TOKEN=...`

**Recommended:** add your token to `~/.openclaw/workspace/.env`:
```
NETA_TOKEN=your_token_here
```

---

## Default prompt

When no prompt is provided, the script uses:

> Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition

## About Neta

[Neta](https://www.neta.art/) (by TalesofAI) is an AI image and video generation platform with a powerful open API. It uses a **credit-based system (AP — Action Points)** where each image generation costs a small number of credits. Subscriptions are available for heavier usage.

### Register

| Region | Sign up | Get token |
|--------|---------|-----------|
| Global | [neta.art](https://www.neta.art/) | [Open Portal → API Token](https://www.neta.art/open/) |
| China  | [nieta.art](https://app.nieta.art/) | [Security Settings](https://app.nieta.art/security) |

New accounts receive free credits to get started.

### Pricing

Neta uses a pay-per-generation credit model. View current plans and credit packages on the [pricing page](https://www.neta.art/pricing).

- Free tier: limited credits on signup
- Subscription: monthly AP allowance via Stripe
- One-time packs: top up credits as needed

### Get your API token

1. Sign in at [neta.art/open](https://www.neta.art/open/) (global) or [nieta.art/security](https://app.nieta.art/security) (China)
2. Generate a new API token
3. Set it as `NETA_TOKEN` in your environment or pass via `--token`

```bash
export NETA_TOKEN=your_token_here
node ghiblistyle.js "your prompt"

# or inline
node ghiblistyle.js "your prompt" --token your_token_here
```

---

Built with [Claude Code](https://claude.ai/claude-code) · Powered by [Neta](https://www.neta.art/) · [API Docs](https://www.neta.art/open/)