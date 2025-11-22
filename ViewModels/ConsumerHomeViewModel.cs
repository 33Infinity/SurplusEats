using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;
using System.Collections.ObjectModel;

namespace SurplusEats.ViewModels {
    public partial class ConsumerHomeViewModel : BaseViewModel {
        private readonly IDatabaseService _databaseService;
        private readonly IAuthService _authService;

        [ObservableProperty]
        private ObservableCollection<Product> products = new();

        [ObservableProperty]
        private ObservableCollection<Category> categories = new();

        [ObservableProperty]
        private string searchText = string.Empty;

        [ObservableProperty]
        private Category? selectedCategory;

        [ObservableProperty]
        private User? currentUser;

        public ConsumerHomeViewModel(IDatabaseService databaseService, IAuthService authService) {
            _databaseService = databaseService;
            _authService = authService;
            Title = "Browse Products";
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
                
                var categoriesTask = _databaseService.GetCategoriesAsync();
                var productsTask = _databaseService.GetAllProductsAsync();

                await Task.WhenAll(categoriesTask, productsTask);

                Categories = new ObservableCollection<Category>(categoriesTask.Result);
                Products = new ObservableCollection<Product>(productsTask.Result);
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Failed to load data: {ex.Message}", "OK");
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task SearchAsync() {
            if (IsBusy) return;

            try {
                IsBusy = true;

                if (CurrentUser == null) return;

                var results = await _databaseService.SearchProductsAsync(
                    SearchText,
                    CurrentUser.Latitude,
                    CurrentUser.Longitude
                );

                Products = new ObservableCollection<Product>(results);
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Search failed: {ex.Message}", "OK");
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task FilterByCategoryAsync(Category category) {
            if (IsBusy) return;

            try {
                IsBusy = true;
                SelectedCategory = category;

                var results = await _databaseService.GetProductsByCategoryAsync(category.Id);
                Products = new ObservableCollection<Product>(results);
            } catch (Exception ex) {
                await Shell.Current.DisplayAlert("Error", $"Filter failed: {ex.Message}", "OK");
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task ViewProductDetailsAsync(Product product) {
            var navigationParameter = new Dictionary<string, object> {
                { "Product", product }
            };
            await Shell.Current.GoToAsync("ProductDetail", navigationParameter);
        }

        [RelayCommand]
        async Task ViewOrdersAsync() {
            await Shell.Current.GoToAsync("OrderHistory");
        }

        [RelayCommand]
        async Task LogoutAsync() {
            await _authService.SignOutAsync();
            await Shell.Current.GoToAsync("//Login");
        }
    }
}


