# Reflection

## 📚 What I Learned
Building the "AI Spend Auditor" highlighted the complexity of SaaS pricing structures. I learned how to modularize logic into a standalone "engine" (`auditEngine.ts`) to keep the UI clean while handling complex math involving multipliers and department-specific benchmarks.

## 🤖 AI Acceleration
Using Gemini models significantly accelerated:
- **UI Design**: Translating high-level aesthetic concepts (glassmorphism, geometric balance) into Tailwind utility classes in seconds.
- **Boilerplate**: Generating types and consistent mock data for testimonials and charts.
- **Logic Debugging**: Quickly identifying edge cases in the spend calculation logic.

## 🚧 Challenges
- **Chart Responsiveness**: Making Recharts look good on mobile required careful wrapper management and `ResponsiveContainer` tuning.
- **State Complexity**: Managing a dynamic list of subscriptions alongside audit results and history needed a robust React state structure to prevent unnecessary re-renders.

## ⚖️ Trade-offs
- **Persistence**: Used `localStorage` instead of a full database for the MVP. This provides immediate value for demo purposes but doesn't allow for multi-device sync.
- **Benchmarks**: Benchmarks are currently static. In a production environment, these would be fetched via a real-time scraping API or a verified price database.

## 🚀 Future Vision
If given more time, I would build a "Shadow AI Detector" browser extension that works alongside the dashboard to catch subscriptions before they even hit the finance team's desk.
