using Firebase.Database;
using Firebase.Database.Query;
using SurplusEats.Models;
using Newtonsoft.Json;
using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public class DatabaseService : IDatabaseService {
        private readonly FirebaseClient _firebaseClient;

        public DatabaseService() {
            _firebaseClient = new FirebaseClient(Constants.FirebaseDatabaseUrl);
        }

        // User operations
        public async Task<AppUser?> GetUserAsync(string userId) {
            try {
                var user = await _firebaseClient
                    .Child(Constants.UsersPath)
                    .Child(userId)
                    .OnceSingleAsync<AppUser>();
                return user;
            } catch {
                return null;
            }
        }

        public async Task SaveUserAsync(AppUser user) {
            await _firebaseClient
                .Child(Constants.UsersPath)
                .Child(user.Id)
                .PutAsync(user);
        }

        public async Task UpdateUserAsync(AppUser user) {
            await _firebaseClient
                .Child(Constants.UsersPath)
                .Child(user.Id)
                .PatchAsync(user);
        }

        // Category operations
        public async Task<List<Category>> GetCategoriesAsync() {
            try {
                var categories = await _firebaseClient
                    .Child(Constants.CategoriesPath)
                    .OnceAsync<Category>();
                
                return categories.Select(c => {
                    var category = c.Object;
                    category.Id = c.Key;
                    return category;
                }).ToList();
            } catch {
                return new List<Category>();
            }
        }

        public async Task<Category?> GetCategoryAsync(string categoryId) {
            try {
                var category = await _firebaseClient
                    .Child(Constants.CategoriesPath)
                    .Child(categoryId)
                    .OnceSingleAsync<Category>();
                return category;
            } catch {
                return null;
            }
        }

        // Product operations
        public async Task<List<Product>> GetAllProductsAsync() {
            try {
                var products = await _firebaseClient
                    .Child(Constants.ProductsPath)
                    .OnceAsync<Product>();
                
                return products.Select(p => {
                    var product = p.Object;
                    product.Id = p.Key;
                    return product;
                })
                .Where(p => p.IsAvailable && p.Quantity > 0)
                .ToList();
            } catch {
                return new List<Product>();
            }
        }

        public async Task<List<Product>> GetProductsByMerchantAsync(string merchantId) {
            try {
                var products = await _firebaseClient
                    .Child(Constants.ProductsPath)
                    .OnceAsync<Product>();
                
                return products
                    .Select(p => {
                        var product = p.Object;
                        product.Id = p.Key;
                        return product;
                    })
                    .Where(p => p.MerchantId == merchantId)
                    .ToList();
            } catch {
                return new List<Product>();
            }
        }

        public async Task<List<Product>> GetProductsByCategoryAsync(string categoryId) {
            try {
                var products = await _firebaseClient
                    .Child(Constants.ProductsPath)
                    .OnceAsync<Product>();
                
                return products
                    .Select(p => {
                        var product = p.Object;
                        product.Id = p.Key;
                        return product;
                    })
                    .Where(p => p.CategoryId == categoryId && p.IsAvailable && p.Quantity > 0)
                    .ToList();
            } catch {
                return new List<Product>();
            }
        }

        public async Task<List<Product>> SearchProductsAsync(string searchTerm, double latitude, double longitude, double radiusMiles = 10) {
            try {
                var products = await GetAllProductsAsync();
                
                var filtered = products.Where(p => {
                    // Filter by search term
                    bool matchesSearch = string.IsNullOrWhiteSpace(searchTerm) || 
                        p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                        p.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                        p.CategoryName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase);

                    if (!matchesSearch) return false;

                    // Filter by distance
                    double distance = CalculateDistance(latitude, longitude, p.Latitude, p.Longitude);
                    return distance <= radiusMiles;
                }).ToList();

                return filtered;
            } catch {
                return new List<Product>();
            }
        }

        public async Task<Product?> GetProductAsync(string productId) {
            try {
                var product = await _firebaseClient
                    .Child(Constants.ProductsPath)
                    .Child(productId)
                    .OnceSingleAsync<Product>();
                return product;
            } catch {
                return null;
            }
        }

        public async Task<string> SaveProductAsync(Product product) {
            var result = await _firebaseClient
                .Child(Constants.ProductsPath)
                .PostAsync(product);
            
            product.Id = result.Key;
            return result.Key;
        }

        public async Task UpdateProductAsync(Product product) {
            await _firebaseClient
                .Child(Constants.ProductsPath)
                .Child(product.Id)
                .PatchAsync(product);
        }

        public async Task DeleteProductAsync(string productId) {
            await _firebaseClient
                .Child(Constants.ProductsPath)
                .Child(productId)
                .DeleteAsync();
        }

        // Order operations
        public async Task<string> SaveOrderAsync(Order order) {
            var result = await _firebaseClient
                .Child(Constants.OrdersPath)
                .PostAsync(order);
            
            order.Id = result.Key;
            return result.Key;
        }

        public async Task UpdateOrderAsync(Order order) {
            await _firebaseClient
                .Child(Constants.OrdersPath)
                .Child(order.Id)
                .PatchAsync(order);
        }

        public async Task<List<Order>> GetOrdersByConsumerAsync(string consumerId) {
            try {
                var orders = await _firebaseClient
                    .Child(Constants.OrdersPath)
                    .OnceAsync<Order>();
                
                return orders
                    .Select(o => {
                        var order = o.Object;
                        order.Id = o.Key;
                        return order;
                    })
                    .Where(o => o.ConsumerId == consumerId)
                    .OrderByDescending(o => o.OrderDate)
                    .ToList();
            } catch {
                return new List<Order>();
            }
        }

        public async Task<List<Order>> GetOrdersByMerchantAsync(string merchantId) {
            try {
                var orders = await _firebaseClient
                    .Child(Constants.OrdersPath)
                    .OnceAsync<Order>();
                
                return orders
                    .Select(o => {
                        var order = o.Object;
                        order.Id = o.Key;
                        return order;
                    })
                    .Where(o => o.MerchantId == merchantId)
                    .OrderByDescending(o => o.OrderDate)
                    .ToList();
            } catch {
                return new List<Order>();
            }
        }

        public async Task<Order?> GetOrderAsync(string orderId) {
            try {
                var order = await _firebaseClient
                    .Child(Constants.OrdersPath)
                    .Child(orderId)
                    .OnceSingleAsync<Order>();
                return order;
            } catch {
                return null;
            }
        }

        // Helper method to calculate distance between two coordinates (Haversine formula)
        private double CalculateDistance(double lat1, double lon1, double lat2, double lon2) {
            const double R = 3959; // Earth's radius in miles
            var dLat = ToRadians(lat2 - lat1);
            var dLon = ToRadians(lon2 - lon1);
            
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                   Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                   Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }

        private double ToRadians(double degrees) {
            return degrees * Math.PI / 180;
        }
    }
}

