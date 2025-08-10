# 🔐 PhishGuard – Mobile Phishing URL Scanner

**PhishGuard** is a secure and user-friendly mobile application built with **React Native** and **Expo** that helps users check if a URL is safe or potentially malicious using **Google Safe Browsing API**.

---

## 🚀 Features

### 🧑‍💻 Frontend (React Native + Tailwind)

* **Real-time URL Safety Check** using Google’s Safe Browsing.
* **Minimalist and accessible UI** with intuitive input flow.
* **Responsive Design** using Tailwind CSS and NativeWind.
* **Persistent Scan History** with local storage via `AsyncStorage`.
* **Custom Navigation** using `expo-router`.
* **Modular Component Architecture** for better maintainability.

### 🛡️ Cybersecurity Integration

* **Google Safe Browsing API**:

  * Detects malware and phishing threats in URLs.
  * Uses client-specific threat detection payloads.
* **Secure Data Flow**:

  * HTTPS for all network calls.
  * Local history stored securely with no external data leakage.
* **User Alerts**:

  * Immediate toast feedback for safe or unsafe URLs.
  * History includes status + timestamp for auditability.

---

## 🧠 What Is Phishing?

**Phishing** is a type of cyberattack where attackers trick individuals into revealing sensitive information such as usernames, passwords, or credit card numbers by pretending to be trustworthy entities (like banks, services, or companies). These scams are often delivered via malicious links in:

* Emails
* Text messages
* Social media
* Fake websites

Clicking on these malicious URLs can lead users to fraudulent websites that appear legitimate but are designed to steal personal data or install malware.

---

## 🛡️ How Google Safe Browsing API Works

PhishGuard uses the **Google Safe Browsing API v4**, a service provided by Google that lets applications check whether URLs are associated with unsafe web resources.

### 🔍 How it works:

1. **Client sends request**:

   * The app submits the URL to Google’s Safe Browsing API.
   * Request includes threat types like `MALWARE`, `SOCIAL_ENGINEERING`, etc.

2. **Google checks its threat database**:

   * It compares the submitted URL against a constantly updated list of unsafe sites maintained by Google.

3. **API responds**:

   * If the URL matches any threats, it returns a match object.
   * If no threats are detected, it returns an empty response (interpreted as "safe").

4. **Result is displayed**:

   * Based on the response, the app notifies the user whether the link is **safe** or **unsafe**.

### 🔗 Official Documentation

📚 [Google Safe Browsing API v4 – Documentation](https://developers.google.com/safe-browsing/v4)

This documentation includes:

* API structure
* Threat types and classifications
* Authentication setup
* Quota and usage limits

---

## 📌 Quick Summary

| Term                     | Meaning                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| **Phishing**             | Fake attempts to trick users into giving up private info via fake links |
| **Google Safe Browsing** | A service that identifies unsafe websites and warns users               |
| **Threat Types Used**    | `MALWARE`, `SOCIAL_ENGINEERING` (phishing), and more                    |

---

## 📱 Screens Overview

### 🏠 `index.tsx` (Welcome Page)

* Input to enter any URL
* Check button with loader + result display
* Link to view history
* Friendly branding (e.g., shield icon and app name)

### 🕓 `history.tsx` (History Page)

* View past scanned URLs
* Color-coded status:

  * 🟢 Safe
  * 🔴 Unsafe
* Long-press to select and delete multiple records
* Uses `AsyncStorage` to persist data locally

### ⚙️ `settings.tsx` / `about.tsx`

* Placeholder/optional pages for app customization or info
* Can be extended with language/theme settings or app version

---

## 📁 Project File Structure

```
phishguard/
├── app/                         # App pages (React Navigation structure)
│   ├── _app.tsx                 # Root component
│   ├── _layout.tsx             # Navigation layout
│   ├── index.tsx               # Home (URL scanner)
│   ├── history.tsx             # History screen
│   ├── about.tsx               # About page
│   ├── settings.tsx            # Settings page
│   └── home.tsx                # Optional alias for index
│
├── components/                 # Reusable UI components
│   ├── CustomTabBar.tsx        # Custom tab bar
│   └── LogoHeader.tsx          # Branded header component
│
├── contexts/                   # Context API (global state/theme)
│   └── theme.tsx               # Theme context provider
│
├── utils/                      # Utility functions
│   ├── history.ts              # Save/load scan history
│   └── safeBrowsing.ts         # Google Safe Browsing API logic
│
├── public/                     # Static files
│   ├── icons/                  # Icon assets
│   └── manifest.json           # PWA/metadata
│
├── assets/                     # Media assets (images, fonts, etc.)
│
├── global.css                  # Global styles (if needed)
├── tailwind.config.js          # Tailwind (NativeWind) configuration
├── nativewind-env.d.ts         # NativeWind type declarations
├── package.json                # Project dependencies and scripts
├── app.json                    # Expo app configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler config
├── expo-env.d.ts               # Expo type environment
└── README.md                   # You are here 👋
```

---

## 🔧 How It Works (Frontend + Security Flow)

1. **User inputs URL** on the home screen.
2. App sends POST request to Google Safe Browsing API:

   ```ts
   const result = await checkUrlSafety(url);
   ```
3. API returns either:

   * `"safe"` – No known threats
   * `"unsafe"` – URL flagged for malware or phishing
4. Result is shown via toast and saved to local storage.
5. Scan history can be viewed, selected, and deleted.

---

## 🧠 Technologies Used

* **React Native** (via Expo)
* **TypeScript**
* **Google Safe Browsing API v4**
* **AsyncStorage**
* **NativeWind** (Tailwind for React Native)
* **Expo Router** for screen navigation
* **Ionicons** for consistent iconography
* **Toast** UI feedback system

---

## 🛠️ Setup Instructions

1. **Clone the repo**:

   ```bash
   git clone https://github.com/yourusername/phishguard.git
   cd phishguard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add your API key** in `utils/safeBrowsing.ts`:

   ```ts
   const apiKey = 'YOUR_API_KEY';
   ```

4. **Start the project**:

   ```bash
   npx expo start
   ```

---

## ✅ Future Enhancements

* [ ] Proxy backend to securely handle API key
* [ ] Support more threat types (e.g., unwanted software)
* [ ] User accounts and cloud-based history
* [ ] Offline mode and local threat signature scanning
* [ ] Dark mode and accessibility improvements

---

## 🛡️ Disclaimer

PhishGuard uses Google Safe Browsing but does not guarantee full protection from all threats. Always use common sense when clicking links.

---

## 📃 License

MIT License

