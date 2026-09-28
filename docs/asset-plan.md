# Asset plan: PŠENIČNIK storitve d.o.o.

**Step:** A2 · Asset plan (home page), revision 2
**Direction:** A · Ostrešje · **Signature moment:** the hero (old → new roof)
**Rule:** AI is only for illustrative images (hero, service visuals, share image). **Team, Tomo, van and references must be real client photos.** No text or logos inside any generated image; all text is added in code.

---

## House style

Paste this at the end of **every** image prompt so all pictures look like one shoot (your hero pair already sets the look: a white rendered Koroška house, spruce hills, clay tiles):

```
Photorealistic architectural photography in the pre-alpine countryside of Koroška (Carinthia), northern Slovenia: green hills, spruce forest and the Drava valley in the background. Clear daylight from the side, crisp air, natural colours; roofing is warm terracotta clay (around #BA3201), metal parts are anthracite grey, any timber is fresh spruce (around #D9A864), blue sky with a few white clouds. Shot on a full-frame camera with a 35–50 mm lens, sharp material detail, realistic textures and true-to-life proportions. Calm, orderly, well-kept. No people, no text, no letters, no logos, no watermarks, no brand markings on any product.
```

**Tools:** Midjourney v7, Flux 1.1 Pro, GPT-image or Nano Banana for new images. For "same image, change only…" edits use Nano Banana, GPT-image edit or Flux Kontext.
**Make 2–4 variants of each** and pick the most believable one (check the tiles, gutters and windows for AI mistakes).

---

## Signature moment: the hero (Staro → novo)

**Where:** home › section 1, full screen. The before image shows first, then the chalk line wipes to the after image (see `docs/demo-plan.md`).

| File | Status | Size | Notes |
|---|---|---|---|
| `hero-before-desktop.webp` | ✅ received | 1672 × 941 | Storm, old mossy roof |
| `hero-after-desktop.webp` | ✅ received | 1672 × 941 | Sun, new terracotta roof, 2 roof windows, snow guards, new gutter |
| `hero-before-mobile.webp` | ✅ received | 1122 × 1402 (4:5) | |
| `hero-after-mobile.webp` | ✅ received | 1122 × 1402 (4:5) | |

**Notes on what you sent:**
- **Both pairs are pixel-aligned** (checked with a 50/50 overlay: no ghosting). Good.
- **Upscale the desktop pair 2× (to ~3344 × 1882)** with the same tool for both (e.g. Magnific, Krea, Topaz, or the upscaler in your generator). At 1672 px wide, a full-screen hero looks soft on 1920 px and larger screens. Upscale both with the same settings so they still line up.
- For the mobile after image, use the prompt below as an edit of `hero-before-mobile`:

```
Same image, same camera, same framing, same house walls, balcony, windows, door, garden, bushes, path, trees and hills. Change only: the weather becomes a sunny day with blue sky and a few white clouds (no fog, dry path), and the roof becomes a brand-new roof of terracotta clay tiles in even rows with clean ridge tiles, two roof windows on the front slope, a row of small metal snow guards above the eave, new anthracite half-round gutters and downpipe, and a rendered chimney with an anthracite cap. No moss. Match the look of the desktop after image exactly.
```

---

## Pictures on the home page

