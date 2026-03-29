﻿using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.Models
{
    public class UploadResponse
    {
        [JsonPropertyName("message")]
        public string? Message { get; set; }

        [JsonPropertyName("filename")]
        public string? Filename { get; set; }
    }
}
