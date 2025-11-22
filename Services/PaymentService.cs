using SurplusEats.Models;
using AppUser = SurplusEats.Models.User;

namespace SurplusEats.Services {
    public class PaymentService : IPaymentService {
        private readonly IDatabaseService _databaseService;

        public PaymentService(IDatabaseService databaseService) {
            _databaseService = databaseService;
        }

        public async Task<(bool success, string? orderId)> ProcessPaymentAsync(Product product, int quantity, AppUser consumer) {
            try {
                // Calculate amounts
                var subtotal = product.DiscountedPrice * quantity;
                var platformFee = CalculatePlatformFee(subtotal);
                var totalAmount = subtotal + platformFee;

                // Create order
                var order = new Order {
                    ConsumerId = consumer.Id,
                    ConsumerName = consumer.Name,
                    MerchantId = product.MerchantId,
                    MerchantName = product.MerchantName,
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Quantity = quantity,
                    PricePerItem = product.DiscountedPrice,
                    Subtotal = subtotal,
                    PlatformFee = platformFee,
                    TotalAmount = totalAmount,
                    Status = OrderStatus.Pending,
                    OrderDate = DateTime.UtcNow
                };

                // Save order
                var orderId = await _databaseService.SaveOrderAsync(order);

                // Update product quantity
                product.Quantity -= quantity;
                if (product.Quantity <= 0) {
                    product.IsAvailable = false;
                }
                await _databaseService.UpdateProductAsync(product);

                // In a real app, you would integrate with a payment gateway here
                // For now, we're simulating a successful payment
                
                return (true, orderId);
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine($"Payment Error: {ex.Message}");
                return (false, null);
            }
        }

        public decimal CalculatePlatformFee(decimal amount) {
            return amount * Constants.PlatformFeePercentage;
        }
    }
}

