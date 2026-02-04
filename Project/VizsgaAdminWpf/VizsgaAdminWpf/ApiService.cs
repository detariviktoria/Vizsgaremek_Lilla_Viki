using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace VizsgaAdminWpf
{
    public class ApiService
    {
        private static readonly HttpClient client;
        // Közös BaseAddress beállítása, így a hívásoknál csak relatív útvonalat használunk
        private const string BaseUrl = "http://localhost:3000/";

        static ApiService()
        {
            // Saját HttpClient, proxy nélkül, hogy a rendszer proxy/beállítások ne zavarjanak bele
            var handler = new SocketsHttpHandler
            {
                UseProxy = false
            };

            client = new HttpClient(handler)
            {
                BaseAddress = new Uri(BaseUrl)
            };
        }

        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public async Task<List<UserListDto>> GetUsers()
        {
            try
            {
                var response = await client.GetAsync("users");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<UserListDto>>(json, JsonOptions) ?? new List<UserListDto>();
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba a felhasználók lekérésekor: {ex.Message}", ex);
            }
        }

        public async Task UpdateUserAdmin(int id, string name, string email, string? password)
        {
            try
            {
                var payload = new Dictionary<string, object?> { ["name"] = name, ["email"] = email };
                if (!string.IsNullOrWhiteSpace(password)) payload["password"] = password;
                var json = JsonSerializer.Serialize(payload, JsonOptions);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PutAsync($"users/{id}/admin", content);
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba a felhasználó módosításakor: {ex.Message}", ex);
            }
        }

        public async Task<List<AjandekDTO>> GetAjandekok()
        {
            try
            {
                var response = await client.GetAsync("ajandekok");
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
                var response = await client.PostAsync("ajandekok", content);
                
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
                var response = await client.PutAsync($"ajandekok/{id}", content);
                
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
                var response = await client.DeleteAsync($"ajandekok/{id}");
                
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

        public async Task<string?> UploadImage(string filePath)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                using var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                var fileContent = new StreamContent(fileStream);
                fileContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                content.Add(fileContent, "image", System.IO.Path.GetFileName(filePath));

                var response = await client.PostAsync("upload", content);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API hiba: {response.StatusCode} - {errorContent}");
                }

                var json = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UploadResponse>(json, JsonOptions);
                return result?.filename;
            }
            catch (Exception ex)
            {
                throw new Exception($"Hiba a kép feltöltésekor: {ex.Message}", ex);
            }
        }

        // --- ÚJ: Alkalmak lekérdezése ---
        public async Task<List<string>> GetAlkalmak()
        {
            var response = await client.GetAsync("alkalmak");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Stílusok lekérdezése ---
        public async Task<List<string>> GetStilusok()
        {
            var response = await client.GetAsync("stilusok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Célcsoportok lekérdezése ---
        public async Task<List<string>> GetCelcsoportok()
        {
            var response = await client.GetAsync("celcsoportok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }

        // --- ÚJ: Ajándék szűrések ---
        public async Task<List<AjandekDTO>> GetAjandekokByAlkalom(string alkalom)
        {
            var response = await client.GetAsync($"ajandekok/alkalom/{WebUtility.UrlEncode(alkalom)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task<List<AjandekDTO>> GetAjandekokByStilus(string stilus)
        {
            var response = await client.GetAsync($"ajandekok/stilus/{WebUtility.UrlEncode(stilus)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task<List<AjandekDTO>> GetAjandekokByCelcsoport(string celcsoport)
        {
            var response = await client.GetAsync($"ajandekok/celcsoport/{WebUtility.UrlEncode(celcsoport)}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }

        // --- ÚJ: Felhasználói műveletek ---
        public async Task<LoginResponse?> Login(string username, string password)
        {
            var json = JsonSerializer.Serialize(new { username, password });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("users/login", content);
            if (!response.IsSuccessStatusCode) return null;
            var respJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<LoginResponse>(respJson);
        }
        public async Task Logout()
        {
            var response = await client.PostAsync("users/logout", new StringContent("{}", Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
        }
        public async Task<LoginResponse?> CheckSession()
        {
            var response = await client.GetAsync("users/check/session");
            if (response.StatusCode == HttpStatusCode.Unauthorized) return null;
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<LoginResponse>(json);
        }
        public async Task<User?> Register(string name, string email, string password, string? ajanlo_id = null)
        {
            var json = JsonSerializer.Serialize(new { name, email, password, ajanlo_id });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("users", content);
            if (!response.IsSuccessStatusCode) return null;
            var respJson = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<User>(respJson);
        }

        // --- ÚJ: Kedvencek ---
        public async Task<List<AjandekDTO>> GetKedvencek(int userId)
        {
            var response = await client.GetAsync($"kedvencek/{userId}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task AddKedvenc(int userId, int ajandekId)
        {
            var json = JsonSerializer.Serialize(new { ajandek_id = ajandekId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"kedvencek/{userId}", content);
            response.EnsureSuccessStatusCode();
        }
        public async Task RemoveKedvenc(int userId, int ajandekId)
        {
            var response = await client.DeleteAsync($"kedvencek/{userId}/{ajandekId}");
            response.EnsureSuccessStatusCode();
        }

        // --- ÚJ: Előzmények ---
        public async Task<List<AjandekDTO>> GetElozmenyek(int userId)
        {
            var response = await client.GetAsync($"elozmenyek/{userId}");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json, JsonOptions) ?? new List<AjandekDTO>();
        }
        public async Task AddElozmeny(int userId, int ajandekId)
        {
            var json = JsonSerializer.Serialize(new { ajandek_id = ajandekId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"elozmenyek/{userId}", content);
            response.EnsureSuccessStatusCode();
        }

        // --- ÚJ: Meghívó küldése ---
        public async Task SendInvite(string email, int userId)
        {
            var json = JsonSerializer.Serialize(new { email, userId });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("invite", content);
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

    public class UserListDto
    {
        public int? user_id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
    }
    public class LoginResponse
    {
        public string? username { get; set; }
        public int? userId { get; set; }
    }
}
