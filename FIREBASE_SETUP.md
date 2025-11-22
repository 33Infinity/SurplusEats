# Firebase Setup Guide for SurplusEats

This guide will help you set up Firebase for the SurplusEats application.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `surpluseats` (or your preferred name)
4. Follow the setup wizard
5. Choose your analytics preferences

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable it and click **Save**

## Step 3: Create Realtime Database

1. Go to **Realtime Database** in the left menu
2. Click **Create Database**
3. Choose a location (select closest to your users)
4. Start in **test mode** for development (we'll secure it later)

## Step 4: Get Your Configuration

1. Go to **Project Settings** (gear icon)
2. Under "Your apps", click the **Web** icon (</>)
3. Register your app with a nickname
4. Copy the following values:
   - `apiKey`
   - `databaseURL`
   - `storageBucket`

## Step 5: Update Constants.cs

Open `Services/Constants.cs` and update:

```csharp
public const string FirebaseApiKey = "YOUR_API_KEY_HERE";
public const string FirebaseDatabaseUrl = "https://YOUR-PROJECT-ID.firebaseio.com/";
public const string FirebaseStorageBucket = "YOUR-PROJECT-ID.appspot.com";
```

## Step 6: Configure Database Rules

For **development**, use these rules (go to Realtime Database → Rules):

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

For **production**, use more secure rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && (auth.uid == $uid || root.child('users/' + auth.uid + '/userType').val() == 'Merchant')",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "products": {
      ".read": "auth != null",
      "$productId": {
        ".write": "auth != null && (
          !data.exists() && newData.child('merchantId').val() == auth.uid ||
          data.child('merchantId').val() == auth.uid
        )"
      }
    },
    "orders": {
      "$orderId": {
        ".read": "auth != null && (
          data.child('consumerId').val() == auth.uid ||
          data.child('merchantId').val() == auth.uid
        )",
        ".write": "auth != null && (
          !data.exists() && newData.child('consumerId').val() == auth.uid ||
          data.child('merchantId').val() == auth.uid
        )"
      }
    },
    "categories": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```

### Rule Explanations:

- **users**: Users can read their own data or merchants can read consumer data; users can only write their own data
- **products**: Anyone authenticated can read; only the merchant who created it can write
- **orders**: Consumers and merchants can read their own orders; consumers can create, merchants can update
- **categories**: Read-only for authenticated users (managed via Firebase Console)

## Step 7: Seed Categories Data

In Firebase Console, go to **Realtime Database** → **Data** tab:

1. Click the **+** icon next to the database root
2. Add child: `categories`
3. Click the **+** icon next to `categories`
4. Import this JSON:

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

## Step 8: Configure Android App (Optional)

If deploying to Android:

1. In Firebase Console, click **Add app** → **Android**
2. Enter your package name: `com.companyname.surpluseats` (or your custom package)
3. Download `google-services.json`
4. Place it in the `Platforms/Android` folder
5. Update your `.csproj` to include it:

```xml
<ItemGroup Condition="'$(TargetFramework)' == 'net8.0-android'">
  <GoogleServicesJson Include="Platforms\Android\google-services.json" />
</ItemGroup>
```

## Step 9: Configure iOS App (Optional)

If deploying to iOS:

1. In Firebase Console, click **Add app** → **iOS**
2. Enter your bundle ID
3. Download `GoogleService-Info.plist`
4. Place it in the `Platforms/iOS` folder
5. Ensure it's included in your build

## Step 10: Enable Firebase Storage (For Image Uploads)

1. Go to **Storage** in Firebase Console
2. Click **Get Started**
3. Start in **test mode** for development
4. For production, update rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{productId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Testing Your Setup

1. **Build the app**: `dotnet build`
2. **Run on Android emulator**: `dotnet build -t:Run -f net8.0-android`
3. **Test Registration**: Create a test account
4. **Check Firebase Console**: Verify user appears in Authentication and Realtime Database

## Troubleshooting

### "Permission Denied" Error
- Check that you're authenticated (logged in)
- Verify your database rules are correct
- Check that the API key is valid

### "Network Error"
- Verify internet connection
- Check Firebase Database URL is correct
- Ensure Android app has INTERNET permission

### Categories Not Showing
- Verify categories are in Firebase Console under Realtime Database
- Check database rules allow reading categories
- Ensure you're logged in

### Authentication Failed
- Verify API key is correct
- Check that Email/Password provider is enabled in Firebase Console
- Ensure password is at least 6 characters

## Security Best Practices

1. **Never commit API keys** to public repositories
2. Use **environment variables** for sensitive data in production
3. Implement **rate limiting** on Firebase functions
4. Use **Firebase Security Rules** to restrict access
5. Enable **App Check** for additional security
6. Regularly **audit your rules** and access patterns
7. Use **Firebase Authentication** tokens for all API calls

## Cost Considerations

Firebase free tier (Spark Plan) includes:
- **Authentication**: 50,000 phone authentications/month (unlimited email/password)
- **Realtime Database**: 1 GB stored, 10 GB downloaded/month
- **Storage**: 5 GB stored, 1 GB downloaded/day

For production, consider the **Blaze Plan** (pay as you go).

## Next Steps

After setup:
1. Test all user flows (registration, login, product listing, ordering)
2. Add sample products as a merchant
3. Test ordering as a consumer
4. Monitor Firebase Console for real-time updates
5. Review and tighten security rules before production

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Security Rules Reference](https://firebase.google.com/docs/database/security)

---

Need help? Check the Firebase Console logs and debugging tools for detailed error messages.



