using SurplusEats.ViewModels;

namespace SurplusEats.Views {
    public partial class ConsumerHomePage : ContentPage {
        private readonly ConsumerHomeViewModel _viewModel;

        public ConsumerHomePage(ConsumerHomeViewModel viewModel) {
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



