# Asset plan: PŠENIČNIK storitve d.o.o.

**Step:** A2 · Asset plan (home page)
**Direction:** A · Ostrešje · **Signature moment:** ② Staro → novo
**Rule:** AI is only for illustrative images (hero, service visuals, before/after illustration, share image). **Team, Tomo, van and references must be real client photos.** No text or logos inside any generated image; all text is added in code.

---

## House style

Paste this at the end of **every** image prompt so all pictures look like one shoot:

```
Photorealistic architectural photography in the pre-alpine countryside of Koroška (Carinthia), northern Slovenia: green hills, spruce forest and the Drava valley in the background. Soft, clear early-morning light from the side, crisp air, gentle cool shadows. Natural, slightly muted colours; the roofing is warm terracotta clay (around #BA3201), metal parts are anthracite grey, any timber is fresh spruce (around #D9A864), and the upper sky deepens toward navy blue (around #002D8A). Shot on a full-frame camera with a 35–50 mm lens at eye level or from a low scaffold height, sharp material detail, realistic textures, true-to-life proportions. Calm, orderly, well-kept. No people, no text, no letters, no logos, no watermarks, no brand markings on any product.
```

**Tools:** Midjourney v7, Flux 1.1 Pro, GPT-image or Nano Banana (Gemini) for new images. For "same image, change only…" edits use **Nano Banana, GPT-image edit or Flux Kontext**, which keep the framing identical.
**Make 2–4 variants of each** and pick the most believable one (check the tiles, gutters and windows for AI mistakes).

---

## Signature moment: Staro → novo

**Where:** home › section 4, pinned, full width (see `docs/demo-plan.md`).
**Visitor sees:** a tired grey roof on a typical Koroška house, and a chalk line sweeping left → right that reveals the same house with a new terracotta roof.

### What to create
| File | What | Size | Notes |
|---|---|---|---|
| `before-after-before.jpg` | the house **before** | **2400 × 1600** (3:2) | Make this first |
| `before-after-after.jpg` | the **same** image, new roof | **2400 × 1600** (3:2) | Must be an **edit of the before image**, pixel-aligned: the same camera, framing, trees and sky |

We crop a 4:5 portrait version for mobile in code, so **keep the house centred with some space on both sides.**

