using Newtonsoft.Json;

namespace SurplusEats.Models {
    public class Category {
        [JsonProperty("id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("iconUrl")]
        public string IconUrl { get; set; } = string.Empty;
    }
}


