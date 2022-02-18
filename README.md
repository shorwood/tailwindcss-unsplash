# Tailwind CSS Unsplash Background

[![Version][npm-version-shield]][npm]
[![Downloads][npm-stats-shield]][npm]
[![License][license-shield]][license]

## Introduction

TailwindCSS / WindiCSS plugin to easily apply background from unsplash.com into your CSS.

Tailwind CSS:
```html
<!-- Using dynamic images -->
<div class="bg-unsplash-[YMi66afAE3I]" />
<div class="bg-unsplash-[YMi66afAE3I/lg]" />
<div class="bg-unsplash-[YMi66afAE3I/1920]" />

<!-- Using static images --> 
<div class="bg-unsplash-yosemite" />
<div class="bg-unsplash-yosemite-lg" />
<div class="bg-unsplash-yosemite-[1920]" />
```

Windi CSS:
```html
<!-- Dynamic with TailwindCSS -->
<div class="bg-unsplash-YMi66afAE3I" />
<div class="bg-unsplash-YMi66afAE3I-lg" />
<div class="bg-unsplash-YMi66afAE3I-1920" />

<!-- Image from theme --> 
<div class="bg-unsplash-yosemite" />
<div class="bg-unsplash-yosemite-lg" />
<div class="bg-unsplash-yosemite-1920" />
```

You can extract the ID like so:

- <b>ht<span>tps://unsplash.com/photos/`2GjGnBizWuQ`</b>
- <b>ht<span>tps://images.unsplash.com/photo-`1645036993886-efdfd96ca97f`?ixlib=rb-1.2.1&fit=crop&w=735&q=80</b>

When using the dynamic syntax, make sure you escape dashes:
- ❌ : `bg-unsplash-[1517411032315-54ef2cb783bb/64]`
- ✔️ : `bg-unsplash-[1517411032315\-54ef2cb783bb/64]`

## Installation

```bash
npm install -D tailwindcss-unsplash
```

```bash
yarn add -D tailwindcss-unsplash
```

```bash
pnpm add -D tailwindcss-unsplash
```

## Simple usage

```js
{
  theme: {
    unsplashImages: {
      lyon: 'YMi66afAE3I',
      stars: '4dpAqfTbvKA',
      yosemite: 'zOXUvQ3Xo3s',
      gradient: 'LeG68PrXA6Y',
    },
    unsplashResolutions: {
      default: null, // --- Allows maximum available resolution by default.
      xs: 480,
      sm: 720,
      md: 1280,
      lg: 1920,
      xl: 3840,
      '2xl': 7680,
    },
  },
  plugins: [
    require('tailwindcss-unsplash'),
  ],
}
```

The plugin generates the following utilities:

```css
.bg-unsplash-[image-key] {
  background-image: url(https://unsplash.com/photos/{image-id}/download;
}

.bg-unsplash-[image-key]-[resolution-key] {
  background-image: url(https://unsplash.com/photos/{image-id}/download?w={resolution};
}
```

[npm]: https://www.npmjs.com/package/tailwindcss-unsplash
[npm-version-shield]: https://img.shields.io/npm/v/tailwindcss-unsplash.svg?style=flat-square
[npm-stats-shield]: https://img.shields.io/npm/dt/tailwindcss-unsplash.svg?style=flat-square
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/tailwindcss-unsplash.svg?style=flat-square
