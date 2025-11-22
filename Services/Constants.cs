namespace SurplusEats.Services {
    public static class Constants {
        // Firebase Configuration - surpluseats project
        public const string FirebaseApiKey = "AIzaSyBsCG-QyOD3zHoP7OA9cQ6P2HoK5pK5zAY";
        public const string FirebaseDatabaseUrl = "https://surpluseats-6344f-default-rtdb.firebaseio.com/";
        public const string FirebaseStorageBucket = "surpluseats-6344f.firebasestorage.app";
        
        // Platform Fee Configuration (5% of each sale)
        public const decimal PlatformFeePercentage = 0.05m;
        
        // Database Paths
        public const string UsersPath = "users";
        public const string ProductsPath = "products";
        public const string OrdersPath = "orders";
        public const string CategoriesPath = "categories";
    }
}

