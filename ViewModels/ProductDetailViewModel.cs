using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;

namespace SurplusEats.ViewModels {
    [QueryProperty(nameof(Product), "Product")]
    public partial class ProductDetailViewModel : BaseViewModel {
        private readonly IPaymentService _paymentService;
        private readonly IAuthService _authService;

        [ObservableProperty]
        private Product? product;

        [ObservableProperty]
        private int quantity = 1;

        [ObservableProperty]
        private decimal totalPrice;

        [ObservableProperty]
        private decimal platformFee;

        [ObservableProperty]
        private decimal grandTotal;

        public ProductDetailViewModel(IPaymentService paymentService, IAuthService authService) {
            _paymentService = paymentService;
            _authService = authService;
            Title = "Product Details";
        }

        partial void OnProductChanged(Product? value) {
            if (value != null) {
                CalculateTotals();
            }
        }

        partial void OnQuantityChanged(int value) {
            CalculateTotals();
        }

        private void CalculateTotals() {
            if (Product == null) return;

            TotalPrice = Product.DiscountedPrice * Quantity;
            PlatformFee = _paymentService.CalculatePlatformFee(TotalPrice);
            GrandTotal = TotalPrice + PlatformFee;
        }

        [RelayCommand]
        void IncreaseQuantity() {
            if (Product != null && Quantity < Product.Quantity) {
                Quantity++;
            }
        }

        [RelayCommand]
        void DecreaseQuantity() {
            if (Quantity > 1) {
                Quantity--;
            }
        }

        [RelayCommand]
        async Task PlaceOrderAsync() {
            if (IsBusy || Product == null) return;

            try {
                IsBusy = true;

                var user = await _authService.GetCurrentUserAsync();
                if (user == null) {
                    await Shell.Current.DisplayAlert("Error", "Please log in to place an order", "OK");
                    return;
                }

                var (success, orderId) = await _paymentService.ProcessPaymentAsync(Product, Quantity, user);

                if (success) {
                    await Shell.Current.DisplayAlert(
                        "Success",
                        "Your order has been placed successfully!",
                        "OK"
                    );
                    await Shell.Current.GoToAsync("..");
                } else {
                    await Shell.Current.DisplayAlert(
                        "Error",
                        "Failed to process payment. Please try again.",
                        "OK"
                    );
                }
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Order failed: {ex.Message}", "OK");
            } finally {
                IsBusy = false;
            }
        }
    }
}


