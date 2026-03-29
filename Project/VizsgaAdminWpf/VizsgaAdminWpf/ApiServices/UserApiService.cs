using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Diagnostics;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.ApiServices
{
    public class UserApiService : BaseApiService
    {
        public async Task<List<UserListDto>> GetUsers()
        {
            try
            {
                var list = await HttpClient.GetFromJsonAsync<List<UserListDto>>("users", JsonOptions);
                return list ?? new();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetUsers: {ex.Message}");
                return new();
            }
        }

        public async Task<(bool Success, string Message)> UpdateUserAdmin(int userId, string name, string email, string? password)
        {
            try
            {
                var payload = new { name, email, password };
                var response = await HttpClient.PutAsJsonAsync($"users/{userId}/admin", payload, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await GetErrorMessage(response);
                    return (false, error);
                }
                return (true, "User updated successfully.");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<LoginResponse?> Login(string username, string password)
        {
            var response = await HttpClient.PostAsJsonAsync("/users/login", new { username, password }, JsonOptions);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<LoginResponse>(JsonOptions);
                if (result != null && !string.IsNullOrEmpty(result.Token))
                {
                    Token = result.Token;
                    UpdateAuthHeader();
                }
                return result;
            }
            return null;
        }

        public async Task Logout()
        {
            await HttpClient.PostAsync("/users/logout", null);
            Token = null;
            UpdateAuthHeader();
        }
    }
}
