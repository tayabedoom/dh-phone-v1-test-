# DH Phone Website - Admin Panel

## Issues Fixed

### 1. Landing Page Data Not Saving
- **Problem**: Landing pages weren't saving because Firebase wasn't properly configured
- **Solution**: 
  - Created `config.js` with Firebase configuration
  - Improved error handling to use localStorage as primary storage
  - Added Firebase status indicator

### 2. Cannot Delete Landing Pages
- **Problem**: Delete functionality depended on Firebase being properly set up
- **Solution**: 
  - Made localStorage the primary storage method
  - Firebase is now optional for saving/deleting
  - Improved error messages and status display

## Setup Instructions

### 1. Firebase Setup (Required for Cloud Storage)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Go to Project Settings > General
5. Add a web app to your project
6. Copy the Firebase config to `config.js`:

```javascript
window.config = {
  shopify: {
    domain: "kwr3tv-ax.myshopify.com",
    accessToken: "e318cfe2b56703f779f113ed17e8459c"
  },
  firebase: {
    apiKey: "AIzaSyAndSCDhjwz1rvm_2tI3ZLnEJRkFBeBJ8U",
    authDomain: "dh-phone-dynamic-content.firebaseapp.com",
    projectId: "dh-phone-dynamic-content",
    storageBucket: "dh-phone-dynamic-content.firebasestorage.app",
    messagingSenderId: "778700427286",
    appId: "1:778700427286:web:b2e0c24a34e89908ebe537",
    measurementId: "G-2YZ3YXHCVS"
  }
};
```

### 2. Firestore Rules

The `firestore.rules` file is already configured with your specific authentication rules. Deploy it to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

**Note**: The rules require authentication for write operations. The admin panel will automatically sign in anonymously to enable saving data.

### 3. Admin Panel Features

#### Landing Pages
- **Create**: Click "Create New Landing Page" and select products
- **View**: Click "View" to see the landing page
- **Delete**: Click "Delete" to remove unwanted landing pages
- **Test**: Click "Test" to create a test landing page

#### Product Management
- **Connect to Shopify**: Load your products from Shopify
- **Add Features**: Add key features with icons
- **Add Specifications**: Add technical specifications
- **Save**: All data is saved to localStorage and Firebase (if available)

### 4. Storage Strategy

The admin panel now uses a **hybrid storage approach**:

1. **localStorage** (Primary): Always works, data persists in browser
2. **Firebase** (Secondary): Optional, provides cloud backup

This ensures the admin panel works even without Firebase configuration.

### 5. Status Indicators

- **Firebase Status**: Shows connection status at the top
- **Authentication Status**: Shows if you're signed in (required for saving)
- **Shopify Status**: Shows when products are loaded
- **Save Status**: Shows success/error when saving data

**Important**: You must be authenticated to save data to Firebase. Click "Sign In" if the authentication status shows "Not authenticated".

## Troubleshooting

### If landing pages don't save:
1. Check browser console for errors
2. Ensure localStorage is enabled in your browser
3. Check Firebase configuration if using cloud storage

### If you can't delete landing pages:
1. Check the Firebase status indicator
2. Try refreshing the page
3. Check browser console for error messages

### If Firebase isn't connecting:
1. **Test your setup**: Open `firebase-test.html` in your browser to diagnose issues
2. **Check Firebase Console**: Ensure Firestore Database is enabled
3. **Enable Anonymous Auth**: Go to Firebase Console > Authentication > Sign-in method > Anonymous > Enable
4. **Deploy Firestore Rules**: Run `firebase deploy --only firestore:rules`
5. **Check Network**: Ensure you're not behind a firewall blocking Firebase
6. **Browser Console**: Check for specific error messages in browser console (F12)

## File Structure

```
├── admin.html          # Admin panel
├── landing-page.html   # Landing page template
├── config.js          # Firebase and Shopify configuration
├── firestore.rules    # Firebase security rules
└── README.md          # This file
```

## Features

- ✅ Landing page creation and management
- ✅ Product feature and specification management
- ✅ Shopify integration
- ✅ Firebase cloud storage (optional)
- ✅ localStorage fallback
- ✅ Delete functionality
- ✅ Status indicators
- ✅ Error handling
- ✅ Dark mode support 