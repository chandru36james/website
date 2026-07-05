# VFMS Deployment & Setup Guide

This guide describes how to configure, run, and deploy the **VGot You Finance Management System (VFMS)** for your clients.

---

## 📋 Prerequisites
- **Node.js** (v18.0.0 or higher)
- **NPM** (v9.0.0 or higher)
- A modern web browser (Chrome, Edge, Safari, Firefox)

---

## 🛠️ Initial Installation
Extract the codebase and install package dependencies:
```bash
npm install
```

---

## ⚙️ Core Configuration Modes

The platform supports three deployment strategies: **Fully Online (Cloud)**, **Fully Offline (Local Sandbox)**, or **Local Network (On-premises Server)**.

### 🌐 Mode 1: Fully Online Cloud (Firebase)
*Best for clients who want multi-branch access from different locations using Google's secure cloud database.*

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project, enable **Authentication (Email/Password)**, and **Cloud Firestore Database**.
3. Create a Web App in settings, copy the credentials, and paste them into the project's config file:
   [`firebase-applet-config.json`](file:///c:/Users/DELL/Downloads/erp/finance/firebase-applet-config.json)
   ```json
   {
     "projectId": "your-project-id",
     "appId": "your-app-id",
     "apiKey": "your-api-key",
     "authDomain": "your-project.firebaseapp.com",
     "firestoreDatabaseId": "(default)",
     "storageBucket": "your-project.firebasestorage.app",
     "messagingSenderId": "your-sender-id",
     "useEmulator": false
   }
   ```
4. Build and upload the compiled public assets:
   ```bash
   npm run build
   ```
   *Deploy the generated `/dist` folder to Firebase Hosting, Vercel, Netlify, or your private cloud server.*

---

### 💻 Mode 2: Fully Offline Local Sandbox
*Best for a single device, training purposes, or offline demonstrations.*

1. No cloud or database setup is needed.
2. Open [`firebase-applet-config.json`](file:///c:/Users/DELL/Downloads/erp/finance/firebase-applet-config.json) and ensure `"useEmulator"` is set to `false`.
3. Open the application. On the left sidebar footer, ensure the active toggle is set to **Sandbox Mode**.
4. All customer folders, loans, double-entry entries, daily cashbook tallies, and files are stored client-side in the browser's persistent `localStorage`.

---

### 🏢 Mode 3: Local Network On-premises Server (LAN Emulator)
*Best if your client wants a fully offline, local database running on a designated office PC (acting as a server) that other computers in the office can connect to.*

#### Step A: Configure the Host CPU (Server)
1. Install the Firebase Command Line Tool on the host computer:
   ```bash
   npm install -g firebase-tools
   ```
2. Initialize local database emulators in the root directory:
   ```bash
   firebase init emulators
   ```
   *Select **Firestore** and **Authentication**.*
3. Boot the local database server:
   ```bash
   firebase emulators:start --import=./local_db --export-on-exit=./local_db --host 0.0.0.0
   ```
   *(The `--host 0.0.0.0` parameter exposes the database to all devices on the local office network).*
4. Find the local network IP of the server computer (run `ipconfig` in CMD, e.g. `192.168.1.50`).

#### Step B: Configure Client Terminals
1. Open [`firebase-applet-config.json`](file:///c:/Users/DELL/Downloads/erp/finance/firebase-applet-config.json) in the client builds.
2. Enable the emulator redirect flag:
   ```json
   {
     ...
     "useEmulator": true,
     "emulatorHost": "192.168.1.50"
   }
   ```
3. Run `npm run build` and launch the client apps. They will automatically redirect all data storage to the host CPU server.

---

## ⚡ Development & Maintenance

- **Start Local Dev Server**: `npm run dev` (Runs hot-reload web server on port `3000`).
- **Linter & Typechecks**: `npm run lint` (Checks typescript compiler compliance).
- **Compile Production Bundle**: `npm run build` (Outputs minified HTML5/PWA assets to the `/dist` directory).
