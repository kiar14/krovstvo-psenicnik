# New logo: PŠENIČNIK storitve d.o.o.

Brand colours (same as the site): **navy `#002D8A`**, **terracotta `#BA3201`**, **spruce `#D9A864`** (optional accent), white.

---

## 1 · Prompt for the image generator

Best in **Recraft** (it can output real vector/SVG directly and has free daily credits), otherwise Midjourney, GPT-image, Ideogram or Nano Banana. Make 4+ variants.

```
Minimal, premium flat vector logo for a Slovenian master roofing, tinsmith and carpentry company. Symbol on the left: a simple, bold geometric house roof: a gable roof at about 40 degrees drawn with two thick navy strokes meeting at a sharp ridge, the right slope extending slightly past the wall like an eave, a small upright chimney in terracotta, and 2 or 3 thin parallel lines inside the roof suggesting roof tiles or standing-seam sheet metal. No walls, no door, no windows: just the roof, so it reads instantly at small size. Wordmark to the right of the symbol: "PŠENIČNIK" in bold, uppercase, condensed geometric sans-serif, navy, with the háček accents on Š and Č clearly drawn. Under it, smaller and letter-spaced: "KROVSTVO · KLEPARSTVO · TESARSTVO" in terracotta. Colours only navy #002D8A and terracotta #BA3201 on a pure white background. Flat solid colours, crisp geometric edges, balanced proportions, generous padding, centred. No gradients, no shadows, no 3D, no textures, no mockup, no extra icons, no hands, no hammers, no sun or mountains. Timeless, trustworthy, craftsman-grade, works in one colour and at favicon size.
```

**Tip:** AI often gets **Š and Č wrong**. That's fine: pick the variant with the best **symbol**, and the Cowork prompt below rebuilds the lettering with a real font.

---

## 2 · Prompt for Claude Cowork (PNG → proper SVG logo)

Attach the chosen logo image and paste:

```
Attached is an AI-generated logo for my client PŠENIČNIK storitve d.o.o. (a roofing, tinsmith and carpentry company in Slovenia). Turn it into a proper, production-ready SVG logo kit.

1. Rebuild the house/roof SYMBOL as clean vector geometry (straight lines, exact angles, consistent stroke widths, symmetric where intended). Don't just auto-trace blobs. If you need a first pass, auto-trace it (e.g. potrace/vtracer) and then clean it up to simple paths.
2. Rebuild the TEXT with a real font instead of tracing it, so the Š and Č accents are correct: "PŠENIČNIK" in Big Shoulders Display (Bold/ExtraBold, Google Fonts, OFL licence) or the closest match to the image, and the tagline "KROVSTVO · KLEPARSTVO · TESARSTVO" letter-spaced. Convert all text to outlines (paths) so the SVG needs no font.
3. Use exactly these colours: navy #002D8A, terracotta #BA3201. No gradients, no embedded images.
4. Deliver these files:
   - logo-horizontal.svg (symbol left, name + tagline right, full colour)
   - logo-stacked.svg (symbol above the name)
   - logo-symbol.svg (symbol only, square viewBox)
   - logo-white.svg (all white, for navy backgrounds)
   - logo-navy.svg (one colour, navy)
   - favicon.svg, plus PNG exports: 32×32, 180×180 (apple-touch-icon), 512×512
5. Tight viewBox, no fixed width/height, no transforms left over, optimised with SVGO, readable path IDs. Check that the symbol still reads at 32 px.
6. Show me a preview sheet (PNG) of all versions on white and on navy, then give me the files as a zip.
```

**Free alternatives, if you'd rather do it yourself:**
- **Recraft:** generate the logo there and download it as SVG directly.
- **SVGcode** (svgcode.app, free, runs in the browser) or **Inkscape** (free desktop app: *Path → Trace Bitmap → Multiple scans → Colours*). Then fix the lettering by retyping it in Inkscape with Big Shoulders Display and choosing *Path → Object to Path*.
