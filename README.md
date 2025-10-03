# React Native Web App

A bare React Native application that runs on **iOS**, **Android**, and **Web** using a single shared codebase. Built with TypeScript, React Navigation, and Webpack for web bundling.

## 🎯 Features

- ✅ **Cross-platform**: iOS, Android (Metro), and Web (Webpack + React Native Web)
- ✅ **Single codebase**: Shared `src/` directory across all platforms
- ✅ **TypeScript**: Strict mode enabled
- ✅ **Navigation**: React Navigation for all platforms with web URL support
- ✅ **Theming**: Light/Dark mode with persistent storage
- ✅ **State Management**: React Context API
- ✅ **Storage Abstraction**: AsyncStorage (native) / localStorage (web)
- ✅ **Testing**: Jest + Testing Library for native and web
- ✅ **CI/CD**: GitHub Actions workflow (lint, typecheck, test, build)
- ✅ **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

### For Native Development (iOS/Android)

- **Node.js** >= 18
- **React Native CLI**: `npm install -g react-native-cli`
- **iOS** (macOS only):
  - Xcode >= 14
  - CocoaPods: `sudo gem install cocoapods`
- **Android**:
  - Android Studio
  - Android SDK (API 31+)
  - Java Development Kit (JDK) 11+

### For Web Development

- **Node.js** >= 18
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quickstart

### 1. Install Dependencies

```bash
npm install
```

### 2. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 3. Run the App

#### iOS (macOS only)

```bash
npm run dev:native:ios
```

Or manually:
```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run iOS app
npm run ios
```

#### Android

```bash
npm run dev:native:android
```

Or manually:
```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run Android app
npm run android
```

#### Web

```bash
npm run dev:web
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production

#### Web Build

```bash
npm run build:web
```

Output will be in `dist/` directory. Serve with any static hosting:

```bash
npx serve dist
```

**Important**: Configure your server to serve `index.html` for all routes (SPA fallback).

## 📁 Project Structure

```
root/
├── android/               # Android native project
├── ios/                   # iOS native project
├── web/                   # Vite web-specific files
│   ├── index.html         # HTML entry point
│   ├── main.tsx           # Web app entry
│   └── favicon.svg        # Favicon
├── src/                   # Shared source code
│   ├── app/
│   │   ├── navigation/    # React Navigation setup
│   │   ├── screens/       # Screen components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── examples/
│   │   │       ├── List.tsx
│   │   │       └── Detail.tsx
│   │   ├── state/         # Global state (Context)
│   │   │   └── AppContext.tsx
│   │   ├── theme/         # Theme tokens
│   │   │   └── index.ts
│   │   ├── storage/       # Storage abstraction
│   │   │   └── index.ts
│   │   ├── mock/          # Mock data
│   │   │   ├── items.json
│   │   │   └── delay.ts
│   │   └── App.tsx        # Root app component
│   ├── components/
│   │   ├── UI/            # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBanner.tsx
│   │   │   └── EmptyState.tsx
│   │   └── layout/        # Layout components
│   │       ├── SafeArea.tsx
│   │       └── Container.tsx
│   └── lib/               # Utilities
│       ├── env.ts         # Environment config
│       └── platform.ts    # Platform helpers
├── assets/                # Static assets
│   └── placeholder/
├── tests/
│   ├── native/            # Native tests
│   └── web/               # Web tests
├── .github/workflows/     # CI/CD
└── index.js               # Native entry point
```

## 🧭 Navigation & URLs

The app uses React Navigation with web linking enabled:

| Screen | Native | Web URL |
|--------|--------|---------|
| Home | Home Stack | `/` |
| About | About Stack | `/about` |
| Settings | Settings Stack | `/settings` |
| Examples List | List Stack | `/examples/list` |
| Example Detail | Detail Stack | `/examples/detail/:id` |

### Example Usage

```typescript
// Navigate programmatically
navigation.navigate('Detail', {id: '123'});

// On web, this translates to: /examples/detail/123
```

## 🎨 Theming

### Using Theme in Components

```typescript
import {useApp} from '@/app/state/AppContext';

const MyComponent = () => {
  const {theme, colorScheme, toggleTheme} = useApp();

  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Text style={{color: theme.colors.text}}>Hello</Text>
    </View>
  );
};
```

### Available Theme Tokens

```typescript
theme.colors.primary
theme.colors.background
theme.colors.card
theme.colors.text
theme.colors.textSecondary
theme.colors.border
theme.colors.notification
theme.colors.success
theme.colors.warning
theme.colors.error

theme.spacing.xs  // 4
theme.spacing.sm  // 8
theme.spacing.md  // 16
theme.spacing.lg  // 24
theme.spacing.xl  // 32
theme.spacing.xxl // 48

theme.typography.sizes.xs   // 12
theme.typography.sizes.sm   // 14
theme.typography.sizes.md   // 16
theme.typography.sizes.lg   // 20
theme.typography.sizes.xl   // 24
theme.typography.sizes.xxl  // 32
```

### Adding New Theme Tokens

Edit `src/app/theme/index.ts`:

```typescript
export const colors = {
  light: {
    // Add new color
    accent: '#FF6B6B',
  },
  dark: {
    accent: '#FF8787',
  },
};
```

## 💾 Storage

The app provides a unified storage API that works across platforms:

```typescript
import {storage} from '@/app/storage';

// Save data
await storage.setItem('key', 'value');

// Retrieve data
const value = await storage.getItem('key');

