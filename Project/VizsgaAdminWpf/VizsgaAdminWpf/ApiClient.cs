using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace VizsgaAdminWpf
{
    public class ApiClient
    {
        private readonly HttpClient _httpClient;
        public string BaseUrl { get; set; } = "http://localhost:3000";

        public ApiClient()
        {
<<<<<<< HEAD
            _httpClient = new HttpClient();
            // A helyes URI: http://localhost:3000/
            _httpClient.BaseAddress = new Uri("http://localhost:3000/");
=======
            var handler = new SocketsHttpHandler
            {
                UseProxy = false
            };

            _httpClient = new HttpClient(handler)
            {
                BaseAddress = new Uri("http://localhost:3000/")
            };
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
        }

        public async Task<List<AjandekDTO>> GetAjandekokAsync()
        {
            var response = await _httpClient.GetAsync("ajandekok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
<<<<<<< HEAD
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json);
=======
            return JsonSerializer.Deserialize<List<AjandekDTO>>(json) ?? new List<AjandekDTO>();
>>>>>>> 748a7e6de3930400406bc2334a63185276cb7ffa
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var json = $"{{\"username\":\"{username}\",\"password\":\"{password}\"}}";
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("users/login", content);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }


    }
}
