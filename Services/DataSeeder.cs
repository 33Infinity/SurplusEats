using SurplusEats.Models;

namespace SurplusEats.Services {
    public class DataSeeder {
        private readonly IDatabaseService _databaseService;

        public DataSeeder(IDatabaseService databaseService) {
            _databaseService = databaseService;
        }

        public async Task SeedCategoriesAsync() {
            try {
                var existingCategories = await _databaseService.GetCategoriesAsync();
                
                if (existingCategories.Count > 0) {
                    return; // Categories already seeded
                }

                var categories = new List<Category> {
                    new Category {
                        Id = "bakery",
                        Name = "Bakery",
                        Description = "Fresh baked goods, bread, pastries",
                        IconUrl = "🥖"
                    },
                    new Category {
                        Id = "fruits_vegetables",
                        Name = "Fruits & Vegetables",
                        Description = "Fresh produce",
                        IconUrl = "🥗"
                    },
                    new Category {
                        Id = "prepared_meals",
                        Name = "Prepared Meals",
                        Description = "Ready-to-eat meals",
                        IconUrl = "🍱"
                    },
                    new Category {
                        Id = "dairy",
                        Name = "Dairy",
                        Description = "Milk, cheese, yogurt",
                        IconUrl = "🧀"
                    },
                    new Category {
                        Id = "meat_seafood",
                        Name = "Meat & Seafood",
                        Description = "Fresh meat and seafood",
                        IconUrl = "🥩"
                    },
                    new Category {
                        Id = "beverages",
                        Name = "Beverages",
                        Description = "Drinks and beverages",
                        IconUrl = "🥤"
                    },
                    new Category {
                        Id = "desserts",
                        Name = "Desserts",
                        Description = "Sweet treats",
                        IconUrl = "🍰"
                    },
                    new Category {
                        Id = "other",
                        Name = "Other",
                        Description = "Miscellaneous items",
                        IconUrl = "📦"
                    }
                };

                // Note: For seeding, you would need to manually add these to Firebase
                // or implement a SaveCategory method in the database service
                System.Diagnostics.Debug.WriteLine("Categories ready to seed. Implement SaveCategory in DatabaseService for automatic seeding.");
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine($"Error seeding categories: {ex.Message}");
            }
        }
    }
}



