using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Diagnostics;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.ApiServices
{
    public class GiftApiService : BaseApiService
    {
        public async Task<List<GiftDto>> GetGifts()
        {
            try
            {
                var list = await HttpClient.GetFromJsonAsync<List<GiftDto>>("ajandekok", JsonOptions);
                return list ?? new();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetGifts: {ex.Message}");
                return new();
            }
        }

        public async Task<(bool Success, string Message)> CreateGift(GiftDto gift)
        {
            try
            {
                var response = await HttpClient.PostAsJsonAsync("ajandekok", gift, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await GetErrorMessage(response);
                    return (false, error);
                }
                return (true, "Gift created successfully.");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<(bool Success, string Message)> UpdateGift(int id, GiftDto gift)
        {
            try
            {
                var response = await HttpClient.PutAsJsonAsync($"ajandekok/{id}", gift, JsonOptions);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await GetErrorMessage(response);
                    return (false, error);
                }
                return (true, "Gift updated successfully.");
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<bool> DeleteGift(int id)
        {
            try
            {
                var response = await HttpClient.DeleteAsync($"ajandekok/{id}");
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception in DeleteGift: {ex.Message}");
                return false;
            }
        }

        public async Task<string?> UploadImage(string filePath)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
                var fileContent = new ByteArrayContent(bytes);
                
                string ext = System.IO.Path.GetExtension(filePath).ToLower();
                string mimeType = ext switch
                {
                    ".png" => "image/png",
                    ".webp" => "image/webp",
                    ".gif" => "image/gif",
                    _ => "image/jpeg"
                };

                fileContent.Headers.ContentType = new MediaTypeHeaderValue(mimeType);
                content.Add(fileContent, "image", System.IO.Path.GetFileName(filePath));

                var response = await HttpClient.PostAsync("/upload", content);
                if (!response.IsSuccessStatusCode)
                {
                    Debug.WriteLine($"Upload failed with status: {response.StatusCode}");
                    return null;
                }

                var json = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<UploadResponse>(json, JsonOptions);
                return result?.Filename;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception in UploadImage: {ex.Message}");
                return null;
            }
        }
    }
}
