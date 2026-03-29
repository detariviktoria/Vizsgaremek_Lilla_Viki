﻿using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.Models
{
    public class UserListDto
    {
        [JsonPropertyName("user_id")]
        public int? UserId { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }
    }
}
