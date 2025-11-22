using SurplusEats.ViewModels;

namespace SurplusEats.Views {
    public partial class MerchantDashboardPage : ContentPage {
        private readonly MerchantDashboardViewModel _viewModel;

        public MerchantDashboardPage(MerchantDashboardViewModel viewModel) {
            InitializeComponent();
            _viewModel = viewModel;
            BindingContext = _viewModel;
        }

        protected override async void OnAppearing() {
            base.OnAppearing();
            await _viewModel.InitializeAsync();
        }

        private void OnProductsTabClicked(object sender, EventArgs e) {
            ProductsTab.BackgroundColor = Color.FromArgb("#2E7D32");
            ProductsTab.TextColor = Colors.White;
            OrdersTab.BackgroundColor = Colors.White;
            OrdersTab.TextColor = Color.FromArgb("#2E7D32");
            
            ProductsContent.IsVisible = true;
            OrdersContent.IsVisible = false;
        }

        private void OnOrdersTabClicked(object sender, EventArgs e) {
            OrdersTab.BackgroundColor = Color.FromArgb("#2E7D32");
            OrdersTab.TextColor = Colors.White;
            ProductsTab.BackgroundColor = Colors.White;
            ProductsTab.TextColor = Color.FromArgb("#2E7D32");
            
            ProductsContent.IsVisible = false;
            OrdersContent.IsVisible = true;
        }
    }
}



