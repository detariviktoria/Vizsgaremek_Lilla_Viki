using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using System.Diagnostics;
using VizsgaAdminWpf.Models;

using System.Text.Json.Serialization;

namespace VizsgaAdminWpf.ApiServices
{
    public class ApiService
    {
        private readonly HttpClient httpClient = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:3000")
        };

        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };

       
        public async Task<List<AjandekDTO>> GetAjandekok()
        {
            try
            {
                var lista = await httpClient.GetFromJsonAsync<List<AjandekDTO>>("ajandekok", JsonOptions);
                return lista ?? new();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetAjandekok: {ex.Message}");
                return new();
            }
        }

        public async Task<(bool Success, string Message)> CreateAjandek(AjandekDTO ajandek)
        {
            try
            {
                var response = await httpClient.PostAsJsonAsync("ajandekok", ajandek, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return (false, error);
                }
                return (true, "Sikeres");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<(bool Success, string Message)> UpdateAjandek(int id, AjandekDTO ajandek)
        {
            try
            {
                var response = await httpClient.PutAsJsonAsync($"ajandekok/{id}", ajandek, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return (false, error);
                }
                return (true, "Sikeres");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<bool> DeleteAjandek(int id)
        {
            try
            {
                var response = await httpClient.DeleteAsync($"ajandekok/{id}");
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception in DeleteAjandek: {ex.Message}");
                return false;
            }
        }

        // Felhasználók
        public async Task<List<UserListDto>> GetUsers()
        {
            try
            {
                var lista = await httpClient.GetFromJsonAsync<List<UserListDto>>("users", JsonOptions);
                return lista ?? new();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetUsers: {ex.Message}");
                return new();
            }
        }

        public async Task<(bool Success, string Message)> UpdateUserAdmin(int userId, string name, string email, string? pwd)
        {
            try
            {
                var payload = new { name, email, password = pwd };
                var response = await httpClient.PutAsJsonAsync($"users/{userId}/admin", payload, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return (false, error);
                }
                return (true, "Sikeres");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        // Kép feltöltés
        public async Task<string?> UploadImage(string filePath)
        {
            try
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
            catch
            {
                return null;
            }
        }

        // Továbbiak
        public async Task<List<string>> GetAlkalmak() => await httpClient.GetFromJsonAsync<List<string>>("/alkalmak", JsonOptions) ?? new();
        public async Task<List<string>> GetStilusok() => await httpClient.GetFromJsonAsync<List<string>>("/stilusok", JsonOptions) ?? new();
        public async Task<List<string>> GetCelcsoportok() => await httpClient.GetFromJsonAsync<List<string>>("/celcsoportok", JsonOptions) ?? new();

        public async Task<List<AjandekDTO>> GetAjandekokByAlkalom(string alkalom) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/alkalom/{Uri.EscapeDataString(alkalom)}", JsonOptions) ?? new();
        public async Task<List<AjandekDTO>> GetAjandekokByStilus(string stilus) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/stilus/{Uri.EscapeDataString(stilus)}", JsonOptions) ?? new();
        public async Task<List<AjandekDTO>> GetAjandekokByCelcsoport(string celcsoport) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/celcsoport/{Uri.EscapeDataString(celcsoport)}", JsonOptions) ?? new();

        public async Task<LoginResponse?> Login(string username, string password)
        {
            var response = await httpClient.PostAsJsonAsync("/users/login", new { username, password }, JsonOptions);
            if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<LoginResponse>(JsonOptions);
            return null;
        }

        public async Task Logout() => await httpClient.PostAsync("/users/logout", null);
        public async Task<LoginResponse?> CheckSession() => await httpClient.GetFromJsonAsync<LoginResponse>("/users/check/session", JsonOptions);

        public async Task<User?> Register(string name, string email, string password)
        {
            var response = await httpClient.PostAsJsonAsync("/users", new { name, email, password }, JsonOptions);
            if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<User>(JsonOptions);
            return null;
        }

        public async Task<List<AjandekDTO>> GetKedvencek(int userId) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/kedvencek/{userId}", JsonOptions) ?? new();
        public async Task AddKedvenc(int userId, int ajandekId) => await httpClient.PostAsJsonAsync($"/kedvencek/{userId}", new { ajandek_id = ajandekId }, JsonOptions);
        public async Task RemoveKedvenc(int userId, int ajandekId) => await httpClient.DeleteAsync($"/kedvencek/{userId}/{ajandekId}");

        public async Task<List<AjandekDTO>> GetElozmenyek(int userId) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/elozmenyek/{userId}", JsonOptions) ?? new();
        public async Task AddElozmeny(int userId, int ajandekId) => await httpClient.PostAsJsonAsync($"/elozmenyek/{userId}", new { ajandek_id = ajandekId }, JsonOptions);

        public async Task SendInvite(string email, int userId) => await httpClient.PostAsJsonAsync("/invite", new { email, userId }, JsonOptions);
    }
}
