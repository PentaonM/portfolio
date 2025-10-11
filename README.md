### Fentahun Modawo — Full‑Stack Developer & Creative Designer

Hello there, I'm Fentahun!

A passionate full‑stack web developer and creative designer based in Jerusalem. I build modern, high‑performance, and user‑focused web applications. Explore my portfolio to see projects that blend front‑end creativity with back‑end precision. Don’t hesitate to reach out — we were destined to create great things together!

- **Live site**: `https://fentahunmodawo.com`
- **Tech focus**: TypeScript, Next.js, Tailwind, UI/UX systems, data viz, 3D/web‑gl, internationalization, email/workflows

---

### Overview

This repository contains my personal portfolio built with Next.js 14 and TypeScript. It showcases selected projects, experience, and a contact workflow with internationalization and a polished, performant UI.

### Features

- **Next.js 14 (App Router)** with server components and route handlers
- **TypeScript** across the codebase
- **Internationalization** via `next-intl` with `en` and `he` locales
- **Design system / UI** built on `tailwindcss`, Radix primitives, and `shadcn/ui`
- **Motion & 3D** using `framer-motion`, `three`, and `three-globe`
- **Forms & Validation** with `react-hook-form` and `zod`
- **Email delivery** via Nodemailer + Handlebars templates
- **Observability** with Sentry (client, server, and edge configs present)
- **SEO**: sitemap, robots, manifest, metadata

### Getting Started

1. Install dependencies

```bash
npm install
```

2. Set up environment
   Create a `.env.local` at the project root and configure:

```bash
# Public site URL used in emails and assets
NEXT_PUBLIC_SITE_URL=https://fentahunmodawo.com

# SMTP credentials (required for contact workflow)
MAIN_SMTP_EMAIL=your-admin@example.com
MAIN_SMTP_PASSWORD=your-admin-password
SECONDARY_SMTP_EMAIL=your-secondary@example.com
SECONDARY_SMTP_PASSWORD=your-secondary-password

# Optional: Sentry
SENTRY_AUTH_TOKEN=...
SENTRY_DSN=...
```

3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

4. Production build

```bash
npm run build
npm start
```

### Project Structure (high level)

- `app/` — App Router, layouts, pages, route handlers, error boundaries
- `app/[locale]/` — localized routes and UI wiring with `next-intl`
- `components/` — UI kit, sections (hero, projects, contact, etc.)
- `data/` — structured project data and assets metadata
- `lib/` — utilities (mail, templates, helpers)
- `dictionaries/` — translation JSON files
- `zodSchemas/` — schema validation for forms

### Commands

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — lint the codebase

### Tech Stack

- Next.js 14, React 18, TypeScript, App Router
- Tailwind CSS, Radix UI, `shadcn/ui`
- Framer Motion, Three.js, three‑globe, Recharts
- next‑intl, Zod, React Hook Form
- Nodemailer, Handlebars templates
- Sentry (client/server/edge)

### Deployment

Optimized for platforms that support Next.js (e.g., Vercel). Ensure environment variables are set in your deployment environment.

### Call to Action

If you’re building something ambitious and want it delivered with polish and precision, let’s talk. **Start a project**: `https://fentahunmodawo.com#contact` — I’ll get back to you quickly.

---

Built with care and an eye for detail. Thanks for stopping by.
