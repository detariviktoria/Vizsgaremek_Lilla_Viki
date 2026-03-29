using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.Models
{
    public class GiftDto
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("nev")]
        public string? Name { get; set; }

        [JsonPropertyName("leiras")]
        public string? Description { get; set; }

        [JsonPropertyName("ar")]
        public int? Price { get; set; }

        [JsonPropertyName("kategoria")]
        public string? Category { get; set; }

        [JsonPropertyName("image_url")]
        public string? ImageUrl { get; set; }

        [JsonPropertyName("link_url")]
        public string? LinkUrl { get; set; }
    }
}
