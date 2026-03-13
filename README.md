# Gies Sustainability Dashboard

A data-driven web application showcasing Gies Business School's sustainability research aligned with the UN Sustainable Development Goals (SDGs).

## Features

- **Home** – Hero section, key stats, featured research impact carousel, SDG bar chart
- **Research Areas** – D3 force-directed network visualization of interdisciplinary research connections, top SDG champions, filterable SDG grid
- **Faculty** – Searchable faculty directory with department and SDG filters
- **Leadership** – Strategic investment priorities, collaboration opportunities, key messaging
- **Data Quality** – Data sources, methodology, user feedback system
- **Journey Pages** – Student, Partner, and Industry pathways with tailored content

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** – Build tool
- **Tailwind CSS** – Styling
- **React Router** – Client-side routing
- **D3.js** – Network visualization on Research Areas page

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (or next available port).

### Build

```bash
npm run build
```

Output in `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Deployment (Netlify)

The project includes a `netlify.toml` for Netlify deployment:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirects:** All routes redirect to `index.html`

Deploy via:

1. **Netlify CLI:** `npx netlify-cli deploy --prod --dir=dist`
2. **Netlify Drop:** Drag the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
3. **Git:** Connect the repo and use the default Netlify build settings

## Project Structure

```
├── src/
│   ├── components/     # Header, etc.
│   ├── pages/          # Route pages
│   ├── api/            # Data fetching (scheduler provider)
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── public/
│   ├── asset/          # Images (investment matrix, collaboration network, etc.)
│   └── data/           # faculty.json
├── index.html
├── netlify.toml
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/research-areas` | Research Areas (D3 network + SDG grid) |
| `/faculty` | Faculty directory |
| `/about` | About |
| `/contact` | Contact |
| `/leadership` | Leadership insights |
| `/data-quality` | Data quality & methodology |
| `/student-journey` | Student journey |
| `/partner-journey` | Partner journey |
| `/industry-journey` | Industry journey |

## Data

- Faculty data is loaded from `public/data/faculty.json`
- Publication data is sourced from Illinois Experts Database
- SDG classifications use dual validation (keyword + AI semantic analysis)

## License

Proprietary – Gies Business School.
