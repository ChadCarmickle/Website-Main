# Ivy Tech 32-inch kiosk — React Native wrapper

The supplied Website-Main archive is preserved under web/ except the obsolete Electron index.js (and any CNAME or workspace file). The wrapper loads web/index.html through Android WebView. Expo SDK 54 is the chosen baseline, not a claim that it is the latest. No APK or dependencies are included.

## Windows setup
Install Node.js 22 LTS, JDK 17, Android Studio and Android SDK (API 36 and build tools), configure ANDROID_HOME and PATH, and start an emulator matching the physical kiosk resolution and Android logical density.

From this folder:

```powershell
npm install
npx expo install --fix
npm run android
```

The Expo plugin copies web/ into android/app/src/main/assets/kiosk on prebuild. Run npm run android again after changing web assets. Expo Go cannot load these custom bundled assets. Test navigation, slideshow, images, fonts, video playback, localStorage and analytics export. The existing browser download mechanism may require a native export bridge; no such bridge is included. Status bar hiding is not managed kiosk mode or guaranteed immersive fullscreen. Remote updates are not implemented. No Android build was run when preparing this archive.

## APK
```powershell
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile kiosk
```

Configure EAS when prompted. The package com.ivytech.kiosk is a placeholder; to update an installed APK use its exact application ID, signing key, and an increased versionCode. The generated android/ directory is intentionally ignored so EAS regenerates assets from web/.

## GitHub
Work in a new branch of your existing repository, copy these files in, and review the diff before committing. If you move the original website into web/, adjust any existing static hosting configuration separately. Commit the npm lockfile generated during installation. Do not commit credentials or node_modules. The archive preserves all supplied website assets byte-for-byte; original website behavior has not been runtime-tested.
