<div align="center">

# ⚡ Shaurya Upadhyay - Personal Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-ershaurya.dev-6366F1?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.ershaurya.dev/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase_12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

<p align="center">
  A modern, high-performance personal portfolio and blog built for <b>Shaurya Upadhyay</b> — Software Developer & Java/Backend Engineer.
  <br />
  <a href="https://www.ershaurya.dev/"><strong>Explore the Live Portfolio »</strong></a>
</p>

---

</div>

## 🌟 Overview

This repository powers [ershaurya.dev](https://www.ershaurya.dev/), a modern single-page application and technical blog. Designed with fluid animations, micro-interactions, dark/light theme toggle, glassmorphism, and a responsive Bento Grid layout.

Key highlights include dynamic data prefetching via Firebase Firestore, smooth inertia scrolling powered by Lenis, interactive Github contribution graphs, and real-time coding statistics.

---

## ✨ Key Features

- 🎨 **Adaptive Theme Engine:** Dynamic dark and light mode toggle with seamless smooth transitions and system preference auto-detection.
- 📣 **Domain Migration Alert Banner:** Real-time dual-theme banner highlighting official domain migration to `www.ershaurya.dev`.
- 🍱 **Interactive Bento Grid:** Sleek modern landing layout highlighting technical profiles (LeetCode, GitHub, LinkedIn) and quick resume downloads.
- 🚀 **Smooth Lenis Scroll:** Ultra-smooth inertia scroll experience synchronized across route changes and navigation.
- ⚡ **Firebase Firestore Integration:** Async prefetching of dynamic portfolio projects, achievements, and blog posts with graceful safety fallbacks.
- 🛠️ **Developer Statistics Dashboard:** Live GitHub contribution graph & interactive coding analytics visualization.
- 📱 **Mobile-First Responsive Layout:** Two-column sticky sidebar layout on desktop with adaptive glassmorphic navigation for mobile screens.

---

## 🛠️ Tech Stack & Ecosystem

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) | Component-based UI architecture |
| **Build Tooling** | [Vite 6](https://vitejs.dev/) | Next-generation fast HMR dev server & bundler |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling with typography plugin |
| **Animations** | [Framer Motion](https://framer.com/motion) | Smooth page route transitions & micro-interactions |
| **Scroll Engine** | [Lenis](https://lenis.darkroom.engineering/) | Smooth momentum scrolling |
| **Backend & Database**| [Firebase Firestore](https://firebase.google.com/) | Dynamic content database for projects & achievements |
| **Icons** | [Lucide React](https://lucide.dev/) & [Remix Icon](https://remixicon.com/) | Modern vector SVG iconography |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge hosting with analytics integration |

---

## 📂 Project Architecture

```
Portfolio-pro/
├── public/                  # Public assets, sitemap.xml, robots.txt
├── src/
│   ├── assets/              # Visual assets, branding logos, icons
│   ├── components/          # Modular React components
│   │   ├── Achievements.jsx # Hackathons and honors section
│   │   ├── BentoCard.jsx    # Glassmorphic grid card container
│   │   ├── CodingProfile.jsx# Competitive programming statistics
│   │   ├── Contact.jsx      # Contact form with EmailJS integration
│   │   ├── DomainBanner.jsx # Theme-adaptive domain migration notification bar
│   │   ├── Experience.jsx   # Interactive career timeline
│   │   ├── GithubGraph.jsx  # Live GitHub activity graph component
│   │   ├── Loading.jsx      # Animated full-screen preloader
│   │   ├── Navbar.jsx       # Floating navigation bar with theme toggle
│   │   ├── Profile.jsx      # Sticky profile sidebar with socials & bio
│   │   ├── Projects.jsx     # Dynamic project cards with tech tags
│   │   └── Skills.jsx       # Categorized technical skills matrix
│   ├── pages/               # Route views (Home, Blogs, BlogDetail, NotFound)
│   ├── firebase.config.js   # Firebase SDK setup and initialized services
│   ├── index.css            # Custom design tokens and global styles
│   ├── App.jsx              # Main routing and animated application layout
│   └── main.jsx             # React entry point
├── tailwind.config.js       # Custom Tailwind CSS configuration
└── vite.config.js           # Vite build pipeline configuration
```

---

## 🚀 Getting Started

Follow these instructions to run the portfolio locally on your machine.

### Prerequisites

- **Node.js** >= `18.x.x`
- **npm** or **yarn** / **pnpm**

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shaurya01836/shaurya-portfolio.git
   cd shaurya-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root directory and supply your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📬 Connect with Me

- 🌐 **Website:** [www.ershaurya.dev](https://www.ershaurya.dev/)
- 💼 **LinkedIn:** [shaurya-upadhyay](https://www.linkedin.com/in/this-is-shaurya-upadhyay/)
- 🐙 **GitHub:** [@Shaurya01836](https://github.com/Shaurya01836)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by Shaurya Upadhyay</sub>
</div>
