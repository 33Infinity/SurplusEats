using Microsoft.Extensions.Logging;
using SurplusEats.Services;
using SurplusEats.ViewModels;
using SurplusEats.Views;

namespace SurplusEats {
    public static class MauiProgram {
        public static MauiApp CreateMauiApp() {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts => {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

#if DEBUG
    		builder.Logging.AddDebug();
#endif

            // Register Services
            builder.Services.AddSingleton<IDatabaseService, DatabaseService>();
            builder.Services.AddSingleton<IAuthService, AuthService>();
            builder.Services.AddSingleton<IPaymentService, PaymentService>();

            // Register ViewModels
            builder.Services.AddTransient<LoginViewModel>();
            builder.Services.AddTransient<RegistrationViewModel>();
            builder.Services.AddTransient<ConsumerHomeViewModel>();
            builder.Services.AddTransient<MerchantDashboardViewModel>();
            builder.Services.AddTransient<ProductDetailViewModel>();
            builder.Services.AddTransient<AddProductViewModel>();

            // Register Views
            builder.Services.AddTransient<LoginPage>();
            builder.Services.AddTransient<RegistrationPage>();
            builder.Services.AddTransient<ConsumerHomePage>();
            builder.Services.AddTransient<MerchantDashboardPage>();
            builder.Services.AddTransient<ProductDetailPage>();
            builder.Services.AddTransient<AddProductPage>();

            return builder.Build();
        }
    }
}
