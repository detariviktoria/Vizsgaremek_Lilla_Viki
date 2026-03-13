using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
=======
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text.Json;
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa

namespace VizsgaAdminWpf
{
    public class ApiService
    {
<<<<<<< HEAD
        private static readonly HttpClient client = new HttpClient();
        private const string BaseUrl = "http://localhost:3000";

=======
        private readonly HttpClient httpClient = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:3000")
        };
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

<<<<<<< HEAD
=======
        // Ajándékok
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
        public async Task<List<AjandekDTO>> GetAjandekok()
        {
            try
            {
<<<<<<< HEAD
                var response = await client.GetAsync($"{BaseUrl}/ajandekok");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba az ajándékok lekérésekor: {ex.Message}", ex);
            }
        }

        public async Task CreateAjandek(AjandekDTO ajandek)
        {
            try
            {
                var json = JsonSerializer.Serialize(ajandek, JsonOptions);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync($"{BaseUrl}/ajandekok", content);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba az ajándék létrehozásakor: {ex.Message}", ex);
            }
        }

        public async Task UpdateAjandek(int id, AjandekDTO ajandek)
        {
            try
            {
                var json = JsonSerializer.Serialize(ajandek, JsonOptions);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PutAsync($"{BaseUrl}/ajandekok/{id}", content);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba az ajándék módosításakor: {ex.Message}", ex);
            }
        }

        public async Task DeleteAjandek(int id)
        {
            try
            {
                var response = await client.DeleteAsync($"{BaseUrl}/ajandekok/{id}");
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba az ajándék törlésekor: {ex.Message}", ex);
            }
        }

=======
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
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
        public async Task<string?> UploadImage(string filePath)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                using var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                var fileContent = new StreamContent(fileStream);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                content.Add(fileContent, "image", System.IO.Path.GetFileName(filePath));

<<<<<<< HEAD
                var response = await client.PostAsync($"{BaseUrl}/upload", content);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }

=======
                var response = await httpClient.PostAsync("/upload", content);
                if (!response.IsSuccessStatusCode)
                    return null;
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
                var json = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UploadResponse>(json, JsonOptions);
                return result?.filename;
            }
<<<<<<< HEAD
            catch (Exception ex)
            {
                throw new Exception($"Hiba a kép feltöltésekor: {ex.Message}", ex);
            }
        }

        // --- ÚJ: Alkalmak lekérdezése ---
        public async Task<List<string>> GetAlkalmak()
        {
            var response = await client.GetAsync($"{BaseUrl}/alkalmak");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Stílusok lekérdezése ---
        public async Task<List<string>> GetStilusok()
        {
            var response = await client.GetAsync($"{BaseUrl}/stilusok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Célcsoportok lekérdezése ---
        public async Task<List<string>> GetCelcsoportok()
        {
            var response = await client.GetAsync($"{BaseUrl}/celcsoportok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Ajándék szűrések ---
        public async Task<List<AjandekDTO>> GetAjandekokByAlkalom(string alkalom)
        {
            var response = await client.GetAsync($"{BaseUrl}/ajandekok/alkalom/{WebUtility.UrlEncode(alkalom)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task<List<AjandekDTO>> GetAjandekokByStilus(string stilus)
        {
            var response = await client.GetAsync($"{BaseUrl}/ajandekok/stilus/{WebUtility.UrlEncode(stilus)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task<List<AjandekDTO>> GetAjandekokByCelcsoport(string celcsoport)
        {
            var response = await client.GetAsync($"{BaseUrl}/ajandekok/celcsoport/{WebUtility.UrlEncode(celcsoport)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }

        // --- ÚJ: Felhasználói műveletek ---
        public async Task<LoginResponse?> Login(string username, string password)
        {
            var json = JsonSerializer.Serialize(new { username, password });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}/users/login", content);
            if (!response.IsSuccessStatusCode) return null;
            var respJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<LoginResponse>(respJson);
        }
        public async Task Logout()
        {
            var response = await client.PostAsync($"{BaseUrl}/users/logout", new StringContent("{}", Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
        }
        public async Task<LoginResponse?> CheckSession()
        {
            var response = await client.GetAsync($"{BaseUrl}/users/check/session");
            if (response.StatusCode == HttpStatusCode.Unauthorized) return null;
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<LoginResponse>(json);
        }
        public async Task<User?> Register(string name, string email, string password, string ajanlo_id = null)
        {
            var json = JsonSerializer.Serialize(new { name, email, password, ajanlo_id });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}/users", content);
            if (!response.IsSuccessStatusCode) return null;
            var respJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<User>(respJson);
        }

        // --- ÚJ: Kedvencek ---
        public async Task<List<AjandekDTO>> GetKedvencek(int userId)
        {
            var response = await client.GetAsync($"{BaseUrl}/kedvencek/{userId}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task AddKedvenc(int userId, int ajandekId)
        {
            var json = JsonSerializer.Serialize(new { ajandek_id = ajandekId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}/kedvencek/{userId}", content);
            response.EnsureSuccessStatusCode();
        }
        public async Task RemoveKedvenc(int userId, int ajandekId)
        {
            var response = await client.DeleteAsync($"{BaseUrl}/kedvencek/{userId}/{ajandekId}");
            response.EnsureSuccessStatusCode();
        }

        // --- ÚJ: Előzmények ---
        public async Task<List<AjandekDTO>> GetElozmenyek(int userId)
        {
            var response = await client.GetAsync($"{BaseUrl}/elozmenyek/{userId}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task AddElozmeny(int userId, int ajandekId)
        {
            var json = JsonSerializer.Serialize(new { ajandek_id = ajandekId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}/elozmenyek/{userId}", content);
            response.EnsureSuccessStatusCode();
        }

        // --- ÚJ: Meghívó küldése ---
        public async Task SendInvite(string email, int userId)
        {
            var json = JsonSerializer.Serialize(new { email, userId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}/invite", content);
            response.EnsureSuccessStatusCode();
        }
    }

    public class UploadResponse
    {
        public string? message { get; set; }
        public string? filename { get; set; }
    }

    public class AjandekDTO
    {
        public int? id { get; set; }
        public string? nev { get; set; }
        public string? leiras { get; set; }
        public int? ar { get; set; }
        public string? kategoria { get; set; }
        public string? image_url { get; set; }
        public string? link_url { get; set; }
    }

    public class User
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
    }
    public class LoginResponse
    {
        public string? username { get; set; }
        public int? userId { get; set; }
=======
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
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
    }
}
