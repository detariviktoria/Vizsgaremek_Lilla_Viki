using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text.Json;

namespace VizsgaAdminWpf
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
        public async Task<List<AjandekDTO>> GetAjandekok()
        {
            try
            {
                var lista = await httpClient.GetFromJsonAsync<List<AjandekDTO>>("/ajandekok");
                return lista ?? new();
            }
            catch
            {
                return new();
            }
        }

        public async Task<bool> CreateAjandek(AjandekDTO ajandek)
        {
            try
            {
                var response = await httpClient.PostAsJsonAsync("/ajandekok", ajandek);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateAjandek(int id, AjandekDTO ajandek)
        {
            try
            {
                var response = await httpClient.PutAsJsonAsync($"/ajandekok/{id}", ajandek);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteAjandek(int id)
        {
            try
            {
                var response = await httpClient.DeleteAsync($"/ajandekok/{id}");
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        // Régi metódusok nevei a tesztekhez/kompatibilitáshoz
        public async Task<List<Ajandek>> LekerdezAjandekokAsync()
        {
            var dtos = await GetAjandekok();
            var list = new List<Ajandek>();
            foreach(var d in dtos) {
                list.Add(new Ajandek { 
                    id = d.id ?? 0, 
                    nev = d.nev, 
                    ar = d.ar ?? 0, 
                    leiras = d.leiras, 
                    kategoria = d.kategoria, 
                    image_url = d.image_url, 
                    link_url = d.link_url 
                });
            }
            return list;
        }

        public async Task<bool> HozzaadAjandekAsync(Ajandek ajandek)
        {
            return await CreateAjandek(new AjandekDTO { 
                nev = ajandek.nev, 
                ar = ajandek.ar, 
                leiras = ajandek.leiras, 
                kategoria = ajandek.kategoria, 
                image_url = ajandek.image_url, 
                link_url = ajandek.link_url 
            });
        }

        public async Task<bool> TorolAjandekAsync(int id) => await DeleteAjandek(id);
        public async Task<bool> ModositAjandekAsync(int id, Ajandek ajandek) 
        {
            return await UpdateAjandek(id, new AjandekDTO { 
                id = ajandek.id,
                nev = ajandek.nev, 
                ar = ajandek.ar, 
                leiras = ajandek.leiras, 
                kategoria = ajandek.kategoria, 
                image_url = ajandek.image_url, 
                link_url = ajandek.link_url 
            });
        }

        // Felhasználók
        public async Task<List<UserListDto>> GetUsers()
        {
            try
            {
                var lista = await httpClient.GetFromJsonAsync<List<UserListDto>>("/users");
                return lista ?? new();
            }
            catch
            {
                return new();
            }
        }

        public async Task<bool> UpdateUserAdmin(int userId, string name, string email, string? pwd)
        {
            try
            {
                var payload = new { name, email, password = pwd };
                var response = await httpClient.PutAsJsonAsync($"/users/{userId}/admin", payload);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
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

        // Továbbiak az ApiServiceTests.cs alapján
        public async Task<List<string>> GetAlkalmak() => await httpClient.GetFromJsonAsync<List<string>>("/alkalmak") ?? new();
        public async Task<List<string>> GetStilusok() => await httpClient.GetFromJsonAsync<List<string>>("/stilusok") ?? new();
        public async Task<List<string>> GetCelcsoportok() => await httpClient.GetFromJsonAsync<List<string>>("/celcsoportok") ?? new();

        public async Task<List<AjandekDTO>> GetAjandekokByAlkalom(string alkalom) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/alkalom/{Uri.EscapeDataString(alkalom)}") ?? new();
        public async Task<List<AjandekDTO>> GetAjandekokByStilus(string stilus) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/stilus/{Uri.EscapeDataString(stilus)}") ?? new();
        public async Task<List<AjandekDTO>> GetAjandekokByCelcsoport(string celcsoport) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/ajandekok/celcsoport/{Uri.EscapeDataString(celcsoport)}") ?? new();

        public async Task<LoginResponse?> Login(string username, string password)
        {
            var response = await httpClient.PostAsJsonAsync("/users/login", new { username, password });
            if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<LoginResponse>();
            return null;
        }

        public async Task Logout() => await httpClient.PostAsync("/users/logout", null);
        public async Task<LoginResponse?> CheckSession() => await httpClient.GetFromJsonAsync<LoginResponse>("/users/check/session");

        public async Task<User?> Register(string name, string email, string password)
        {
            var response = await httpClient.PostAsJsonAsync("/users", new { name, email, password });
            if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<User>();
            return null;
        }

        public async Task<List<AjandekDTO>> GetKedvencek(int userId) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/kedvencek/{userId}") ?? new();
        public async Task AddKedvenc(int userId, int ajandekId) => await httpClient.PostAsJsonAsync($"/kedvencek/{userId}", new { ajandek_id = ajandekId });
        public async Task RemoveKedvenc(int userId, int ajandekId) => await httpClient.DeleteAsync($"/kedvencek/{userId}/{ajandekId}");

        public async Task<List<AjandekDTO>> GetElozmenyek(int userId) => await httpClient.GetFromJsonAsync<List<AjandekDTO>>($"/elozmenyek/{userId}") ?? new();
        public async Task AddElozmeny(int userId, int ajandekId) => await httpClient.PostAsJsonAsync($"/elozmenyek/{userId}", new { ajandek_id = ajandekId });

        public async Task SendInvite(string email, int userId) => await httpClient.PostAsJsonAsync("/invite", new { email, userId });
    }
}