### Prompt 1: before (generate)
```
A typical two-storey family house from the 1970s in the Koroška countryside, Slovenia: white-grey rendered walls, wooden balcony along the upper floor, simple gable roof with a pitch of about 40 degrees. The roof is covered with old, faded grey corrugated fibre-cement sheets, patches of green moss and dark lichen, a few cracked and stained sheets, bent and rusty galvanised gutters, a worn brick chimney with old flashing. The house stands on a slight slope with a lawn and an apple tree in front; spruce forest and green hills behind. Camera: three-quarter front view from the garden, eye level, 35 mm lens, the whole roof clearly visible, the house centred with space on both sides. Overcast-bright morning light. Aspect ratio 3:2.
```
+ house style (use it as is; the "terracotta roofing" line in it doesn't apply to this old roof, so the prompt above overrides it).

### Prompt 2: after (edit of the before image)
```
Same image, same camera, same framing, same house walls, balcony, windows, garden, apple tree, hills and sky, same light. Change only the roof: replace the old grey fibre-cement sheets with a brand-new roof of terracotta clay tiles (warm red-orange, even rows, clean ridge tiles), new anthracite-grey half-round aluminium gutters and downpipes, neat anthracite chimney flashing, a rendered chimney with a new cap, two roof windows set into the front roof slope, and a row of small metal snow guards above the eaves. No moss. Everything else stays exactly the same.
```
If the edit shifts anything (a tree, the horizon), redo it. The reveal only works if both images line up exactly.

**Build (A3):** the two images are stacked. The top one (after) gets `clip-path: inset(0 0 0 X%)`, scrubbed by a pinned GSAP ScrollTrigger, and then becomes a draggable, keyboard-accessible handle. There's a small "ilustracija" tag. With reduced motion, the pair is shown side by side.

---

## Pictures on the home page

| ID | Page › section | Ratio · size | AI / real | Prompt (+ house style) |
|---|---|---|---|---|
| **H1** | Home › Hero (right side, tall) | **4:5 · 2000 × 2500** (mobile uses a 4:3 crop from the centre) | AI | `A newly finished roof on a rural Koroška family house seen from a low scaffold height: the lower half of the frame is a close-up of warm terracotta clay tiles in perfect rows with a row of small metal snow guards and a neat anthracite gutter along the eave; the upper half opens to spruce forest, green hills and a deepening blue morning sky. Strong diagonal of the roof slope running from bottom left to top right. Very clean, precise detail. Vertical 4:5.` |
| **S1** | Home › Services › **Krovstvo in ravne strehe** (large card) | 4:3 · 1600 × 1200 | AI | `Close-up of a freshly laid terracotta clay tile roof, looking along the rows toward the ridge, with a clean ridge line and one neatly flashed chimney; soft side light shows the tile profile; hills softly out of focus in the background. 4:3.` |
| **S2** | Home › Services › **Kleparstvo** | 4:3 · 1600 × 1200 | AI | `Detail of precise tinsmith work at the eave of a house: an anthracite half-round aluminium gutter with a hopper and downpipe, crisp folded sheet-metal flashing along a rendered wall, clean rivets and joints, terracotta tiles just visible above. 4:3.` |
| **S3** | Home › Services › **Tesarstvo in nadstreški** | 4:3 · 1600 × 1200 | AI | `A new roof structure of fresh spruce timber rafters and a ridge beam on a house under construction, seen from below against a clear blue morning sky, crisp joints and metal connectors, the geometry of the rafters forming strong parallel lines. 4:3.` |
| **S4** | Home › Services › **Strešna okna in svetlobniki** | 4:3 · 1600 × 1200 | AI (option: the real photo #10 from the old site) | `Two modern roof windows with anthracite frames and flashing, installed side by side in a dark anthracite concrete tile roof, glass reflecting the sky and clouds, tight clean flashing all around. 4:3.` |
| **S5** | Home › Services › **Strelovodi** | 4:3 · 1600 × 1200 | AI | `A stainless steel lightning conductor wire running neatly along the ridge of a terracotta tile roof on small metal supports, then down the roof edge; a church tower and hills softly visible in the background. Clean, precise, safe-looking installation. 4:3.` |
| **A1** | Home › O nas › Tomo and the team | 4:5 · min 1600 × 2000 | **REAL photo from client** (MISSING, placeholder until then) | Photo brief for the client: Tomo (and Saša/the crew) in work clothes, in front of the company van or a finished roof, daylight, looking at the camera, not posed stiffly. No AI. |
| **R1–R8** | Home › Reference (mosaic) | originals, as large as possible | **REAL photos from client** | Use the 12 existing photos from the old site for the demo (the list of URLs is below); replace them with originals and newer projects later |
| **V1** | Home › Reference › video tile | 16:9 | **REAL** (their YouTube) | `https://www.youtube.com/watch?v=_OUYnEGb5m8`, embedded with a click-to-load cover. The cover image is YouTube's thumbnail |
| **M1** | Home › Območje (map) | SVG | drawn in code | No asset needed |
| **OG** | Share image (social / WhatsApp link preview) | **1.91:1 · 1200 × 630** | AI (crop of H1) | Use H1, crop horizontally with the roof diagonal and sky; the wordmark and phone are added in code |
| **B1** | Old → new pair | see above | AI | see Signature moment |

**Not needed as images:** trust bar icons, process steps, brand names (all built in code as type and line icons).

---

## Checklist for you

Put everything in **`assets/raw/`** (lower case, no spaces, `.jpg` or `.png`):

**Generate (AI):**
- [ ] `before-after-before.jpg`: 2400 × 1600
- [ ] `before-after-after.jpg`: 2400 × 1600, an edit of the before image
- [ ] `hero.jpg`: 2000 × 2500
- [ ] `service-krovstvo.jpg`: 1600 × 1200
- [ ] `service-kleparstvo.jpg`: 1600 × 1200
- [ ] `service-tesarstvo.jpg`: 1600 × 1200
- [ ] `service-stresna-okna.jpg`: 1600 × 1200
- [ ] `service-strelovodi.jpg`: 1600 × 1200

**Collect (real, from the old site; download in your browser, since the old site is blocked from this environment):**
- [ ] Gallery photos: `http://www.krovstvo-psenicnik.si/kdo_htm_files/2532.jpg` to `…/2543.jpg` (12 files), saved as `ref-01.jpg` … `ref-12.jpg`
- [ ] If the pages show bigger versions, grab those too. Otherwise these are the best we have until the client sends originals.

**From the client (MISSING, the demo uses placeholders):**
- [ ] `team.jpg`: Tomo and the team (real photo, 4:5)
- [ ] `logo.svg`: the logo in vector format (until then: a typeset wordmark)
- [ ] Originals of the project photos, plus newer projects
- [ ] A real before/after pair from the same spot (would replace the illustration)

If files are missing when we get to A3, I build with marked placeholders, so you only have to drop the files in.
