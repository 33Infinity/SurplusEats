using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SurplusEats.Services;
using SurplusEats.Models;

namespace SurplusEats.ViewModels {
    public partial class RegistrationViewModel : BaseViewModel {
        private readonly IAuthService _authService;

        [ObservableProperty]
        private string name = string.Empty;

        [ObservableProperty]
        private string email = string.Empty;

        [ObservableProperty]
        private string password = string.Empty;

        [ObservableProperty]
        private string confirmPassword = string.Empty;

        [ObservableProperty]
        private string phone = string.Empty;

        [ObservableProperty]
        private string address = string.Empty;

        [ObservableProperty]
        private string city = string.Empty;

        [ObservableProperty]
        private string state = string.Empty;

        [ObservableProperty]
        private string zipCode = string.Empty;

        [ObservableProperty]
        private bool isConsumer = true;

        [ObservableProperty]
        private bool isMerchant;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        public RegistrationViewModel(IAuthService authService) {
            _authService = authService;
            Title = "Register";
        }

        [RelayCommand]
        async Task RegisterAsync() {
            if (IsBusy) return;

            try {
                IsBusy = true;
                ErrorMessage = string.Empty;

                // Validation
                if (string.IsNullOrWhiteSpace(Name) || string.IsNullOrWhiteSpace(Email) || 
                    string.IsNullOrWhiteSpace(Password) || string.IsNullOrWhiteSpace(Phone)) {
                    ErrorMessage = "Please fill in all required fields";
                    return;
                }

                if (Password != ConfirmPassword) {
                    ErrorMessage = "Passwords do not match";
                    return;
                }

                if (Password.Length < 6) {
                    ErrorMessage = "Password must be at least 6 characters";
                    return;
                }

                // Create user object
                var user = new User {
                    Name = Name,
                    Email = Email,
                    Phone = Phone,
                    Address = Address,
                    City = City,
                    State = State,
                    ZipCode = ZipCode,
                    UserType = IsConsumer ? UserType.Consumer : UserType.Merchant,
                    // In a real app, you would get the actual location coordinates
                    Latitude = 0,
                    Longitude = 0
                };

                // Register user
                var success = await _authService.SignUpAsync(Email, Password, user);

                if (success) {
                    // Navigate based on user type
                    if (user.UserType == UserType.Consumer) {
                        await Shell.Current.GoToAsync("//ConsumerHome");
                    } else {
                        await Shell.Current.GoToAsync("//MerchantDashboard");
                    }
                } else {
                    ErrorMessage = "Registration failed. Email may already be in use.";
                }
            } catch (Exception ex) {
                ErrorMessage = $"Registration failed: {ex.Message}";
            } finally {
                IsBusy = false;
            }
        }

        [RelayCommand]
        async Task NavigateBackAsync() {
            await Shell.Current.GoToAsync("..");
        }

        partial void OnIsConsumerChanged(bool value) {
            if (value && IsMerchant) {
                IsMerchant = false;
            } else if (!value && !IsMerchant) {
                // Ensure at least one option remains selected
                IsConsumer = true;
            }
        }

        partial void OnIsMerchantChanged(bool value) {
            if (value && IsConsumer) {
                IsConsumer = false;
            } else if (!value && !IsConsumer) {
                IsMerchant = true;
            }
        }
    }
}


