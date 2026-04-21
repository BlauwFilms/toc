# toc

A lightweight, dependency-free Table of Contents generator for the BlauwFilms website — built for Webflow.

Automatically scans your rich text content, builds a linked TOC, and highlights the active heading as the reader scrolls.

---

## Features

- **Left-aligned by default** — clean, flat list with no nesting clutter
- **Active heading tracking** — highlights the current section while scrolling
- **No toggle / collapse** — always visible, always readable
- **Zero dependencies** — vanilla JS, no build step
- **Webflow-ready** — drop it in via a custom code embed

---

## Usage in Webflow

Add this to your page's **Before `</body>` tag** custom code (or in an Embed block at the bottom of the page):

```html
<script src="https://cdn.jsdelivr.net/gh/blauwfilms/toc@1.0.0/script.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    new Toc(
      "rich-text-blauw-films",  // CSS class of your rich text block
      "toc-wrapper",            // CSS class of your TOC container div
      ["h2"],                   // Heading levels to include
      0                         // Indent size in px (0 = all flush left)
    );
  });
</script>
```

> **Note:** After publishing a new version to GitHub, update the version number in the jsDelivr URL (e.g. `@1.0.1`) to bust the CDN cache.

---

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `textSource` | `string` | required | CSS class name of the rich text container element(s) |
| `targetDiv` | `string` | required | CSS class name of the element where the TOC will be rendered |
| `headingTypes` | `string[]` | `["h1"…"h6"]` | Which heading levels to include |
| `indentSize` | `number` | `0` | Pixels of left-indent per heading level. `0` keeps everything flush left |

---

## Styling

The script generates this HTML structure inside your `.toc-wrapper`:

```html
<div class="toc">
  <div class="toc-item toc-item-toc-h0">
    <a href="#toc-h0" class="toc-heading toc-h1">Section Title</a>
  </div>
  ...
</div>
```

Style it in Webflow or your global CSS. A minimal starting point:

```css
.toc a.toc-heading {
  display: block;
  padding: 4px 0;
  color: inherit;
  text-decoration: none;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.toc a.toc-heading:hover,
.toc a.toc-heading.toc-active {
  opacity: 1;
}
```

The `.toc-active` class is added to the link of whichever heading is currently in view.

---

## Versioning & CDN

This repo is served via [jsDelivr](https://www.jsdelivr.com/). After tagging a release on GitHub:

```
https://cdn.jsdelivr.net/gh/blauwfilms/toc@VERSION/script.js
```

Replace `VERSION` with the tag, e.g. `1.0.0`.

---

## License

MIT — free to use and modify.
