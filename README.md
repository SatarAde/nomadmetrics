# 📍 NomadMetrics

A travel analytics dashboard for tracking trips, spending, and global adventures — built with **React**, **TypeScript**, and **Recharts**.

![NomadMetrics Preview](./public/preview.png)

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Charts | Recharts |
| Build Tool | Vite |
| Styling | CSS Modules |

## ✨ Features

- 📊 **Interactive bar charts** — Monthly travel spend visualised with Recharts
- 🗺️ **Trip tracker** — Filter, sort, and search across all your trips
- 📈 **Analytics dashboard** — Spending breakdown by category, travel timeline
- 🔍 **Custom React hooks** — `useTrips` handles filtering, sorting, and search logic
- 🧠 **Full TypeScript** — Strict types across all components, hooks, and data models

## 📁 Project Structure

```
nomadmetrics/
├── src/
│   ├── components/
│   │   ├── StatCard.tsx       # Reusable metric card
│   │   ├── TripCard.tsx       # Trip display card
│   │   └── SpendChart.tsx     # Recharts bar chart
│   ├── hooks/
│   │   └── useTrips.ts        # Custom hook: filter + sort + search
│   ├── types/
│   │   └── index.ts           # All TypeScript interfaces
│   ├── data/
│   │   └── travelData.ts      # Mock travel data
│   └── App.tsx                # Root component + page routing
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/SatarAde/nomadmetrics.git
cd nomadmetrics

# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build
```

## 📸 Pages

- **Dashboard** — Stats overview, spend chart, top destinations
- **My Trips** — Filterable, searchable trip cards
- **Analytics** — Spending breakdown, timeline, detailed metrics

## 🌐 Deployment

This project is configured for deployment to **AWS S3** (static hosting) or **Vercel**.

```bash
npm run build
# Deploy the /dist folder to S3 or Vercel
```

---

Built by [SatarAde](https://github.com/SatarAde)
