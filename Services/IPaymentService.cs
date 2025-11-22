using SurplusEats.Models;
using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public interface IPaymentService {
        Task<(bool success, string? orderId)> ProcessPaymentAsync(Product product, int quantity, AppUser consumer);
        decimal CalculatePlatformFee(decimal amount);
    }
}

