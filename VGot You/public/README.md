# VGot You - Digital Excellence Laboratory

VGot You is a high-performance, design-centric agency website built to showcase expertise in Web Design, Brand Identity, and SEO. The application is engineered for speed, aesthetic precision, and technical authority, featuring a unique "Industrial Lab" aesthetic.

## 🚀 Performance Metrics
The application is optimized for **Core Web Vitals**, specifically targeting:
- **LCP (Largest Contentful Paint):** < 1.5s through critical CSS inlining and asset prioritization.
- **Lighthouse Score:** Aiming for > 90% across Performance, Accessibility, and SEO on mobile and desktop.
- **Zero Render-Blocking JS:** Critical layout logic is handled via internal styles to ensure instant first paint.

## 🛠 Tech Stack
- **Frontend:** React 18 with TypeScript.
- **Styling:** Tailwind CSS (Optimized loading strategy).
- **Animations:** Framer Motion (GPU-accelerated transforms).
- **Interactive Elements:** 
  - **COBE:** Lightweight WebGL globe for the hero section.
  - **Canvas:** Custom sparkles and industrial scanning effects.
- **AI Integration:** Powered by Google Gemini API for intelligent content and diagnostic nodes.
- **Routing:** React Router (HashRouter for seamless hosting compatibility).

## ✨ Key Features
- **Industrial Design System:** A high-contrast dark mode interface with monochromatic tones and red accent diagnostics.
- **Mobile First:** Fully responsive "thumb-friendly" navigation and touch-optimized carousels.
- **Command Center (Admin):** Local-storage based journal entry management for quick content updates.
- **SEO Grounded:** Automated schema markup, dynamic meta-tag updates, and semantic HTML5 structure.
- **Technical SPEC UI:** Metadata tags on project specimens (Category, ID, Euclidean specs) to emphasize engineering precision.

## 📁 Project Structure
- `components/`: Reusable UI modules (Bento grids, Globes, Carousels).
- `pages/`: Core views including Web Design Lab and Logo Specimen Archive.
- `lib/`: Data definitions and utility functions.
- `index.html`: Optimized entry point with critical CSS and preconnect hints.

## 🔧 Installation & Setup
1. Clone the repository.
2. Ensure environment variables are set (specifically `API_KEY` for Gemini services).
3. The app is designed to run in an ESM-compatible environment with an `importmap` for dependencies.

---
*Created by the VGot You Engineering Team.*