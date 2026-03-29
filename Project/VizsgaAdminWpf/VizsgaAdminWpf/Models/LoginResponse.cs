﻿using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.Models
{
    public class LoginResponse
    {
        [JsonPropertyName("username")]
        public string? Username { get; set; }

        [JsonPropertyName("userId")]
        public int? UserId { get; set; }

        [JsonPropertyName("token")]
        public string? Token { get; set; }

        [JsonPropertyName("isAdmin")]
        public bool? IsAdmin { get; set; }
    }
}
