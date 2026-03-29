﻿using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.Models
{
    public class User
    {
        [JsonPropertyName("user_id")]
        public int? UserId { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("password")]
        public string? Password { get; set; }
    }
}
