using Newtonsoft.Json;

namespace SurplusEats.Models {
    public enum OrderStatus {
        Pending,
        Confirmed,
        ReadyForPickup,
        Completed,
        Cancelled
    }

    public class Order {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("consumerId")]
        public string ConsumerId { get; set; } = string.Empty;

        [JsonProperty("consumerName")]
        public string ConsumerName { get; set; } = string.Empty;

        [JsonProperty("merchantId")]
        public string MerchantId { get; set; } = string.Empty;

        [JsonProperty("merchantName")]
        public string MerchantName { get; set; } = string.Empty;

        [JsonProperty("productId")]
        public string ProductId { get; set; } = string.Empty;

        [JsonProperty("productName")]
        public string ProductName { get; set; } = string.Empty;

        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("pricePerItem")]
        public decimal PricePerItem { get; set; }

        [JsonProperty("subtotal")]
        public decimal Subtotal { get; set; }

        [JsonProperty("platformFee")]
        public decimal PlatformFee { get; set; }

        [JsonProperty("totalAmount")]
        public decimal TotalAmount { get; set; }

        [JsonProperty("status")]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        [JsonProperty("orderDate")]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [JsonProperty("pickupTime")]
        public DateTime PickupTime { get; set; }

        [JsonProperty("completedAt")]
        public DateTime? CompletedAt { get; set; }
    }
}


