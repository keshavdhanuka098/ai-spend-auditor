# AI Spend Auditor

A premium SaaS landing page and interactive audit engine to optimize your organization's AI tool spending.

## 🚀 Overview
AI Spend Auditor helps modern teams regain control over their skyrocketing AI subscription costs. By analyzing current tool usage against market benchmarks, it identifies redundant seats, shadow IT, and negotiation opportunities.

## 🌟 Features
- **Precision Audit Engine**: Calculates real overspend based on tool benchmarks (ChatGPT, Claude, Cursor, etc.) and specific team use cases.
- **Interactive Dashboard**: Real-time visualizations using **Recharts** comparing current vs. optimized spend.
- **AI-Driven Insights**: Contextual suggestions for consolidation and efficiency.
- **Persistent History**: Saves recent audits to `localStorage` for session-to-session tracking.
- **Export Ready**: One-click summary copying and print-friendly report views.
- **Premium Design**: Modern dark theme with glassmorphism, gradient accents, and **Framer Motion** animations.

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/user/ai-spend-auditor

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📈 Future Improvements
- **Live Integrations**: Connect directly to Stripe/Bank APIs to auto-import spend data.
- **User Authentication**: Firebase/Supabase integration for account-wide history.
- **Automated Negotiation**: One-click outreach to vendors for enterprise pricing.
- **Browser Extension**: Detect new tool signups in real-time.

## 🔗 Live Demo
[View App](https://ais-dev-bzipyxwwpm7uyb2k6gjmsi-843412861446.asia-southeast1.run.app)

---
*Created for the Credex Assignment.*

## 📋 Submission Checklist
- [x] Functional Audit Engine
- [x] Interactive Recharts Dashboard
- [x] LocalStorage Persistence
- [x] Responsive Design (Mobile/Tablet/Desktop)
- [x] Business Economics & GTM Strategy
- [x] User Research Insights
- [x] Premium Polish & Animations

## 🏗️ Architecture
The app follows a modular React architecture:
- `auditEngine.ts`: Pure functional logic for spend calculations and benchmarking.
- `App.tsx`: Main component housing the layout and interaction state.
- `utils.ts`: Tailwind CSS class merging helper.
- `index.css`: Custom theme variables and global styles.
