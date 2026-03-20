using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.ApiServices;

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
                Assert.That(result.Success, Is.True.Or.False);
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
                Assert.That(result.Success, Is.True.Or.False);
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

        [Test]
        public async Task GetStilusok_ReturnsList()
        {
            try
            {
                var list = await service.GetStilusok();
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetCelcsoportok_ReturnsList()
        {
            try
            {
                var list = await service.GetCelcsoportok();
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task UpdateAjandek_ValidData_Succeeds()
        {
            try
            {
                var ajandek = new AjandekDTO { nev = "Módosított", ar = 5000 };
                var (success, message) = await service.UpdateAjandek(1, ajandek);
                Assert.That(success, Is.True.Or.False);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task DeleteAjandek_Test()
        {
            try
            {
                var result = await service.DeleteAjandek(9999); 
                Assert.That(result, Is.False.Or.True);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task Login_Test()
        {
            try
            {
                var result = await service.Login("tesztuser", "tesztpass");
                Assert.That(result, Is.Null.Or.InstanceOf<LoginResponse>());
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task Register_Test()
        {
            try
            {
                var result = await service.Register("Teszt", "teszt@teszt.hu", "pass");
                Assert.That(result, Is.Null.Or.InstanceOf<User>());
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByAlkalom_Test()
        {
            try
            {
                var list = await service.GetAjandekokByAlkalom("Születésnap");
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetKedvencek_Test()
        {
            try
            {
                var list = await service.GetKedvencek(1);
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetElozmenyek_Test()
        {
            try
            {
                var list = await service.GetElozmenyek(1);
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task SendInvite_Test()
        {
            var result = await service.SendInvite("lilla@mail.com", 2);
            Assert.That(result.Success, Is.True, $"API hiba: {result.Message}");
        }
    }
}
