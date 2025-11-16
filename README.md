# 音 Oto

**Oto** (音, meaning "sound" in Japanese) is a React Native mobile application built with Expo that allows users to explore, discover, and listen to anime opening and ending themes. Browse popular and trending anime, search for your favorites, and create custom playlists of anime themes.

## ✨ Features

- 🎌 **Anime Discovery**: Browse popular and trending anime from AniList
- 🔍 **Search**: Search for anime by title
- 🎵 **Theme Playback**: Listen to anime opening and ending themes
- 📝 **Custom Playlists**: Create and manage your own playlists of favorite themes
- 🎨 **Beautiful UI**: Modern, dark-themed interface with smooth animations
- 📱 **Cross-Platform**: Runs on Android, iOS, and web

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) with React Native
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **APIs**: 
  - [AniList GraphQL API](https://anilist.co) - Anime metadata and discovery
  - [AnimeThemes GraphQL API](https://animethemes.moe) - Anime theme songs and videos
- **UI Components**: Custom components with React Native Reanimated and Gesture Handler
- **Storage**: AsyncStorage for local data persistence

## 📋 Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- For Android development: Android Studio
- For iOS development: Xcode (macOS only)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/LouisBassagal/oto.git
   cd oto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` to open Android emulator
   - Press `i` to open iOS simulator
   - Press `w` to open in web browser

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Build and run on Android
- `npm run ios` - Build and run on iOS
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
oto/
├── app/                      # App screens (file-based routing)
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── home.tsx         # Home screen with popular/trending anime
│   │   ├── search.tsx       # Search screen
│   │   └── lists.tsx        # Playlists screen
│   ├── anime/[id].tsx       # Anime details screen
│   ├── player.tsx           # Theme player screen
│   └── index.tsx            # Welcome screen
├── components/              # Reusable React components
├── services/                # API service classes
│   ├── anilist.ts          # AniList API integration
│   └── animethemes.ts      # AnimeThemes API integration
├── store/                   # Zustand state management
│   ├── animeStore.ts       # Anime data store
│   └── playlistStore.ts    # Playlist management store
├── types/                   # TypeScript type definitions
└── assets/                  # Images and static assets
```

## 🎯 Key Features Implementation

### Anime Discovery
- Fetches popular and trending anime from AniList API
- Displays anime with cover images, titles, and descriptions
- Horizontal scrollable lists for easy browsing

### Theme Playback
- Integrates with AnimeThemes API to fetch anime opening/ending themes
- Video player for theme playback
- Displays theme information (song title, type, anime)

### Playlist Management
- Create custom playlists
- Add/remove themes to/from playlists
- Persistent storage using AsyncStorage
- Unique playlist IDs using UUID

## 🙏 Acknowledgments

- [AniList](https://anilist.co) - Anime data and metadata
- [AnimeThemes](https://animethemes.moe) - Anime theme songs and videos
- [Expo](https://expo.dev) - Amazing React Native framework

## 📧 Contact

Louis Bassagal - [GitHub](https://github.com/LouisBassagal)

---

Made with ❤️ for anime fans
