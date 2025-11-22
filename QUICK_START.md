# 🚀 Quick Start Guide

Get your SurplusEats app running in 5 minutes!

## Step 1: Firebase Setup (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enable **Authentication** → **Email/Password**
4. Create **Realtime Database** (start in test mode)
5. Copy your **API Key** and **Database URL**

## Step 2: Configure Your App (1 minute)

Open `Services/Constants.cs` and update:

```csharp
public const string FirebaseApiKey = "YOUR_ACTUAL_API_KEY_HERE";
public const string FirebaseDatabaseUrl = "https://your-project-id.firebaseio.com/";
```

## Step 3: Add Categories (1 minute)

In Firebase Console → Realtime Database, import this JSON:

```json
{
  "categories": {
    "bakery": {
      "id": "bakery",
      "name": "Bakery",
      "description": "Fresh baked goods",
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
    }
  }
}
```

## Step 4: Run the App (1 minute)

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

## 🎮 Test the App

### As a Merchant:
1. Register → Select "Merchant"
2. Fill in your details
3. Login
4. Click "+" to add a product
5. Fill in product details and save

### As a Consumer:
1. Register → Select "Consumer"
2. Fill in your details
3. Login
4. Browse products added by merchants
5. Click on a product to see details
6. Select quantity and place order

## 🎯 What to Expect

### Login Screen
- Clean, green-themed interface
- Email and password fields
- "Don't have an account? Register" link

### Merchant Dashboard
- Statistics: Total Products, Pending Orders, Revenue
- Two tabs: "My Products" and "Orders"
- Add Product button
- Edit and Delete buttons for each product
- Order status management

### Consumer Home
- Search bar at the top
- Horizontal scrolling category chips
- Product list with:
  - Product name and merchant
  - Original and discounted prices
  - Discount percentage badge
  - Available quantity

### Product Detail
- Large product image placeholder
- Full product information
- Quantity selector
- Price breakdown with platform fee
- Place Order button

## 🔧 Troubleshooting

### "Permission Denied" Error
- Check Firebase Database Rules
- Default rule for testing:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### "Invalid API Key" Error
- Verify your API key in Constants.cs
- Make sure there are no extra quotes or spaces

### Categories Not Showing
- Verify categories are in Firebase Console
- Check the exact path: `/categories`
- Make sure you're logged in

### Build Errors
```bash
# Clean and rebuild
dotnet clean
dotnet build
```

## 📸 Expected Screenshots Flow

1. **Splash** → **Login** → **Registration**
2. **Merchant Flow**: Dashboard → Add Product → View Orders
3. **Consumer Flow**: Browse → Search → Product Detail → Order

## 🎨 Color Theme

- **Primary Green**: #2E7D32 (Fresh, eco-friendly)
- **Background**: #F5F5F5 (Light gray)
- **Cards**: White with shadows
- **Accent**: #FF5722 (Discount badges)

## 💡 Pro Tips

1. **Test Both User Types**: Create one merchant and one consumer account
2. **Add Sample Products**: Create 3-5 products to test browsing
3. **Test Search**: Try searching for product names
4. **Test Categories**: Filter by different categories
5. **Test Orders**: Place an order as consumer, update status as merchant

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. See `FIREBASE_SETUP.md` for Firebase configuration
3. Review `PROJECT_SUMMARY.md` for architecture details
4. Check Firebase Console logs for errors
5. Look at Debug output in your IDE

## ✅ Success Checklist

- [ ] Firebase project created
- [ ] API key configured in Constants.cs
- [ ] Categories added to Firebase
- [ ] App builds successfully
- [ ] Can register as merchant
- [ ] Can register as consumer
- [ ] Merchant can add products
- [ ] Consumer can browse products
- [ ] Consumer can place orders
- [ ] Merchant can see and update orders

## 🎉 You're Ready!

Once you complete the checklist above, you have a fully working food surplus marketplace app!

Next steps:
- Add more categories
- Implement actual location services
- Add image upload
- Integrate payment gateway
- Deploy to app stores

Happy building! 🚀

---

**Estimated Setup Time**: 5 minutes  
**Difficulty**: Easy  
**Required**: Firebase account (free)



