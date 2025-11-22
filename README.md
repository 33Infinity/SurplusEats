# SurplusEats - Food Surplus Marketplace App

SurplusEats is a cross-platform mobile application built with .NET MAUI that connects consumers with merchants selling surplus food at discounted prices, helping to reduce food waste.

## Features

### User Accounts
- **Dual User Types**: Users can register as either Consumers or Merchants
- **Secure Authentication**: Firebase Authentication for secure login/registration
- **User Profiles**: Complete profile management with location information

### For Merchants
- **Product Listing**: List food items with category, pricing, and availability
- **Inventory Management**: Add, edit, and delete products
- **Order Management**: Track and update order status
- **Dashboard**: View statistics including total products, pending orders, and revenue
- **Pricing Control**: Set original and discounted prices for products

### For Consumers
- **Product Browsing**: Browse all available surplus food items
- **Search & Filter**: Search by keywords and filter by category
- **Location-Based Search**: Find products near you within a specified radius
- **Product Details**: View detailed product information including:
  - Original and discounted prices
  - Discount percentage
  - Available quantity
  - Pickup times
  - Merchant information
- **Order Placement**: Easy checkout with transparent pricing including platform fees

### Platform Features
- **5% Platform Fee**: Automatic calculation on all sales
- **Real-time Updates**: Firebase Realtime Database for live data sync
- **Category System**: Organized product categories (Bakery, Fruits & Vegetables, Prepared Meals, etc.)
- **Modern UI**: Clean, intuitive interface with Material Design principles

## Technology Stack

- **.NET MAUI**: Cross-platform framework (iOS, Android)
- **C# 12** with .NET 8
- **Firebase**: Backend services
  - Firebase Authentication
  - Firebase Realtime Database
  - Firebase Storage
- **MVVM Pattern**: CommunityToolkit.Mvvm
- **XAML**: UI design

## Setup Instructions

