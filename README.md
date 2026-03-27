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

```
NETA_TOKEN=your_token_here
```

---

## Default prompt

When no prompt is provided, the script uses:

> Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition

## Example Output

![Generated example](https://oss.talesofai.cn/picture/efe3894e-74fe-4889-a10b-e26688d552aa.webp)
