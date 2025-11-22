using SurplusEats.ViewModels;

namespace SurplusEats.Views {
    public partial class ProductDetailPage : ContentPage {
        public ProductDetailPage(ProductDetailViewModel viewModel) {
            InitializeComponent();
            BindingContext = viewModel;
        }
    }
}



