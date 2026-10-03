# SpriteSwap global trading chat setup

The trading page is already wired for Firebase Realtime Database.

## 1. Create a Firebase web app
Create a Firebase project and register a Web app. Firebase gives you a web configuration object.

## 2. Turn on Anonymous Authentication
In Firebase Authentication, enable the Anonymous provider.

## 3. Create Realtime Database
Create a Realtime Database.

## 4. Apply the included rules
Use the contents of `firebase-rules.json` as the Realtime Database rules.

## 5. Paste the web config
Open `firebase-config.js` and replace the empty values with the Web app config from Firebase.

Do not put a service-account/private key in this file.

Once the config is filled in, `trades.html` loads Firebase, signs each visitor in anonymously, stores trade messages in `spriteswap/trading/messages`, and tracks connected visitors under `spriteswap/trading/presence`.

The site still works locally if the config is empty.
