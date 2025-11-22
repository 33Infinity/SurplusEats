using Newtonsoft.Json;

namespace SurplusEats.Models {
    public class Product {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("merchantId")]
        public string MerchantId { get; set; } = string.Empty;

        [JsonProperty("merchantName")]
        public string MerchantName { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("categoryId")]
        public string CategoryId { get; set; } = string.Empty;

        [JsonProperty("categoryName")]
        public string CategoryName { get; set; } = string.Empty;

        [JsonProperty("originalPrice")]
        public decimal OriginalPrice { get; set; }

        [JsonProperty("discountedPrice")]
        public decimal DiscountedPrice { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; } = string.Empty;

        [JsonProperty("expiryDate")]
        public DateTime ExpiryDate { get; set; }

        [JsonProperty("pickupStartTime")]
        public TimeSpan PickupStartTime { get; set; }

        [JsonProperty("pickupEndTime")]
        public TimeSpan PickupEndTime { get; set; }

        [JsonProperty("isAvailable")]
        public bool IsAvailable { get; set; } = true;

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonProperty("latitude")]
        public double Latitude { get; set; }

        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        public decimal DiscountPercentage => 
            OriginalPrice > 0 ? ((OriginalPrice - DiscountedPrice) / OriginalPrice) * 100 : 0;
    }
}


