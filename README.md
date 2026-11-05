# dev.log — Personal Developer Portfolio

A single-page developer portfolio built with **Vue 3 + Vite**, styled as a
personal "developer operating system" interface — terminal boot sequence,
system-profile panels, project "modules", and a connection-request contact
form — on a black / electric-blue / cyan color system.

All content (name, role, bio, skills, projects, contact info) is **Lorem
Ipsum placeholder data**, isolated in `src/data/`, so you can replace it
with your own information without touching any component.

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vite
- Plain CSS with CSS custom properties (no framework, no preprocessor)
- [`@lucide/vue`](https://lucide.dev/) for icons
- No router — the page is a single scrollable document with anchor
  navigation and `IntersectionObserver`-based active-section tracking

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Replacing the placeholder content

Everything you need to personalize lives in `src/data/`:

| File | Controls |
|---|---|
| `src/data/profile.js` | Name, role, tagline, bio, location, status, social links, terminal boot sequence |
| `src/data/nav.js` | Navbar section labels/order |
| `src/data/skills.js` | Tech stack groups and proficiency levels |
| `src/data/projects.js` | Project "modules" (title, stack, status, links, description, gallery images) |

No other file needs to change to update your portfolio's content.

### Project gallery images

Each project has an `images` array in `src/data/projects.js`. Clicking a
project's thumbnail strip or its **GALLERY** button opens a popup viewer
(prev/next, dot indicators, arrow-key and Escape support) cycling through
that array.

Out of the box, `images` points at generated placeholder frames under
`public/projects/<project-id>/*.svg` so the gallery has something to show
immediately. To use your own screenshots:

1. Drop image files anywhere under `public/` (e.g. `public/projects/my-project/1.png`).
2. Point the matching project's `images` array at those paths.
3. Leave `images: []` on a project to show a "no preview available" placeholder instead.

## Project structure

```text
src/
├── assets/
├── components/          # Reusable, presentational building blocks
│   ├── BackgroundFX.vue     # fixed grid + scanline + vignette layer
│   ├── ContactForm.vue      # validated, simulated-submit contact form
│   ├── Navbar.vue           # HUD-style nav with active-section indicator
│   ├── ProjectCard.vue      # "system module" project card
│   ├── ProjectModal.vue     # image gallery popup (prev/next, dots, Esc)
│   ├── SectionHeader.vue    # numbered section heading (01 / 05 style)
│   ├── SkillItem.vue        # animated skill meter bar
│   └── Terminal.vue         # reusable terminal window with typing effect
├── composables/
│   ├── useActiveSection.js  # IntersectionObserver-based active nav id
│   └── useTypewriter.js     # character-by-character line typing
├── directives/
│   └── vReveal.js           # v-reveal: reveal-on-scroll (reduced-motion aware)
├── data/                 # All editable content, separate from markup
│   ├── nav.js
│   ├── profile.js
│   ├── projects.js
│   └── skills.js
├── sections/             # One component per page section
│   ├── HomeSection.vue
│   ├── AboutSection.vue
│   ├── SkillsSection.vue
│   ├── ProjectsSection.vue
│   └── ContactSection.vue
├── App.vue
├── main.js
└── style.css             # design tokens, reset, shared utility classes
```

## Design notes

- Color system, fonts, spacing, and easing all live as CSS custom
  properties at the top of `src/style.css` — change the palette there.
- Typography: **Space Grotesk** for UI/body text, **JetBrains Mono** for
  every technical/system label, terminal line, and metadata field.
- Motion respects `prefers-reduced-motion: reduce` throughout (typewriter,
  scanline, reveal-on-scroll all short-circuit to their static end state).
- The contact form is frontend-only: it validates input, then plays a
  simulated `sending payload... / connection established / message
  transmitted` sequence. No network request is made — wire up your own
  backend or a service like Formspree in `ContactForm.vue`'s `onSubmit`
  if you want it to actually deliver messages.
