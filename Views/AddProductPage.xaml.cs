using SurplusEats.ViewModels;

namespace SurplusEats.Views {
    public partial class AddProductPage : ContentPage {
        private readonly AddProductViewModel _viewModel;

        public AddProductPage(AddProductViewModel viewModel) {
            InitializeComponent();
            _viewModel = viewModel;
            BindingContext = _viewModel;
        }

        protected override async void OnAppearing() {
            base.OnAppearing();
            await _viewModel.InitializeAsync();
        }
    }
}



