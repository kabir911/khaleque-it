# Khaleque IT Consulting — website

A fast, modern, bilingual (English / German) single-page marketing site for a
freelance AI & IT consultant in Frankfurt am Main, built with **Vite + React +
Tailwind CSS** and ready for **GitHub Pages**.

## Features

- **Single-page** design with smooth-scroll sections: Hero, About, Services, Approach, Pricing, Testimonials, Contact.
- **Bilingual EN/DE** — the language is auto-detected from the browser and can be switched manually (the choice is remembered).
- **Separate legal pages** for the **Impressum** (§5 DDG) and **Privacy / GDPR** policy.
- **Testimonials read from a JSON file** (`public/data/testimonials.json`) — edit content without touching code or rebuilding.
- **Contact form** with **Google reCAPTCHA v2** and submission to a **Google Sheet** via Google Apps Script.
- Responsive, accessible, no tracking cookies.

## Quick start

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

> Note: this project was authored in an offline sandbox where the npm registry
> was unavailable, so `npm install` / `npm run build` must be run on your own
> machine. The source, configuration and translations are complete and have
> been validated (JSON parsing, EN/DE key parity, import resolution).

## Configuration — edit `src/config.js`

| Value | What to set |
| --- | --- |
| `GOOGLE_SHEETS_URL` | Your Google Apps Script web-app `/exec` URL (see below). Until set, the form validates and shows a "not connected yet" notice instead of sending. |
| `RECAPTCHA_SITE_KEY` | Your reCAPTCHA v2 **site** key. Ships with Google's official *test* key (always passes, shows a test banner) — replace before going live. |
| `CONTACT` | Public email, phone and city shown in the footer and contact section. |

### reCAPTCHA v2 setup
1. Go to https://www.google.com/recaptcha/admin and register a site (reCAPTCHA **v2 → "I'm not a robot" checkbox**).
2. Add your domains, e.g. `your-user.github.io` and `localhost`.
3. Put the **site key** in `src/config.js`, and the **secret key** in the Apps Script (optional, for server-side verification).

### Google Sheets backend
The form POSTs the fields to a Google Apps Script web app that appends a row to
a sheet. A ready-to-paste script is in **`google-apps-script.gs`** — follow the
setup steps in that file's header comment, then paste the resulting `/exec` URL
into `src/config.js`.

## Editing content

- **Text (both languages):** `src/i18n/en.json` and `src/i18n/de.json`. The two files must keep the same keys.
- **Services / Pricing / Approach steps:** the `services.items`, `pricing.tiers`, and `approach.steps` arrays inside those JSON files.
- **Testimonials:** `public/data/testimonials.json`. Each entry has bilingual `quote.en` / `quote.de`, a `rating`, and name/role/company.
- **Impressum & Privacy:** replace the `[BRACKETED]` placeholder fields in `src/pages/Impressum.jsx` (name, address, phone, email, VAT ID) before publishing. The privacy text already references GitHub Pages hosting, the Google Sheet, and reCAPTCHA.

## Deploying to GitHub Pages

The site uses a **relative base** (`base: './'` in `vite.config.js`) and
**HashRouter**, so it works under any repository name (`https://user.github.io/repo/`)
with no extra path configuration and no 404s on refresh.

Two common options:

**A. gh-pages branch (script included)**
```bash
npm run build
npm run deploy   # publishes dist/ to the gh-pages branch
```
Then in your repo: Settings ▸ Pages ▸ Source = `gh-pages` branch.

**B. GitHub Actions** — add a workflow that runs `npm ci && npm run build` and
deploys `dist/` with `actions/deploy-pages`.

If you later use a **custom domain** or a **user/organization page**
(`user.github.io` root), change `base` back to `'/'` in `vite.config.js`.

## Project structure

```
public/
  data/testimonials.json   # testimonials (read at runtime)
  favicon.svg
src/
  config.js                # ← your keys & contact details
  i18n/                    # en.json, de.json, LanguageContext.jsx
  components/              # Navbar, Hero, About, Services, Approach,
                           # Pricing, Testimonials, Contact, Footer, ...
  pages/                   # Home, Impressum, Privacy
  App.jsx  main.jsx  index.css
google-apps-script.gs      # backend for the contact form
```
