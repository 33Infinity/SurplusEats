using Newtonsoft.Json;

namespace SurplusEats.Models {
    public class User {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("email")]
        public string Email { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonProperty("userType")]
        public UserType UserType { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; } = string.Empty;

        [JsonProperty("city")]
        public string City { get; set; } = string.Empty;

        [JsonProperty("state")]
        public string State { get; set; } = string.Empty;

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; } = string.Empty;

        [JsonProperty("latitude")]
        public double Latitude { get; set; }

        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonProperty("isActive")]
        public bool IsActive { get; set; } = true;
    }
}