| ID | Page › section | Ratio · size | AI / real | Prompt (+ house style) |
|---|---|---|---|---|
| **H1–H4** | Home › Hero | see above | AI | ✅ all 4 received |
| **S1** | Services › **Krovstvo in ravne strehe** | 4:3 · 1600 × 1200 | AI | `Close-up of a freshly laid terracotta clay tile roof, looking along the rows toward the ridge, with a clean ridge line and one neatly flashed chimney; soft side light shows the tile profile; hills softly out of focus in the background. 4:3.` |
| **S2** | Services › **Kleparstvo** | 4:3 · 1600 × 1200 | AI | `Detail of precise tinsmith work at the eave of a house: an anthracite half-round aluminium gutter with a hopper and downpipe, crisp folded sheet-metal flashing along a rendered wall, clean joints, terracotta tiles just visible above. 4:3.` |
| **S3** | Services › **Tesarstvo in nadstreški** | 4:3 · 1600 × 1200 | AI | `A new roof structure of fresh spruce timber rafters and a ridge beam on a house under construction, seen from below against a clear blue sky, crisp joints and metal connectors, the rafters forming strong parallel lines. 4:3.` |
| **S4** | Services › **Strešna okna in svetlobniki** | 4:3 · 1600 × 1200 | AI (option: real photo #10 from the old site) | `Two modern roof windows with anthracite frames and flashing, installed side by side in a terracotta clay tile roof, glass reflecting the sky and clouds, tight clean flashing all around. 4:3.` |
| **S5** | Services › **Strelovodi** | 4:3 · 1600 × 1200 | AI | `A stainless steel lightning conductor wire running neatly along the ridge of a terracotta tile roof on small metal supports, then down the roof edge; a church tower and hills softly visible in the background. Clean, precise installation. 4:3.` |
| **S6** | Services › **Višinska dela** | 4:3 · 1600 × 1200 | AI | `A truck-mounted aerial work platform with its basket raised beside the eave of a tall white rendered house in the Koroška countryside, a neat steel scaffold along the facade, clean orderly site, spruce hills behind. No people. 4:3.` |
| **A1** | O nas › Tomo and the team | 4:5 · min 1600 × 2000 | **REAL photo from client** (MISSING, placeholder until then) | Photo brief for the client: Tomo (and Saša/the crew) in work clothes, in front of the company van or a finished roof, daylight, looking at the camera, not posed stiffly. No AI. |
| **R1–R8** | Reference (mosaic) | originals, as large as possible | **REAL photos from client** | The 12 existing photos from the old site for the demo (URLs below) |
| **V1** | Reference › video tile | 16:9 | **REAL** (their YouTube) | `https://www.youtube.com/watch?v=_OUYnEGb5m8`, click-to-load; cover = YouTube thumbnail |
| **L1–L10** | Kritine › logo strip | SVG (or PNG ≥ 400 px wide, transparent) | **Official brand logos** | Tondach, Creaton, Bramac, Decra, Prefa, Rheinzink, Braas, Erlus, Tegola, Eternit. Download from each brand's press or media page. Until then, typeset names |
| **M1** | Območje (map) | SVG | drawn in code | No asset needed |
| **OG** | Share image | 1.91:1 · 1200 × 630 | AI (crop of `hero-after-desktop`) | Crop horizontally with the house on the right; wordmark and phone added in code |

**Not needed as images:** trust strip icons, process badges, form (all built in code).

---

## Checklist for you

Put everything in **`assets/raw/`** (lower case, no spaces):

**Hero:**
- [x] `hero-before-desktop.webp`
- [x] `hero-after-desktop.webp`
- [x] `hero-before-mobile.webp`
- [x] `hero-after-mobile.webp`
- [ ] *(recommended)* 2× upscaled desktop pair, same file names

**Generate (AI), 4:3 · 1600 × 1200:**
- [x] `service-krovstvo.webp` (1448 × 1086) ⚠️ see note below
- [x] `service-kleparstvo.webp` (1448 × 1086)
- [x] `service-tesarstvo.webp` (1448 × 1086)
- [x] `service-stresna-okna.webp` (1448 × 1086)
- [ ] `service-strelovodi.jpg`
- [ ] `service-visinska-dela.jpg`

**⚠️ Note on `service-krovstvo`:** the background looks like **Tuscany** (cypress and olive trees, a stone hill-town villa, a Mediterranean chimney), not Koroška. Recommended fix (an edit of that image):
```
Same image, same camera, same roof tiles and ridge, same light. Change only the background and the chimney: replace the cypress and olive trees and the stone villa with spruce forest, green meadows and rolling pre-alpine hills of Koroška, Slovenia, with a few white rendered houses with red roofs in the distance; replace the stone chimney with a simple white rendered chimney with an anthracite metal cap and clean anthracite flashing.
```

**Collect:**
- [x] 12 reference photos from the old site, scraped: `ref-01.jpg` … `ref-12.jpg` (800 × 579 each; originals from the client would be better)
- [ ] Brand logos (SVG preferred): `logo-tondach.svg`, `logo-creaton.svg`, `logo-bramac.svg`, `logo-decra.svg`, `logo-prefa.svg`, `logo-rheinzink.svg`, `logo-braas.svg`, `logo-erlus.svg`, `logo-tegola.svg`, `logo-eternit.svg`

**From the client (MISSING, the demo uses placeholders):**
- [ ] `team.jpg`: Tomo and the team (real photo, 4:5)
- [ ] `logo.svg`: **new logo**. Prompts are in `docs/logo-prompts.md`

If files are missing when we get to A3, I build with marked placeholders, so you only have to drop the files in.
