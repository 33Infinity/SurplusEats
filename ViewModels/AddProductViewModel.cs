using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;
using System.Collections.ObjectModel;

namespace SurplusEats.ViewModels {
    public partial class AddProductViewModel : BaseViewModel {
        private readonly IDatabaseService _databaseService;
        private readonly IAuthService _authService;

        [ObservableProperty]
        private string name = string.Empty;

        [ObservableProperty]
        private string description = string.Empty;

        [ObservableProperty]
        private string originalPriceText = string.Empty;

        [ObservableProperty]
        private string discountedPriceText = string.Empty;

        [ObservableProperty]
        private string quantityText = string.Empty;

        [ObservableProperty]
        private DateTime expiryDate = DateTime.Now.AddDays(1);

        [ObservableProperty]
        private TimeSpan pickupStartTime = new TimeSpan(9, 0, 0);

        [ObservableProperty]
        private TimeSpan pickupEndTime = new TimeSpan(17, 0, 0);

        [ObservableProperty]
        private ObservableCollection<Category> categories = new();

        [ObservableProperty]
        private Category? selectedCategory;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        public AddProductViewModel(IDatabaseService databaseService, IAuthService authService) {
            _databaseService = databaseService;
            _authService = authService;
            Title = "Add Product";
        }

        public async Task InitializeAsync() {
            await LoadCategoriesAsync();
        }

        [RelayCommand]
        async Task LoadCategoriesAsync() {
            try {
                var cats = await _databaseService.GetCategoriesAsync();
                Categories = new ObservableCollection<Category>(cats);
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Failed to load categories: {ex.Message}", "OK");
            }
        }

        [RelayCommand]
        async Task SaveProductAsync() {
            if (IsBusy) return;

            try {
                IsBusy = true;
                ErrorMessage = string.Empty;

                // Validation
                if (string.IsNullOrWhiteSpace(Name) || string.IsNullOrWhiteSpace(Description)) {
                    ErrorMessage = "Please fill in all required fields";
                    return;
                }

                if (SelectedCategory == null) {
                    ErrorMessage = "Please select a category";
                    return;
                }

                if (!decimal.TryParse(OriginalPriceText, out var originalPrice) || originalPrice <= 0) {
                    ErrorMessage = "Please enter a valid original price";
                    return;
                }

                if (!decimal.TryParse(DiscountedPriceText, out var discountedPrice) || discountedPrice <= 0) {
                    ErrorMessage = "Please enter a valid discounted price";
                    return;
                }

                if (discountedPrice >= originalPrice) {
                    ErrorMessage = "Discounted price must be less than original price";
                    return;
                }

                if (!int.TryParse(QuantityText, out var quantity) || quantity <= 0) {
                    ErrorMessage = "Please enter a valid quantity";
                    return;
                }

                var user = await _authService.GetCurrentUserAsync();
                if (user == null) {
                    ErrorMessage = "User not authenticated";
                    return;
                }

                var product = new Product {
                    MerchantId = user.Id,
                    MerchantName = user.Name,
                    Name = Name,
                    Description = Description,
                    CategoryId = SelectedCategory.Id,
                    CategoryName = SelectedCategory.Name,
                    OriginalPrice = originalPrice,
                    DiscountedPrice = discountedPrice,
                    Quantity = quantity,
                    ExpiryDate = ExpiryDate,
                    PickupStartTime = PickupStartTime,
                    PickupEndTime = PickupEndTime,
                    IsAvailable = true,
                    Latitude = user.Latitude,
                    Longitude = user.Longitude
                };

                await _databaseService.SaveProductAsync(product);

                await Shell.Current.DisplayAlert("Success", "Product added successfully!", "OK");
                await Shell.Current.GoToAsync("..");
            } catch (Exception ex) {
                ErrorMessage = $"Failed to add product: {ex.Message}";
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task CancelAsync() {
            await Shell.Current.GoToAsync("..");
        }
    }
}


