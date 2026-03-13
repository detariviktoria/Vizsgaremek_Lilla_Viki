using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text.Json;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Services
{
    public class ApiService
    {
        private readonly HttpClient httpClient = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:3000")
        };
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        // Ajándékok
        public async Task<List<AjandekDTO>> GetAjandekokAsync()
        {
            var lista = await httpClient.GetFromJsonAsync<List<AjandekDTO>>("/ajandekok");
            return lista ?? new();
        }

        public async Task<bool> CreateAjandekAsync(AjandekDTO ajandek)
        {
            var response = await httpClient.PostAsJsonAsync("/ajandekok", ajandek);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateAjandekAsync(int id, AjandekDTO ajandek)
        {
            var response = await httpClient.PutAsJsonAsync($"/ajandekok/{id}", ajandek);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteAjandekAsync(int id)
        {
            var response = await httpClient.DeleteAsync($"/ajandekok/{id}");
            return response.IsSuccessStatusCode;
        }

        // Felhasználók
        public async Task<List<UserListDto>> GetUsersAsync()
        {
            var lista = await httpClient.GetFromJsonAsync<List<UserListDto>>("/users");
            return lista ?? new();
        }

        public async Task<bool> UpdateUserAdminAsync(int userId, string name, string email, string? pwd)
        {
            var payload = new { name, email, password = pwd };
            var response = await httpClient.PutAsJsonAsync($"/users/{userId}/admin", payload);
            return response.IsSuccessStatusCode;
        }

        // Kép feltöltés
        public async Task<string?> UploadImageAsync(string filePath)
        {
            using var content = new MultipartFormDataContent();
            using var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read);
            var fileContent = new StreamContent(fileStream);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
            content.Add(fileContent, "image", System.IO.Path.GetFileName(filePath));

            var response = await httpClient.PostAsync("/upload", content);
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<UploadResponse>(json, JsonOptions);
            return result?.filename;
        }

        public async Task<List<string>> GetAlkalmakAsync()
        {
            try { return await httpClient.GetFromJsonAsync<List<string>>("/alkalmak") ?? new(); }
            catch { return new(); }
        }

        public async Task<List<string>> GetStilusokAsync()
        {
            try { return await httpClient.GetFromJsonAsync<List<string>>("/stilusok") ?? new(); }
            catch { return new(); }
        }

        public async Task<List<string>> GetCelcsoportokAsync()
        {
            try { return await httpClient.GetFromJsonAsync<List<string>>("/celcsoportok") ?? new(); }
            catch { return new(); }
        }

        public async Task<List<AjandekDTO>> GetAjandekokByAlkalomAsync(string alkalom)
        {
            try { return await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/alkalom/{Uri.EscapeDataString(alkalom)}") ?? new(); }
            catch { return new(); }
        }

        public async Task<List<AjandekDTO>> GetAjandekokByStilusAsync(string stilus)
        {
            try { return await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/stilus/{Uri.EscapeDataString(stilus)}") ?? new(); }
            catch { return new(); }
        }

        public async Task<List<AjandekDTO>> GetAjandekokByCelcsoportAsync(string celcsoport)
        {
            try { return await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/celcsoport/{Uri.EscapeDataString(celcsoport)}") ?? new(); }
            catch { return new(); }
        }

        public async Task<LoginResponse?> LoginAsync(string username, string password)
        {
            try
            {
                var response = await httpClient.PostAsJsonAsync("/users/login", new { username, password });
                if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<LoginResponse>();
                return null;
            }
            catch { return null; }
        }

        public async Task LogoutAsync()
        {
            try { await httpClient.PostAsync("/users/logout", null); }
            catch { }
        }

        public async Task<LoginResponse?> CheckSessionAsync()
        {
            try { return await httpClient.GetFromJsonAsync<LoginResponse>("/users/check/session"); }
            catch { return null; }
        }

        public async Task<User?> RegisterAsync(string name, string email, string password)
        {
            try
            {
                var response = await httpClient.PostAsJsonAsync("/users", new { name, email, password });
                if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<User>();
                return null;
            }
            catch { return null; }
        }

        public async Task<List<AjandekDTO>> GetKedvencekAsync(int userId)
        {
            try { return await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/kedvencek/{userId}") ?? new(); }
            catch { return new(); }
        }

        public async Task AddKedvencAsync(int userId, int ajandekId)
        {
            try { await httpClient.PostAsJsonAsync($"/kedvencek/{userId}", new { ajandek_id = ajandekId }); }
            catch { }
        }

        public async Task RemoveKedvencAsync(int userId, int ajandekId)
        {
            try { await httpClient.DeleteAsync($"/kedvencek/{userId}/{ajandekId}"); }
            catch { }
        }

        public async Task<List<AjandekDTO>> GetElozmenyekAsync(int userId)
        {
            try { return await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/elozmenyek/{userId}") ?? new(); }
            catch { return new(); }
        }

        public async Task AddElozmenyAsync(int userId, int ajandekId)
        {
            try { await httpClient.PostAsJsonAsync($"/elozmenyek/{userId}", new { ajandek_id = ajandekId }); }
            catch { }
        }

        public async Task SendInviteAsync(string email, int userId)
        {
            try { await httpClient.PostAsJsonAsync("/invite", new { email, userId }); }
            catch { }
        }
    }
}
