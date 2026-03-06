using System.Collections.Generic;
using System.Threading.Tasks;
using VizsgaAdminWpf;
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
        public async Task LekerdezAjandekokAsync_ReturnsList()
        {
            var result = await apiService.LekerdezAjandekokAsync();
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<Ajandek>>());
        }

        [Test]
        public async Task HozzaadAjandekAsync_ReturnsBool()
        {
            var ajandek = new Ajandek { nev = "Teszt", ar = 1000, kategoria = "tárgy" };
            var siker = await apiService.HozzaadAjandekAsync(ajandek);
            Assert.That(siker, Is.TypeOf<bool>());
        }

        [Test]
        public async Task TorolAjandekAsync_ReturnsBool()
        {
            var siker = await apiService.TorolAjandekAsync(1);
            Assert.That(siker, Is.TypeOf<bool>());
        }

        [Test]
        public async Task ModositAjandekAsync_ReturnsBool()
        {
            var ajandek = new Ajandek { nev = "Módosított", ar = 2000, kategoria = "tárgy" };
            var siker = await apiService.ModositAjandekAsync(1, ajandek);
            Assert.That(siker, Is.TypeOf<bool>());
        }
    }
}
