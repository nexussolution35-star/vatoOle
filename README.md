# Vato Style — Bespoke Joinery & Custom Kitchens

A conversion-focused marketing website for **Vato Style**, a Pretoria-based
joinery and kitchen-remodelling company (joinery · board cut & edge · wrap doors).

## How this site was built

This site was designed to a specific brief that blends two reference sites:

| Source | Role | What was taken |
| --- | --- | --- |
| **Website A — Newmark Hotels** | *Conversion framework* | The exact home-page **section sequence** and every conversion element. |
| **Website B — Moremi Kitchens** | *Visual reference* | Typography, spacing, image treatments, overlays, card styling, parallax-style reveals, and all **project imagery** (downloaded into `assets/img/gallery/`). |
| **Vato Style logo & vatostyle.co.za** | *Brand & content* | Lime-green + black brand palette and the real services, contact details and copy. |

### Section sequence (mirrors Website A's conversion architecture)

1. Top utility bar (location + phone + email)
2. Sticky header with primary nav + Call / Get-a-Quote CTAs
3. **Hero slider** — featured project carousel (auto-play, dots, arrows)
4. **Quick-quote bar** — inline "book a consultation" capture (A's booking widget)
5. **Intro band** — company value statement + key stats
6. **Process** — concept → design → manufacture → execution
7. **What We Craft** — category grid + service-area chips (A's "Destinations")
8. **Featured Services** — horizontal card slider (A's "Featured experiences")
9. **Portfolio** — masonry image gallery
10. **Journal** — editorial story cards (A's "Inspiring stories")
11. **Newsletter** — email capture
12. **Testimonials** — client quotes slider (A's "What our clients say")
13. **Credentials strip** — trust stats (A's "Awards & associations")
14. **Final CTA band** — full-bleed "Get your free quote" (A's "Join & enjoy more")
15. **Footer** — contact, nav, services, hours

`quote.html` is the conversion endpoint that every CTA points to.

## Tech

Plain, dependency-free HTML/CSS/JS — deploys to any static host.

```
index.html          Home page (full conversion architecture)
quote.html          Get-a-quote / contact page
assets/css/style.css  Design system
assets/js/main.js     Slider, drawer, scroll-reveal, form handling
assets/img/         Brand SVG logos + downloaded project gallery
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- The contact and quote forms are front-end only (demo handling). Wire them to a
  mail service / backend (e.g. Formspree, Netlify Forms) before going live.
- Replace the placeholder testimonials and gallery images with Vato Style's own
  approved project photography when available.
