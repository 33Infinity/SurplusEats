using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;

namespace SurplusEats.ViewModels {
    public partial class LoginViewModel : BaseViewModel {
        private readonly IAuthService _authService;

        [ObservableProperty]
        private string email = string.Empty;

        [ObservableProperty]
        private string password = string.Empty;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        public LoginViewModel(IAuthService authService) {
            _authService = authService;
            Title = "Login";
        }

        [RelayCommand]
        async Task LoginAsync() {
            if (IsBusy) return;

            try {
                IsBusy = true;
                ErrorMessage = string.Empty;

                if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password)) {
                    ErrorMessage = "Please enter both email and password";
                    return;
                }

                var user = await _authService.SignInAsync(Email, Password);

                if (user != null) {
                    // Navigate based on user type
                    if (user.UserType == UserType.Consumer) {
                        await Shell.Current.GoToAsync("//ConsumerHome");
                    } else {
                        await Shell.Current.GoToAsync("//MerchantDashboard");
                    }
                } else {
                    ErrorMessage = "Invalid email or password";
                }
            } catch (Exception ex) {
                ErrorMessage = $"Login failed: {ex.Message}";
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task NavigateToRegisterAsync() {
            await Shell.Current.GoToAsync("Registration");
        }
    }
}


