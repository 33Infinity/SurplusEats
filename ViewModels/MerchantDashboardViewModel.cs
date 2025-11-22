using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;
using System.Collections.ObjectModel;

namespace SurplusEats.ViewModels {
    public partial class MerchantDashboardViewModel : BaseViewModel {
        private readonly IDatabaseService _databaseService;
        private readonly IAuthService _authService;

        [ObservableProperty]
        private ObservableCollection<Product> myProducts = new();

        [ObservableProperty]
        private ObservableCollection<Order> myOrders = new();

        [ObservableProperty]
        private User? currentUser;

        [ObservableProperty]
        private int totalProducts;

        [ObservableProperty]
        private int pendingOrders;

        [ObservableProperty]
        private decimal totalRevenue;

        public MerchantDashboardViewModel(IDatabaseService databaseService, IAuthService authService) {
            _databaseService = databaseService;
            _authService = authService;
            Title = "Merchant Dashboard";
        }

        public async Task InitializeAsync() {
            await LoadDataAsync();
        }

        [RelayCommand]
        async Task LoadDataAsync() {
            if (IsBusy) return;

            try {
                IsBusy = true;

                CurrentUser = await _authService.GetCurrentUserAsync();
                
                if (CurrentUser == null) return;

                var productsTask = _databaseService.GetProductsByMerchantAsync(CurrentUser.Id);
                var ordersTask = _databaseService.GetOrdersByMerchantAsync(CurrentUser.Id);

                await Task.WhenAll(productsTask, ordersTask);

                MyProducts = new ObservableCollection<Product>(productsTask.Result);
                MyOrders = new ObservableCollection<Order>(ordersTask.Result);

                // Calculate statistics
                TotalProducts = MyProducts.Count;
                PendingOrders = MyOrders.Count(o => o.Status == OrderStatus.Pending);
                TotalRevenue = MyOrders
                    .Where(o => o.Status == OrderStatus.Completed)
                    .Sum(o => o.Subtotal); // Subtotal is the merchant's portion (before platform fee)
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Failed to load data: {ex.Message}", "OK");
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task AddProductAsync() {
            await Shell.Current.GoToAsync("AddProduct");
        }

        [RelayCommand]
        async Task EditProductAsync(Product product) {
            var navigationParameter = new Dictionary<string, object> {
                { "Product", product }
            };
            await Shell.Current.GoToAsync("EditProduct", navigationParameter);
        }

        [RelayCommand]
        async Task DeleteProductAsync(Product product) {
            bool confirm = await Shell.Current.DisplayAlert(
                "Confirm Delete",
                $"Are you sure you want to delete {product.Name}?",
                "Yes",
                "No"
            );

            if (confirm) {
                try {
                    await _databaseService.DeleteProductAsync(product.Id);
                    MyProducts.Remove(product);
                    TotalProducts = MyProducts.Count;
                } catch (Exception ex) {
                    await Shell.Current.DisplayAlert("Error", $"Failed to delete product: {ex.Message}", "OK");
                }
            }
        }

        [RelayCommand]
        async Task UpdateOrderStatusAsync(Order order) {
            var actions = new[] { "Confirmed", "Ready for Pickup", "Completed", "Cancelled" };
            var action = await Shell.Current.DisplayActionSheet(
                "Update Order Status",
                "Cancel",
                null,
                actions
            );

            if (action != null && action != "Cancel") {
                try {
                    order.Status = action switch {
                        "Confirmed" => OrderStatus.Confirmed,
                        "Ready for Pickup" => OrderStatus.ReadyForPickup,
                        "Completed" => OrderStatus.Completed,
                        "Cancelled" => OrderStatus.Cancelled,
                        _ => order.Status
                    };

                    if (order.Status == OrderStatus.Completed) {
                        order.CompletedAt = DateTime.UtcNow;
                    }

                    await _databaseService.UpdateOrderAsync(order);
                    await LoadDataAsync();
                } catch (Exception ex) {
                    await Shell.Current.DisplayAlert("Error", $"Failed to update order: {ex.Message}", "OK");
                }
            }
        }

        [RelayCommand]
        async Task LogoutAsync() {
            await _authService.SignOutAsync();
            await Shell.Current.GoToAsync("//Login");
        }
    }
}


