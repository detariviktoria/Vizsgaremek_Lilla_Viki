using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace VizsgaAdminWpf.ApiServices
{
    public abstract class BaseApiService
    {
        protected static readonly HttpClient HttpClient = new()
        {
            BaseAddress = new Uri("http://localhost:3000")
        };

        protected static string? Token;

        protected static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };

        protected static void UpdateAuthHeader()
        {
            HttpClient.DefaultRequestHeaders.Authorization = 
                !string.IsNullOrEmpty(Token) ? new AuthenticationHeaderValue("Bearer", Token) : null;
        }

        protected async Task<string> GetErrorMessage(HttpResponseMessage response)
        {
            try
            {
                var content = await response.Content.ReadAsStringAsync();
                using var json = JsonDocument.Parse(content);
                if (json.RootElement.TryGetProperty("message", out var msg)) return msg.GetString() ?? content;
                if (json.RootElement.TryGetProperty("error", out var err)) return err.GetString() ?? content;
                return content;
            }
            catch
            {
                return response.ReasonPhrase ?? "Hiba történt.";
            }
        }
    }
}
