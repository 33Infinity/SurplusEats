using SurplusEats.Models;
using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public interface IDatabaseService {
        // User operations
        Task<AppUser?> GetUserAsync(string userId);
        Task SaveUserAsync(AppUser user);
        Task UpdateUserAsync(AppUser user);

        // Category operations
        Task<List<Category>> GetCategoriesAsync();
        Task<Category?> GetCategoryAsync(string categoryId);

        // Product operations
        Task<List<Product>> GetAllProductsAsync();
        Task<List<Product>> GetProductsByMerchantAsync(string merchantId);
        Task<List<Product>> GetProductsByCategoryAsync(string categoryId);
        Task<List<Product>> SearchProductsAsync(string searchTerm, double latitude, double longitude, double radiusMiles = 10);
        Task<Product?> GetProductAsync(string productId);
        Task<string> SaveProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(string productId);

        // Order operations
        Task<string> SaveOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task<List<Order>> GetOrdersByConsumerAsync(string consumerId);
        Task<List<Order>> GetOrdersByMerchantAsync(string merchantId);
        Task<Order?> GetOrderAsync(string orderId);
    }
}