### Prerequisites
1. Visual Studio 2022 (17.8 or later) with .NET MAUI workload installed
2. Firebase project ([Create one here](https://console.firebase.google.com/))
3. Android SDK (for Android deployment)
4. Xcode (for iOS deployment, macOS only)

### Firebase Configuration

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Firebase Authentication (Email/Password provider)
   - Create a Firebase Realtime Database

2. **Get Firebase Credentials**
   - Go to Project Settings
   - Under "Your apps", add an Android/iOS app
   - Copy your Firebase API Key and Database URL

3. **Update Configuration**
   - Open `Services/Constants.cs`
   - Replace the following constants with your Firebase credentials:
     ```csharp
     public const string FirebaseApiKey = "YOUR_FIREBASE_API_KEY";
     public const string FirebaseDatabaseUrl = "https://YOUR_PROJECT_ID.firebaseio.com/";
     public const string FirebaseStorageBucket = "YOUR_PROJECT_ID.appspot.com";
     ```

### Firebase Database Structure

Your Firebase Realtime Database should have the following structure:

```
surpluseats/
├── users/
│   └── {userId}/
│       ├── id
│       ├── email
│       ├── name
│       ├── phone
│       ├── userType
│       ├── address
│       ├── city
│       ├── state
│       ├── zipCode
│       ├── latitude
│       ├── longitude
│       ├── createdAt
│       └── isActive
├── categories/
│   └── {categoryId}/
│       ├── id
│       ├── name
│       ├── description
│       └── iconUrl
├── products/
│   └── {productId}/
│       ├── id
│       ├── merchantId
│       ├── merchantName
│       ├── name
│       ├── description
│       ├── categoryId
│       ├── categoryName
│       ├── originalPrice
│       ├── discountedPrice
│       ├── quantity
│       ├── imageUrl
│       ├── expiryDate
│       ├── pickupStartTime
│       ├── pickupEndTime
│       ├── isAvailable
│       ├── createdAt
│       ├── latitude
│       └── longitude
└── orders/
    └── {orderId}/
        ├── id
        ├── consumerId
        ├── consumerName
        ├── merchantId
        ├── merchantName
        ├── productId
        ├── productName
        ├── quantity
        ├── pricePerItem
        ├── subtotal
        ├── platformFee
        ├── totalAmount
        ├── status
        ├── orderDate
        ├── pickupTime
        └── completedAt
```

### Seed Categories (Manual Setup)

You need to manually add categories to your Firebase database. Use the Firebase Console:

1. Go to Realtime Database in Firebase Console
2. Add the following categories under the `categories` node:

```json
{
  "categories": {
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
}
```

### Build and Run

1. **Restore NuGet Packages**
   ```bash
   dotnet restore
   ```

2. **Build the Project**
   ```bash
   dotnet build
   ```

3. **Run on Android**
   ```bash
   dotnet build -t:Run -f net8.0-android
   ```

4. **Run on iOS** (macOS only)
   ```bash
   dotnet build -t:Run -f net8.0-ios
   ```

## Project Structure

```
SurplusEats/
├── Models/              # Data models
│   ├── User.cs
│   ├── UserType.cs
│   ├── Product.cs
│   ├── Category.cs
│   └── Order.cs
├── Services/            # Business logic and data access
│   ├── IAuthService.cs
│   ├── AuthService.cs
│   ├── IDatabaseService.cs
│   ├── DatabaseService.cs
│   ├── IPaymentService.cs
│   ├── PaymentService.cs
│   ├── Constants.cs
│   └── DataSeeder.cs
├── ViewModels/          # MVVM ViewModels
│   ├── BaseViewModel.cs
│   ├── LoginViewModel.cs
│   ├── RegistrationViewModel.cs
│   ├── ConsumerHomeViewModel.cs
│   ├── MerchantDashboardViewModel.cs
│   ├── ProductDetailViewModel.cs
│   └── AddProductViewModel.cs
├── Views/               # XAML UI pages
│   ├── LoginPage.xaml
│   ├── RegistrationPage.xaml
│   ├── ConsumerHomePage.xaml
│   ├── MerchantDashboardPage.xaml
│   ├── ProductDetailPage.xaml
│   └── AddProductPage.xaml
├── Converters/          # Value converters for XAML bindings
│   ├── StringToBoolConverter.cs
│   └── BoolToColorConverter.cs
├── App.xaml             # Application resources
├── AppShell.xaml        # Shell navigation
└── MauiProgram.cs       # Dependency injection configuration
```

## Usage Guide

### For Merchants

1. **Register**: Create an account and select "Merchant" as user type
2. **Add Products**: Click "+" button to add new surplus food items
3. **Manage Inventory**: View, edit, or delete products from the dashboard
4. **Process Orders**: View orders and update their status through the workflow:
   - Pending → Confirmed → Ready for Pickup → Completed

### For Consumers

1. **Register**: Create an account and select "Consumer" as user type
2. **Browse Products**: View available surplus food items
3. **Search**: Use the search bar to find specific items
4. **Filter**: Click category tags to filter products
5. **Order**: Select a product, choose quantity, and place order
6. **Platform Fee**: 5% fee is automatically added to support the platform

## Payment Integration

The current implementation includes a payment service framework. To integrate with a real payment gateway:

1. Update `PaymentService.ProcessPaymentAsync()` method
2. Integrate with providers like:
   - Stripe
   - PayPal
   - Square
   - Other payment gateways

## Location Services

To implement actual GPS location:

1. Add location permissions in platform-specific files
2. Use MAUI's `Geolocation` API
3. Update user coordinates in `RegistrationViewModel`

## Future Enhancements

- [ ] Real-time chat between consumers and merchants
- [ ] Push notifications for orders
- [ ] Product image upload
- [ ] Rating and review system
- [ ] Order history with detailed view
- [ ] Merchant analytics dashboard
- [ ] Map view for nearby products
- [ ] In-app payment processing
- [ ] QR code for order pickup verification
- [ ] Scheduling for future pickups

## Contributing

This is a complete foundation for a food surplus marketplace. You can extend it by:

1. Adding image upload functionality
2. Implementing real payment processing
3. Adding social features
4. Implementing push notifications
5. Adding analytics and reporting

## License

This project is provided as-is for educational and commercial use.

## Support

For issues and questions:
1. Check Firebase credentials are correctly configured
2. Ensure all NuGet packages are restored
3. Verify Firebase Realtime Database rules allow read/write
4. Check Android/iOS permissions for network access

## Important Notes

- **Firebase Security Rules**: Make sure to configure appropriate security rules in Firebase Console
- **API Keys**: Never commit your actual Firebase API keys to public repositories
- **Platform Fees**: Currently set to 5%, can be adjusted in `Services/Constants.cs`
- **Location**: Implement actual GPS coordinates for production use
- **Payment**: Implement real payment gateway before production deployment

---

**Built with ❤️ using .NET MAUI**