// Remove data
await storage.removeItem('key');
```

- **Native**: Uses `@react-native-async-storage/async-storage`
- **Web**: Uses `localStorage`

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Native Tests Only

```bash
npm run test:native
```

### Run Web Tests Only

```bash
npm run test:web
```

### Writing Tests

**Native Test** (`tests/native/MyComponent.test.tsx`):

```typescript
import {render, screen} from '@testing-library/react-native';
import {AppProvider} from '@/app/state/AppContext';
import MyComponent from '@/app/screens/MyComponent';

test('renders correctly', () => {
  render(
    <AppProvider>
      <MyComponent />
    </AppProvider>
  );
  
  expect(screen.getByText('Hello')).toBeTruthy();
});
```

**Web Test** (`tests/web/MyComponent.test.tsx`):

```typescript
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AppProvider} from '@/app/state/AppContext';
import MyComponent from '@/app/screens/MyComponent';

test('renders correctly', () => {
  render(
    <AppProvider>
      <MyComponent />
    </AppProvider>
  );
  
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

## 🔧 Development

### Code Quality

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Format code
npm run format
```

### Pre-commit Hooks

Husky runs linting and type-checking automatically before commits.

## 📱 Adding a New Screen

### 1. Create Screen Component

Create `src/app/screens/MyNewScreen.tsx`:

```typescript
import React from 'react';
import {View, Text} from 'react-native';
import {SafeArea} from '@/components/layout/SafeArea';
import {Container} from '@/components/layout/Container';
import {useApp} from '@/app/state/AppContext';

const MyNewScreen = () => {
  const {theme} = useApp();
  
  return (
    <SafeArea>
      <Container>
        <Text style={{color: theme.colors.text}}>My New Screen</Text>
      </Container>
    </SafeArea>
  );
};

export default MyNewScreen;
```

### 2. Add to Navigation

Edit `src/app/navigation/index.tsx`:

```typescript
// 1. Import the screen
import MyNewScreen from '../screens/MyNewScreen';

// 2. Add to type definitions
export type RootStackParamList = {
  // ... existing screens
  MyNewScreen: undefined; // or {param: string} if it takes params
};

// 3. Add to linking config (for web URLs)
const linking = {
  config: {
    screens: {
      // ... existing screens
      MyNewScreen: '/my-new-screen',
    },
  },
};

// 4. Add to navigator
<Stack.Screen
  name="MyNewScreen"
  component={MyNewScreen}
  options={{title: 'My New Screen'}}
/>
```

### 3. Navigate to Screen

```typescript
navigation.navigate('MyNewScreen');
```

## 🔀 Platform-Specific Code

### Using `.native.ts` / `.web.ts` Extensions

Create platform-specific files:

```
MyComponent.tsx        # Shared code
MyComponent.native.tsx # Native-only implementation
MyComponent.web.tsx    # Web-only implementation
```

The bundler will automatically pick the correct file based on platform.

### Using Platform.OS

```typescript
import {Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'web' ? 20 : 16,
  },
});

// Or use the helper
import {selectPlatform} from '@/lib/platform';

const padding = selectPlatform({
  web: 20,
  native: 16,
  default: 16,
});
```

## 📦 Mock Data

### Modifying Mock Items

Edit `src/app/mock/items.json`:

```json
[
  {
    "id": "new-id",
    "title": "New Item",
    "subtitle": "Subtitle",
    "summary": "Summary text",
    "createdAt": "2025-03-10T12:00:00Z",
    "imageUrl": "placeholder-1"
  }
]
```

### Simulating Loading/Errors

The app uses `withRandomFailure` (10% failure rate) to simulate network issues:

```typescript
import {withRandomFailure} from '@/app/mock/delay';

try {
  await withRandomFailure(async () => {
    // Your data fetching logic
  });
} catch (error) {
  // Handle error
}
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit values:

```env
API_URL=https://api.example.com
FEATURE_FLAGS={"darkMode":true,"animations":true}
APP_ENV=development
```

Access in code:

```typescript
import env from '@/lib/env';

console.log(env.apiUrl);
console.log(env.featureFlags.darkMode);
```

## 🚨 Troubleshooting

### "Can't resolve react-native" on web

- Check `vite.config.ts` has the alias: `'react-native': 'react-native-web'`
- Clear cache: `rm -rf node_modules/.vite`

### Metro bundler issues

```bash
npm start -- --reset-cache
```

### iOS build fails

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android build fails

- Check Android SDK is installed (API 31+)
- Clean build: `cd android && ./gradlew clean && cd ..`

### Vector icons not showing

Native: Ensure fonts are linked. Re-run `pod install` (iOS) or rebuild Android.

Web: Icons should work via react-native-web polyfills.

### Web 404 in production

Configure your server for SPA routing (all routes → `index.html`).

**Example (nginx)**:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## ✅ Pull Request Checklist

Before submitting a PR:

- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run typecheck` (no errors)
- [ ] Run `npm test` (all tests pass)
- [ ] Test on iOS (if possible)
- [ ] Test on Android (if possible)
- [ ] Test on Web
- [ ] Add screenshots if UI changes
- [ ] Update README if adding features

## 🔮 Future Extension Points

### Adding Real API

Replace mock data in screens:

```typescript
// Before
import mockItems from '@/app/mock/items.json';

// After
const response = await fetch(`${env.apiUrl}/items`);
const items = await response.json();
```

### Adding Feature Flags

Edit `src/lib/env.ts` and use in components:

```typescript
if (env.featureFlags.newFeature) {
  // Render new feature
}
```

### Adding State Library (Redux, Zustand)

Replace Context in `src/app/state/` while maintaining the same exports.

### Expanding Theme

Add new tokens in `src/app/theme/index.ts` without breaking existing components.

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the PR checklist above.

---

**Note**: This app uses placeholder/mock data only. No real APIs, auth, or backend integration yet.
