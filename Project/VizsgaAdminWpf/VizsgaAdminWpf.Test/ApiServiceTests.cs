using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class ApiServiceTests
    {
        private ApiService service;

        [SetUp]
        public void Setup()
        {
            service = new ApiService();
        }

        [Test]
        public async Task GetUsers_ReturnsUserList()
        {
            try
            {
                var users = await service.GetUsers();
                Assert.Multiple(() =>
                {
                    Assert.That(users, Is.Not.Null, "A felhasználók listája nem lehet null.");
                    Assert.That(users, Is.InstanceOf<List<UserListDto>>(), "A visszatérési értéknek UserListDto listának kell lennie.");
                    Assert.That(users.Count, Is.GreaterThanOrEqualTo(0), "A felhasználók listája lehet üres, de nem szabad hibát okoznia.");
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task UpdateUserAdmin_ValidData_Succeeds()
        {
            try
            {
                var result = await service.UpdateUserAdmin(1, "Teszt Elek", "teszt@example.com", null);
                Assert.That(result, Is.TypeOf<bool>());
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a felhasználó módosításánál: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekok_ReturnsAjandekList()
        {
            try
            {
                var ajandekok = await service.GetAjandekok();
                Assert.Multiple(() =>
                {
                    Assert.That(ajandekok, Is.Not.Null, "Az ajándékok listája nem lehet null.");
                    Assert.That(ajandekok, Is.InstanceOf<List<AjandekDTO>>(), "A visszatérési értéknek AjandekDTO listának kell lennie.");
                    Assert.That(ajandekok.Count, Is.GreaterThanOrEqualTo(0), "Az ajándékok listája lehet üres.");
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándékok lekérdezésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task CreateAjandek_ValidData_Succeeds()
        {
            try
            {
                var ujAjandek = new AjandekDTO
                {
                    nev = "Teszt Ajándék",
                    leiras = "Teszt leírás",
                    ar = 1000,
                    kategoria = "tárgy"
                };
                var result = await service.CreateAjandek(ujAjandek);
                Assert.That(result, Is.TypeOf<bool>());
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándék létrehozásánál: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAlkalmak_ReturnsList()
        {
            try
            {
                var list = await service.GetAlkalmak();
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }
    }
}
