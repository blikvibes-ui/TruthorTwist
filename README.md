# 🎮 TruthOrTwist - Full-Stack Real-Time Truth or Dare Platform

> Spill the Tea or Take the Twist — Live with Friends

A vibrant, highly engaging, real-time online Truth or Dare platform built with Next.js 14, Firebase, and Framer Motion.

## ✨ Features (MVP)

- 🔐 **Authentication** - Email/Google sign-in + guest mode
- 🎮 **Real-time Multiplayer** - Play with up to 8 friends
- 🎯 **Animated Spinner** - Beautiful bottle spinner with physics
- 💬 **Live Chat** - In-game messaging
- 🏆 **Leaderboard** - Twist Points system
- 📱 **Mobile First** - Fully responsive design
- ✨ **Premium UX** - Glassmorphism, animations, smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blikvibes-ui/TruthorTwist.git
   cd TruthorTwist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [firebase.google.com](https://firebase.google.com)
   - Create a new project
   - Create a Firestore database
   - Enable Google OAuth
   - Copy your Firebase credentials

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update `.env.local` with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
TruthorTwist/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── auth/              # Authentication pages
│   ├── rooms/             # Room management
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Button.tsx
│   ├── Spinner.tsx
│   └── ...
├── services/              # Firebase & API services
│   └── firebase.ts
├── data/                  # Static data
│   └── questions.json
├── public/                # Static assets
├── .env.local            # Environment variables (git ignored)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Design System

- **Colors:**
  - Dark: `#0a0e27`
  - Truth: `#6366f1` (Purple)
  - Dare: `#ec4899` (Pink)
  - Accent: `#06b6d4` (Cyan)
  - Neon: `#d946ef` (Magenta)

- **Typography:** System default fonts
- **Effects:** Glassmorphism, Framer Motion animations
- **Responsive:** Mobile-first design

## 🔗 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Firebase (Firestore + Realtime DB)
- **Authentication:** Firebase Auth
- **Audio:** Howler.js
- **State Management:** Zustand
- **Notifications:** React Hot Toast

## 📈 Development Roadmap

### Phase 1 (MVP) ✅
- [x] Basic authentication
- [x] Room creation/joining
- [x] Spinner mechanics
- [x] Questions database
- [x] Simple leaderboard

### Phase 2 (Enhanced)
- [ ] Power-ups system
- [ ] Custom questions
- [ ] Proof Mode (camera integration)
- [ ] Friends system
- [ ] Room themes
- [ ] Sound effects

### Phase 3 (Premium)
- [ ] AI Dare Generator
- [ ] Voice chat (WebRTC)
- [ ] Achievements & streaks
- [ ] Global leaderboards
- [ ] Multi-language support
- [ ] PWA support

## 🐛 Troubleshooting

### Firebase not connecting
- Verify `.env.local` has correct credentials
- Check Firebase project settings
- Enable Firestore in Firebase console

### Animations feel laggy
- Check DevTools Performance tab
- Disable non-essential animations during development
- Test on actual device for true performance

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## 📝 License

MIT License - feel free to use this project for anything!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and PRs.

## 📞 Support

For issues or questions, open a GitHub issue.

---

**Made with ❤️ by Blikvibes**
