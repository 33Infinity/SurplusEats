using SurplusEats.Views;

namespace SurplusEats {
    public partial class AppShell : Shell {
        public AppShell() {
            InitializeComponent();

            // Register routes for navigation
            Routing.RegisterRoute("Registration", typeof(RegistrationPage));
            Routing.RegisterRoute("ProductDetail", typeof(ProductDetailPage));
            Routing.RegisterRoute("AddProduct", typeof(AddProductPage));
            Routing.RegisterRoute("EditProduct", typeof(AddProductPage));
        }
    }
}
