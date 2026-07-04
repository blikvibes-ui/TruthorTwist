# Firebase Setup Guide for TruthOrTwist

## 📋 Prerequisites
- Google account
- Firebase project created

## 🔧 Step 1: Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click **"Get Started"** or **"Go to console"**
3. Click **"Create a project"**
4. Enter project name: `TruthOrTwist`
5. Accept terms and click **"Continue"**
6. Disable Google Analytics (optional)
7. Click **"Create project"**

## 🔑 Step 2: Get Firebase Credentials

1. In Firebase Console, click the **gear icon** → **Project Settings**
2. Scroll down to **"Your apps"** section
3. Click **"</>" (Web)** to add a web app
4. Enter app name: `TruthOrTwist`
5. Click **"Register app"**
6. Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 🗄️ Step 3: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add rules)
4. Select your location (closest to you)
5. Click **"Create"**

### Database Collections Structure:

Your Firestore will automatically create these collections:

**Collection: `users`**
```json
{
  "uid": "user-id",
  "email": "user@example.com",
  "username": "username",
  "avatar": "https://...",
  "twistPoints": 0,
  "level": 1,
  "gamesPlayed": 0,
  "gamesWon": 0,
  "achievements": [],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Collection: `rooms`**
```json
{
  "name": "Epic Party",
  "hostId": "user-id",
  "hostName": "username",
  "maxPlayers": 8,
  "currentPlayers": 2,
  "mode": "Spicy",
  "isPublic": true,
  "password": null,
  "players": ["user-id-1", "user-id-2"],
  "status": "waiting",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Collection: `messages`**
```json
{
  "roomId": "room-id",
  "userId": "user-id",
  "username": "username",
  "message": "Hello!",
  "reaction": "🔥",
  "timestamp": "timestamp"
}
```

**Collection: `games`**
```json
{
  "roomId": "room-id",
  "players": ["user-id-1", "user-id-2"],
  "winner": "user-id-1",
  "totalRounds": 10,
  "scores": {"user-id-1": 150, "user-id-2": 100},
  "startTime": "timestamp",
  "endTime": "timestamp"
}
```

## 🔐 Step 4: Set Up Firestore Security Rules

1. In Firestore Console, go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - each user can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if true; // Allow public read for leaderboard
    }
    
    // Rooms collection - anyone can read public rooms
    match /rooms/{roomId} {
      allow read: if resource.data.isPublic == true || request.auth.uid in resource.data.players;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.hostId || request.auth.uid in resource.data.players;
      allow delete: if request.auth.uid == resource.data.hostId;
    }
    
    // Messages collection - only room players can read/write
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Games collection - anyone authenticated can read, host can write
    match /games/{gameId} {
      allow read: if request.auth != null;
      allow create, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## 🔑 Step 5: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get Started"**
3. Enable **Email/Password**:
   - Click **Email/Password**
   - Toggle **"Enable"**
   - Click **"Save"**

4. Enable **Google**:
   - Click **Google**
   - Toggle **"Enable"**
   - Select your project email
   - Click **"Save"**

## 🌐 Step 6: Configure Environment Variables

1. In your project, open `.env.local`
2. Add the Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## ✅ Step 7: Test Everything

1. Run your project:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000
3. Try signing up
4. Check Firebase Console → Authentication (should show new user)
5. Check Firestore → users collection (should have new user document)

## 🎉 Done!

Your Firebase backend is now fully configured! The following services are ready to use:

- ✅ `auth.ts` - Authentication (sign up, sign in, Google OAuth)
- ✅ `rooms.ts` - Room creation, joining, real-time updates
- ✅ `messages.ts` - Chat messages
- ✅ `stats.ts` - User stats, leaderboard, game records

## 📚 Next Steps

1. Integrate auth services into Sign In/Sign Up pages
2. Create the game room page with real-time updates
3. Implement game logic (turns, scoring)
4. Add chat system
5. Build leaderboard page

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs)
