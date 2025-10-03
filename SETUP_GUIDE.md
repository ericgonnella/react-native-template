# Setup Guide

This guide will help you get the React Native Web App running on all platforms.

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages for native and web development.

### 2. iOS Setup (macOS only)

#### Install CocoaPods dependencies

```bash
cd ios
pod install
cd ..
```

**Note**: If you encounter issues:

```bash
cd ios
pod deintegrate
pod install
cd ..
```

#### Common iOS Issues

- **Xcode version**: Ensure Xcode 14+ is installed
- **Command Line Tools**: Set in Xcode > Preferences > Locations
- **Simulator**: Open Xcode and install iOS Simulator if needed

### 3. Android Setup

#### Prerequisites

1. Install Android Studio
2. Install Android SDK (API 31 or higher)
3. Set up environment variables:

```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# or
export ANDROID_HOME=$HOME/Android/Sdk  # Linux
# or on Windows, set via System Properties

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

4. Create an Android Virtual Device (AVD) in Android Studio

#### Common Android Issues

- **Gradle build fails**: Run `cd android && ./gradlew clean && cd ..`
- **SDK not found**: Ensure `ANDROID_HOME` is set correctly
- **Emulator won't start**: Check virtualization is enabled in BIOS

### 4. Running the App

#### Web (Easiest to test first)

```bash
npm run dev:web
```

Open `http://localhost:5173` in your browser.

**Test checklist**:
- [ ] Home screen loads
- [ ] Navigate to About
- [ ] Navigate to Examples List
- [ ] Click an item to view Detail (URL should be `/examples/detail/1`)
- [ ] Toggle theme in Settings
- [ ] Refresh page (theme should persist)

#### iOS

**Option 1: Single command**
```bash
npm run dev:native:ios
```

**Option 2: Manual (recommended for debugging)**
```bash
# Terminal 1
npm start

# Terminal 2
npm run ios
```

Or open `ios/ReactNativeWebApp.xcworkspace` in Xcode and press Run.

#### Android

**Option 1: Single command**
```bash
npm run dev:native:android
```

**Option 2: Manual (recommended for debugging)**
```bash
# Terminal 1
npm start

# Terminal 2
npm run android
```

Or open the `android` folder in Android Studio and press Run.

### 5. Verify Installation

Run the test suite:

```bash
# All tests
npm test

# Native tests only
npm run test:native

# Web tests only
npm run test:web
```

Run linting and type checking:

```bash
npm run lint
npm run typecheck
```

### 6. Git Setup

Initialize git repository (if not already done):

```bash
git init
git add .
git commit -m "Initial commit"
```

Set up Husky for pre-commit hooks:

```bash
npm run prepare
chmod +x .husky/pre-commit
```

## Platform-Specific Notes

### iOS

- **First build is slow**: CocoaPods needs to download and compile dependencies
- **Simulator vs Device**: For device builds, you'll need an Apple Developer account
- **M1/M2 Macs**: You may need to run Terminal/Xcode in Rosetta mode for some libraries

### Android

- **Emulator RAM**: Allocate at least 2GB RAM to AVD
- **USB Debugging**: For physical devices, enable Developer Options and USB Debugging
- **First build**: Can take 5-10 minutes as Gradle downloads dependencies

### Web

- **Hot Reload**: Vite provides instant hot module replacement
- **Browser DevTools**: Use React DevTools extension for debugging
- **Production Build**: Test with `npm run build:web && npx serve dist`

## Troubleshooting

### Metro Bundler Issues

Reset cache and restart:
```bash
npm start -- --reset-cache
```

### Node Modules Issues

Clear and reinstall:
```bash
rm -rf node_modules
npm install
```

### iOS Build Fails

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Gradle Issues

```bash
cd android
./gradlew clean
cd ..
```

### Web Build Issues

Clear Vite cache:
```bash
rm -rf node_modules/.vite
npm run dev:web
```

## Next Steps

1. Read the main [README.md](./README.md) for full documentation
2. Explore the code structure in `src/`
3. Try adding a new screen following the guide in README
4. Customize the theme in `src/app/theme/index.ts`

## Getting Help

- Check the [README.md](./README.md) for detailed documentation
- Review [React Native docs](https://reactnative.dev/)
- Check [React Navigation docs](https://reactnavigation.org/)
- Review [Vite docs](https://vitejs.dev/) for web-specific issues

## Success Criteria

You've successfully set up the project when:

✅ Web app runs on `localhost:5173`  
✅ iOS app runs in simulator (macOS only)  
✅ Android app runs in emulator  
✅ All tests pass (`npm test`)  
✅ Linting passes (`npm run lint`)  
✅ Type checking passes (`npm run typecheck`)  
✅ Theme toggle works and persists  
✅ Navigation works on all platforms  
✅ Detail screen shows item from List when clicked
