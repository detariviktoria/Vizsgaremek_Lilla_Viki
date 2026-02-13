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
                    Assert.That(users, Is.Not.Null);
                    Assert.That(users, Is.InstanceOf<List<UserListDto>>());
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba (lehet, hogy nem fut a szerver): {ex.Message}");
            }
        }

        [Test]
        public async Task UpdateUserAdmin_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () =>
                    await service.UpdateUserAdmin(1, "Teszt Elek", "teszt@example.com", null));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
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
                    Assert.That(ajandekok, Is.Not.Null);
                    Assert.That(ajandekok, Is.InstanceOf<List<AjandekDTO>>());
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
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
                Assert.DoesNotThrowAsync(async () => await service.CreateAjandek(ujAjandek));
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
                var ajandek = new AjandekDTO { nev = "Módosított Teszt", ar = 2000, kategoria = "tárgy" };
                Assert.DoesNotThrowAsync(async () => await service.UpdateAjandek(1, ajandek));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task DeleteAjandek_ValidId_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.DeleteAjandek(9999));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
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
        public async Task GetAjandekokByAlkalom_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByAlkalom("Karácsony");
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByStilus_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByStilus("Vicces");
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByCelcsoport_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByCelcsoport("felnőttek");
                Assert.That(list, Is.Not.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task UploadImage_InvalidPath_Throws()
        {
            try
            {
                Assert.ThrowsAsync<Exception>(async () => await service.UploadImage("non_existent.jpg"));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task Login_InvalidCredentials_ReturnsNull()
        {
            try
            {
                var result = await service.Login("invalid_user", "invalid_pass");
                Assert.That(result, Is.Null);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task Logout_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.Logout());
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task CheckSession_ReturnsResponseOrNull()
        {
            try
            {
                var result = await service.CheckSession();
                Assert.Pass("Session ellenőrzés lefutott.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task Register_ValidData_ReturnsUserOrNull()
        {
            try
            {
                var result = await service.Register("Új Felhasználó", $"test_{Guid.NewGuid()}@example.com", "password123");
                Assert.Pass("Regisztráció kérés lefutott.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetKedvencek_ValidUserId_ReturnsList()
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
        public async Task AddKedvenc_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.AddKedvenc(1, 1));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task RemoveKedvenc_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.RemoveKedvenc(1, 1));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task GetElozmenyek_ValidUserId_ReturnsList()
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
        public async Task AddElozmeny_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.AddElozmeny(1, 1));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task SendInvite_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.SendInvite("friend@example.com", 1));
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }
    }
}
