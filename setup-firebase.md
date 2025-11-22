# ✅ Firebase Configuration Complete!

## Your Firebase Credentials (Already Applied)

```
Project ID: surpluseats-6344f
API Key: AIzaSyBsCG-QyOD3zHoP7OA9cQ6P2HoK5pK5zAY
Database URL: https://surpluseats-6344f-default-rtdb.firebaseio.com/
Storage Bucket: surpluseats-6344f.firebasestorage.app
```

✅ These credentials have been automatically added to `Services/Constants.cs`

## 🔧 Required Setup Steps (Do these now)

### Step 1: Enable Authentication (30 seconds)

1. Go to: https://console.firebase.google.com/project/surpluseats-6344f/authentication
2. Click **"Get started"** (if not already enabled)
3. Click **"Sign-in method"** tab
4. Click **"Email/Password"**
5. Toggle **"Enable"**
6. Click **"Save"**

### Step 2: Create Realtime Database (30 seconds)

1. Go to: https://console.firebase.google.com/project/surpluseats-6344f/database
2. Click **"Create Database"**
3. Choose location: **"United States (us-central1)"**
4. Start in **"test mode"** (for development)
5. Click **"Enable"**

### Step 3: Add Categories Data (1 minute)

Once the database is created:

1. In the Firebase Console → Realtime Database → Data tab
2. Click the **"+"** icon next to the database root
3. Name: `categories`
4. Click **"+"** next to categories
5. Import this JSON (click the ⋮ menu → Import JSON):

```json
{
  "bakery": {
    "id": "bakery",
    "name": "Bakery",
    "description": "Fresh baked goods, bread, pastries",
    "iconUrl": "🥖"
  },
  "fruits_vegetables": {
    "id": "fruits_vegetables",
    "name": "Fruits & Vegetables",
    "description": "Fresh produce",
    "iconUrl": "🥗"
  },
  "prepared_meals": {
    "id": "prepared_meals",
    "name": "Prepared Meals",
    "description": "Ready-to-eat meals",
    "iconUrl": "🍱"
  },
  "dairy": {
    "id": "dairy",
    "name": "Dairy",
    "description": "Milk, cheese, yogurt",
    "iconUrl": "🧀"
  },
  "meat_seafood": {
    "id": "meat_seafood",
    "name": "Meat & Seafood",
    "description": "Fresh meat and seafood",
    "iconUrl": "🥩"
  },
  "beverages": {
    "id": "beverages",
    "name": "Beverages",
    "description": "Drinks and beverages",
    "iconUrl": "🥤"
  },
  "desserts": {
    "id": "desserts",
    "name": "Desserts",
    "description": "Sweet treats",
    "iconUrl": "🍰"
  },
  "other": {
    "id": "other",
    "name": "Other",
    "description": "Miscellaneous items",
    "iconUrl": "📦"
  }
}
```

## 🚀 Run Your App!

After completing the 3 steps above, run:

### For Android:
```bash
dotnet build -t:Run -f net8.0-android
```

### For iOS (Mac only):
```bash
dotnet build -t:Run -f net8.0-ios
```

### For Windows:
```bash
dotnet build -t:Run -f net8.0-windows10.0.19041.0
```

## 🧪 Test Your App

### Register as Merchant:
1. Open the app
2. Click "Register"
3. Select "Merchant"
4. Fill in details
5. Create account
6. Add a product!

### Register as Consumer:
1. Use a different email
2. Select "Consumer"
3. Browse products
4. Place an order!

## 📋 Quick Links

- [Firebase Console - Authentication](https://console.firebase.google.com/project/surpluseats-6344f/authentication)
- [Firebase Console - Database](https://console.firebase.google.com/project/surpluseats-6344f/database)
- [Firebase Console - Overview](https://console.firebase.google.com/project/surpluseats-6344f/overview)

## ✅ Verification Checklist

- [ ] Authentication enabled with Email/Password
- [ ] Realtime Database created
- [ ] Categories data added to database
- [ ] App builds successfully: `dotnet build`
- [ ] App runs on your device
- [ ] Can register a merchant account
- [ ] Can add products as merchant
- [ ] Can register a consumer account
- [ ] Can browse and order products

## 🎉 You're Ready!

Total setup time: ~2 minutes

Once you complete these steps, you'll have a fully functional food surplus marketplace app!

---

**Your Project**: surpluseats-6344f  
**Status**: ✅ Configured  
**Next**: Enable Auth & Database (links above)



