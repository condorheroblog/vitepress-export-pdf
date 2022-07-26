# vitepress-export-pdf

`vitepress-export-pdf` allows you to export your sites to a PDF file.

<p align="center">
    <a href="https://www.npmjs.com/package/vitepress-export-pdf" target="__blank">
        <img src="https://img.shields.io/npm/v/vitepress-export-pdf.svg?color=a1b858" alt="NPM version">
    </a>
    <a href="https://www.npmjs.com/package/vitepress-export-pdf" target="__blank">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/vitepress-export-pdf.svg?color=50a36f">
    </a>
    <br />
</p>

> Inspired by [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export) and [vuepress-plugin-pdf-export](https://github.com/SnowdogApps/vuepress-plugin-pdf-export)

## Installation

```sh
npm install vitepress-export-pdf -D
```

then add script to your `package.json`:

```json
{
  "scripts": {
    "export-pdf": "press-export-pdf export [path/to/your/docs]"
  }
}
```

Then run:

```sh
npm run export-pdf
```
