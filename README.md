<p align="center">
  <img src="public/assets/auremind.png" />
</p>

# AureMind — Your Mental Wellness Companion

> A frontend mental wellness web application built for a hackathon, designed to help users track their mental health, reflect through journaling, explore mindfulness, and connect with a supportive community.

🔗 **Live Demo:** [auremind.vercel.app](https://auremind.vercel.app/intro)

---

## 📌 About the Project

AureMind is a mental health–focused web app that provides a calm, accessible space for users to check in with themselves. Built as a hackathon project, it brings together several wellness tools into one clean interface — from mood tracking to a personal diary and a mindful community space.

---

## ✨ Features

| Section | Description |
|---|---|
| 🏠 **Home** | Dashboard overview and wellness summary |
| 💚 **Wellness** | Tools and resources to support mental well-being |
| 📓 **Diary** | Private journal to log thoughts, moods, and daily reflections |
| 🌌 **Mindscape** | Mindfulness and relaxation space for mental clarity |
| 🤝 **Community** | Connect with others on similar wellness journeys |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **React:** React 19
- **Linting:** ESLint + Prettier
- **Deployment:** [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AravDakshZen/auremind.git
cd auremind

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy .env and fill in any required values
cp .env .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser.

---

## 📁 Project Structure

```
auremind/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Entry page
│   │   ├── home-dashboard/  # Home section
│   │   ├── wellness/        # Wellness tools
│   │   ├── diary/           # Personal diary
│   │   ├── mindscape/       # Mindfulness space
│   │   └── community/       # Community section
│   ├── components/          # Reusable UI components
│   └── styles/              # Global styles
├── .env                     # Environment variables
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Built By [AravDakshZen](https://github.com/AravDakshZen)
- Powered by Next.js and React
- Styled with Tailwind CSS

## 📄 License

This project is open source. Feel free to fork, learn from, and build on it.

---

> Built with ❤️ for mental health awareness.
