using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace VizsgaAdmin
{
    public class ApiService
    {
        private static readonly HttpClient client = new HttpClient();
        private const string BaseUrl = "http://localhost:3000";

        public async Task<List<AjandekDTO>> GetAjandekok()
        {
            var response = await client.GetAsync($"{BaseUrl}/ajandekok");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var serializer = new JavaScriptSerializer();
            return serializer.Deserialize<List<AjandekDTO>>(json);
        }

        public async Task DeleteAjandek(int id)

        {

            var response = await client.DeleteAsync($"{BaseUrl}/ajandekok/{id}");

            response.EnsureSuccessStatusCode();

        }



        public async Task CreateAjandek(AjandekDTO ajandek)

        {

            var serializer = new JavaScriptSerializer();

            var json = serializer.Serialize(ajandek);

            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{BaseUrl}/ajandekok", content);

            response.EnsureSuccessStatusCode();

        }



        public async Task UpdateAjandek(int id, AjandekDTO ajandek)

        {

            var serializer = new JavaScriptSerializer();

            var json = serializer.Serialize(ajandek);

            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await client.PutAsync($"{BaseUrl}/ajandekok/{id}", content);

            response.EnsureSuccessStatusCode();

        }

    }



    public class AjandekDTO

    {

        public int id { get; set; }

        public string nev { get; set; }

        public string leiras { get; set; }

        public int ar { get; set; }

        public string kategoria { get; set; }

        public string image_url { get; set; }

        public string link_url { get; set; }

    }

}