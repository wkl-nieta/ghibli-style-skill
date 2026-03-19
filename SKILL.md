---
name: ghibli-style-skill
description: Generate studio ghibli ai art generator images with AI — powered by Neta talesofai API.
tools: Bash
---

# Ghibli Style Image Generator

Ghibli Style Image Generator lets you create stunning studio ghibli ai art generator images from a text description. Just describe what you want and get back a high-quality image URL instantly.

## When to use

Use this when someone asks to generate, create, or design studio ghibli art generator images. Works great for creative projects, social media content, or personal artwork.

## Quick start

```bash
node ghiblistyle.js "your description here"
```

## Options

- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `landscape`)
- `--style` — `anime`, `cinematic`, `realistic` (default: `anime`)
- `--token` — Neta API token (or set `NETA_TOKEN` env var)

## Examples

```bash
# Basic usage
node ghiblistyle.js "Studio Ghibli style illustration, soft watercolor painting, dreamy Miyazaki aesthetic, lush natural backgrounds, warm golden light, hand-painted textures, whimsical atmosphere, detailed foliage, cinematic composition"

# With options
node ghiblistyle.js "dark fantasy warrior" --size portrait --style cinematic

# Landscape format
node ghiblistyle.js "epic battle scene" --size landscape
```

## Install

```bash
npx skills add wkl-nieta/ghibli-style-skill
```

Or via ClawHub:
```bash
clawhub install ghibli-style-skill
```
