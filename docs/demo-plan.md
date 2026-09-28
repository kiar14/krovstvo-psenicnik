# Demo plan: PŠENIČNIK storitve d.o.o.

**Step:** A2 · Demo plan. **Status: revision 2, waiting for the remaining images.**
**Chosen:** visual direction **A · Ostrešje**. The signature moment now lives **in the hero** (old → new roof).
**Based on:** `docs/research.md`, `PRODUCT.md`, and your feedback of 2026-09-28
**Design references:** `docs/references/form-reference.png` (inquiry form), `docs/references/process-reference.png` (process)
**Language:** Slovenian by default, German (`/de`) via the switch. All page texts come in A3.

---

## Navigation

A sticky bar, transparent over the hero, turning into a solid cement-grey bar once you scroll.

- **Left:** "PŠENIČNIK" wordmark (set in code; the logo files are MISSING).
- **Centre:** Storitve · Reference · O nas · Kontakt
- **Right:** language switch 🇸🇮 **SL** / 🇩🇪 **DE** (flag next to the word), then a terracotta button **☎ 041 757 179** (a `tel:` link).
- **Mobile:** the wordmark, a round phone button and a menu button. The menu opens full-screen with the same items and the language switch at the bottom.

---

## Home page

| # | Name | What it is | What it looks like |
|---|---|---|---|
| 1 | **Hero: Staro → novo** (signature moment) | The promise "Hitro, kvalitetno in v dogovorjenih rokih", who they are (a master tinsmith-roofer from Koroška who also works in Austria), and two actions: call, or send an inquiry. The picture itself tells the story: the same house goes from an old, mossy roof in a storm to a new roof in the sun | A full-screen photo, with the house on the right and the headline and buttons on the left over the hills (with a soft dark gradient behind the text). It starts on the **before** image. After ~1 s a thin spruce-coloured chalk line with a small round handle sweeps from left to right (~1.8 s) and reveals the **after** image. The storm clears to sun, and the small label above the headline changes from "Pred" (before) to "Po" (after). The handle then stays on screen and can be dragged back and forth (mouse, touch, keyboard arrows). The **trust strip sits at the bottom of the hero** (see #2). On mobile it's the same wipe in the portrait images |
| 2 | **Trust strip** (part of the hero) | Five points: **Mojster klepar-krovec (OZS)** · **V dogovorjenih rokih** · **Z vami od 2010** · **Krovstvo, kleparstvo, tesarstvo na enem mestu** · **Delamo tudi v Avstriji** | **Desktop:** a frosted navy band glued to the bottom edge of the hero, five items in one row with thin line icons, separated by short 40° roof-pitch strokes. **Mobile:** directly under the hero image as a solid navy block, 2 columns (the fifth item spans both) |
| 3 | **Services** | **6 cards:** ① Krovstvo in ravne strehe · ② Kleparstvo · ③ Tesarstvo in nadstreški · ④ Strešna okna in svetlobniki · ⑤ Strelovodi · ⑥ Višinska dela | A 3 × 2 grid on desktop, 2 × 3 on tablet, and one column on mobile. Each card has a photo (4:3), a name, one line of text and an arrow. On hover the photo slides up a few pixels and a chalk line snaps under the name |
| 4 | **Inquiry form** | The main lead form, placed right under the services so people can ask straight after choosing a service | **A copy of the layout in `form-reference.png`, tailored to the brand:** a large rounded card (radius ~16 px, soft shadow) centred on a slightly darker band with a hairline top and bottom. **Left panel (~40%)** in **navy `#002D8A`**: a three-line headline (the first two lines white, the third line in **spruce `#D9A864`**), a short text in light grey, a hairline divider, a small tracked label "ALI NAS POKLIČITE" (or call us), a phone icon + a big **041 757 179**, and the email with an ↗ arrow. **Right panel (~60%)** is off-white. A 2-column form with labels above bordered inputs (radius ~8 px): *Ime in priimek* · *Telefon* / *Vrsta storitve* (a select of the 6 services + "Drugo") · *Sporočilo (neobvezno)* (a textarea). Below them, a **terracotta button "Pošlji povpraševanje ↗"** and a small grey note on the right: "Predstavitveni obrazec. Podatki se ne pošiljajo ali shranjujejo." (demo form; nothing is sent or stored). The select is styled like the other inputs (in the reference it's an unstyled browser default). The demo shows a success state inside the card. **Mobile:** the panels stack (navy on top), and the fields go to one column |
| 5 | **Process** | "Od ogleda do prevzema" in **4 steps**: ① Pokličete ali pošljete povpraševanje (you call or send an inquiry) → ② Ogled in izmere (site visit and measuring) → ③ Ponudba in dogovorjen rok (quote and an agreed deadline) → ④ Izvedba in prevzem v roku (the work, and handover on time) | **A copy of the layout in `process-reference.png`:** a light section, a centred eyebrow "POSTOPEK" with short terracotta lines on both sides, then a big centred headline. Below, 4 columns: **terracotta rounded-square number badges** (01–04) joined by a thin grey line, a bold title under each and two lines of grey centred text. Headline in the brand's display face, body in Atkinson. **Mobile:** a vertical list with the badges on the left and the connecting line running down |
| 6 | **Reference** | Real projects from the old site (12 photos) and their YouTube video | A mosaic of 6–8 real photos (the van, the flat-roof house, the carport, blue metal tiles, roof windows, a red tile roof with a dormer), each with a small caption (roof type + material). The video is a large tile that loads YouTube only on click. A "Vse reference" link goes to a gallery page (later) |
| 7 | **Kritine** (brands) | The brands they install | A section title ("Kritine in materiali, s katerimi delamo", the roofing and materials we work with) and **one single line of brand logos sliding slowly from right to left in an endless loop** (it pauses on hover; with reduced motion it becomes a static row). Logos are greyscale and turn to colour on hover. Until we have the logo files, the brand names are set as type in the same slot |
| 8 | **O nas** | Tomo Pšeničnik, master tinsmith-roofer, with Saša and the team since 2010. A family business from Libeliče | A two-column layout: a large **marked placeholder** for the Tomo/team photo, and short text plus the OZS master badge. Company facts in a small "osebna izkaznica" list (d.o.o., address, tax no.) |
| 9 | **Območje** | Where they work: Libeliče, Dravograd, Otiški vrh, Ravne na Koroškem, Vuzenica, Prevalje, plus Austria | A simple drawn map of the Drava valley region with the towns as dots and the Austrian border as a dashed line. On mobile the towns are a list |
| 10 | **Kontakt CTA** | A short closing call to action | **A compact navy band (~40% of the screen height on desktop):** one line of headline on the left ("Streha, ki zdrži. Rok, ki drži.", a roof that lasts and a deadline that holds; draft), and the phone button plus an "Pošljite povpraševanje" (send an inquiry) button on the right that scrolls to the form. It stacks on mobile |
| 11 | **Footer** | Company data and hours | Company name, address, tax and registration no., phone, email, **Delovni čas: pon–pet 7:00–16:00, sobota po dogovoru** (assumed), the 6 services as links, the language switch, © 2026 |

**Removed on purpose:** the separate Staro → novo section (it's now the hero), reviews and rating, the newsletter, the mascot, the "Posebne ponudbe" roundel, and the old keyword-stuffed town lists.

---

## Visual direction: A · "Ostrešje" (chosen)

- **World:** the carpenter's and tinsmith's workshop. Rafter lines at the real roof pitch (~40°) divide sections, and chalk-line strokes snap under headings as sections arrive. Real roof photos stay the hero; timber is an accent, not a theme.
- **Palette (committed):** heritage **navy `#002D8A`** for the large fields (trust strip, form panel, CTA), **fresh spruce `#D9A864`** for the chalk line, handle and accent words, **terracotta `#BA3201`** for actions and the process badges, **graphite `#1C2126`** for text, on a cool **cement-grey `#EEF0F1`** base with off-white `#F8F8F6` cards.
- **Type:** a condensed structural display face (Big Shoulders Display; it covers č, š, ž and umlauts) for headlines and numbers; **Atkinson Hyperlegible Next** for body text and form labels (chosen for older readers).
- **Motion:** calm by default (fade and rise, a light parallax on photos, chalk-line snaps). One loud moment only: the hero wipe from old to new.
- **Mobile first:** the call button is always reachable, with large tap targets.

---

## Hero signature: technical notes

- **Images:** `hero-before-desktop` + `hero-after-desktop` (16:9) and `hero-before-mobile` + `hero-after-mobile` (4:5). **The two images in each pair must line up exactly.** I'll check the desktop pair once more when building.
- **Build:** both images are stacked. The top one (after) gets `clip-path: inset(0 0 0 X%)`, animated with GSAP on load and then controlled by the drag handle (a range input for keyboard and screen-reader use). The before image is the priority LCP image, and the after image loads right after it.
- **Reduced motion:** the after image shows straight away, and the handle is still usable.
- **Text contrast:** a left-side dark gradient under the headline, so white text stays readable on both the stormy and the sunny sky.

---

## Assumptions (to confirm later, not blocking)
- Hours: Mon–Fri 7:00–16:00, Saturday by appointment.
- The form's success message promises a reply "within 1 working day".
- The German version is a machine-assisted draft (to be proofread).
- Logo: a **new logo** is being made (prompts in `docs/logo-prompts.md`); until it arrives, a typeset wordmark "PŠENIČNIK".
- The brand logos in the Kritine strip are used as "brands we install" (common practice); swap in official logo files when collected.
