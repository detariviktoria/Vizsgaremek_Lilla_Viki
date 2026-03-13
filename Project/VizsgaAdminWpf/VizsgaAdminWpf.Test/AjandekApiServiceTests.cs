using System.Collections.Generic;
using System.Threading.Tasks;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.Services;
using NUnit.Framework;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class AjandekApiServiceTests
    {
        private ApiService apiService;

        [SetUp]
        public void Setup()
        {
            apiService = new ApiService();
        }

        [Test]
        public async Task GetAjandekokAsync_ReturnsList()
        {
            var result = await apiService.GetAjandekokAsync();
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<AjandekDTO>>());
        }

        [Test]
        public async Task CreateAjandekAsync_ReturnsBool()
        {
            var ajandek = new AjandekDTO { nev = "Teszt", ar = 1000, kategoria = "tárgy" };
            var siker = await apiService.CreateAjandekAsync(ajandek);
            Assert.That(siker, Is.TypeOf<bool>());
        }

        [Test]
        public async Task DeleteAjandekAsync_ReturnsBool()
        {
            var siker = await apiService.DeleteAjandekAsync(1);
            Assert.That(siker, Is.TypeOf<bool>());
        }

        [Test]
        public async Task UpdateAjandekAsync_ReturnsBool()
        {
            var ajandek = new AjandekDTO { nev = "Módosított", ar = 2000, kategoria = "tárgy" };
            var siker = await apiService.UpdateAjandekAsync(1, ajandek);
            Assert.That(siker, Is.TypeOf<bool>());
        }
    }
}
