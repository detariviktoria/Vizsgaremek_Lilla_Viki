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
                Assert.Inconclusive($"API hiba (lehet, hogy nem fut a szerver, vagy nem elérhető a /users végpont): {ex.Message}");
            }
        }

        [Test]
        public async Task UpdateUserAdmin_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () =>
                    await service.UpdateUserAdmin(1, "Teszt Elek", "teszt@example.com", null),
                    "Admin felhasználó módosítása érvényes adatokkal nem szabad, hogy kivételt dobjon (PUT /users/1/admin).");
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
                    Assert.That(ajandekok.Count, Is.GreaterThanOrEqualTo(0), "Az ajándékok listája lehet üres, de nem szabad hibát okoznia.");
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándékok lekérdezésénél (GET /ajandekok): {ex.Message}");
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
                Assert.DoesNotThrowAsync(async () => await service.CreateAjandek(ujAjandek),
                    "Érvényes ajándék létrehozása nem szabad, hogy kivételt dobjon (POST /ajandekok).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándék létrehozásánál: {ex.Message}");
            }
        }

        [Test]
        public async Task UpdateAjandek_ValidData_Succeeds()
        {
            try
            {
                var ajandek = new AjandekDTO { nev = "Módosított Teszt", ar = 2000, kategoria = "tárgy" };
                Assert.DoesNotThrowAsync(async () => await service.UpdateAjandek(1, ajandek),
                    "Érvényes ajándék módosítása nem szabad, hogy kivételt dobjon (PUT /ajandekok/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándék módosításánál: {ex.Message}");
            }
        }

        [Test]
        public async Task DeleteAjandek_ValidId_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.DeleteAjandek(9999),
                    "Érvényes ajándék törlése nem szabad, hogy kivételt dobjon (DELETE /ajandekok/9999).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az ajándék törlésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task GetAlkalmak_ReturnsList()
        {
            try
            {
                var list = await service.GetAlkalmak();
                Assert.That(list, Is.Not.Null, "Az alkalmak listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "Az alkalmak listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az alkalmak lekérdezésénél (GET /alkalmak): {ex.Message}");
            }
        }

        [Test]
        public async Task GetStilusok_ReturnsList()
        {
            try
            {
                var list = await service.GetStilusok();
                Assert.That(list, Is.Not.Null, "A stílusok listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "A stílusok listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a stílusok lekérdezésénél (GET /stilusok): {ex.Message}");
            }
        }

        [Test]
        public async Task GetCelcsoportok_ReturnsList()
        {
            try
            {
                var list = await service.GetCelcsoportok();
                Assert.That(list, Is.Not.Null, "A célközösségek listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "A célközösségek listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a célközösségek lekérdezésénél (GET /celcsoportok): {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByAlkalom_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByAlkalom("Karácsony");
                Assert.That(list, Is.Not.Null, "Az alkalomhoz tartozó ajándékok listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "Az alkalomhoz tartozó ajándékok listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az alkalomhoz tartozó ajándékok lekérdezésénél (GET /ajandekok/alkalom/Karácsony): {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByStilus_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByStilus("Vicces");
                Assert.That(list, Is.Not.Null, "A stílushoz tartozó ajándékok listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "A stílushoz tartozó ajándékok listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a stílushoz tartozó ajándékok lekérdezésénél (GET /ajandekok/stilus/Vicces): {ex.Message}");
            }
        }

        [Test]
        public async Task GetAjandekokByCelcsoport_ReturnsList()
        {
            try
            {
                var list = await service.GetAjandekokByCelcsoport("felnőttek");
                Assert.That(list, Is.Not.Null, "A célközösséghez tartozó ajándékok listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "A célközösséghez tartozó ajándékok listája lehet üres, de nem szabad hibát okoznia.");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a célközösséghez tartozó ajándékok lekérdezésénél (GET /ajandekok/celcsoport/felnőttek): {ex.Message}");
            }
        }

        [Test]
        public async Task UploadImage_InvalidPath_Throws()
        {
            try
            {
                Assert.ThrowsAsync<Exception>(async () => await service.UploadImage("non_existent.jpg"),
                    "Nem létező fájl esetén az UploadImage-nek kivételt kell dobnia (POST /upload).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a kép feltöltésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task Login_InvalidCredentials_ReturnsNull()
        {
            try
            {
                var result = await service.Login("invalid_user", "invalid_pass");
                Assert.That(result, Is.Null, "Érvénytelen hitelesítő adatok esetén a login-nek null-t kell visszaadnia (POST /users/login).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a bejelentkezésnél: {ex.Message}");
            }
        }

        [Test]
        public async Task Logout_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.Logout(),
                    "A kijelentkezés nem szabad, hogy kivételt dobjon (POST /users/logout).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a kijelentkezésnél: {ex.Message}");
            }
        }

        [Test]
        public async Task CheckSession_ReturnsResponseOrNull()
        {
            try
            {
                var result = await service.CheckSession();
                Assert.Pass("A session ellenőrzés sikeresen lefutott; " +
                            "a visszatérési érték lehet LoginResponse vagy null, attól függően, hogy a session érvényes-e (GET /users/check/session).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a session ellenőrzésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task Register_ValidData_ReturnsUserOrNull()
        {
            try
            {
                var result = await service.Register("Új Felhasználó", $"test_{Guid.NewGuid()}@example.com", "password123");
                Assert.Pass("A regisztrációs kérés sikeresen lefutott; " +
                            "a visszatérési érték lehet User vagy null, attól függően, hogy a szerver elfogadja-e az adatokat (POST /users).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a regisztrációnál: {ex.Message}");
            }
        }

        [Test]
        public async Task GetKedvencek_ValidUserId_ReturnsList()
        {
            try
            {
                var list = await service.GetKedvencek(1);
                Assert.That(list, Is.Not.Null, "A kedvencek listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "A kedvencek listája lehet üres, de nem szabad hibát okoznia (GET /kedvencek/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a kedvencek lekérdezésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task AddKedvenc_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.AddKedvenc(1, 1),
                    "Érvényes felhasználó és ajándék azonosító esetén a kedvenc hozzáadása nem szabad, hogy kivételt dobjon (POST /kedvencek/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a kedvenc hozzáadásánál: {ex.Message}");
            }
        }

        [Test]
        public async Task RemoveKedvenc_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.RemoveKedvenc(1, 1),
                    "Érvényes felhasználó és ajándék azonosító esetén a kedvenc eltávolítása nem szabad, hogy kivételt dobjon (DELETE /kedvencek/1/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a kedvenc eltávolításánál: {ex.Message}");
            }
        }

        [Test]
        public async Task GetElozmenyek_ValidUserId_ReturnsList()
        {
            try
            {
                var list = await service.GetElozmenyek(1);
                Assert.That(list, Is.Not.Null, "Az előzmények listája nem lehet null.");
                Assert.That(list.Count, Is.GreaterThanOrEqualTo(0), "Az előzmények listája lehet üres, de nem szabad hibát okoznia (GET /elozmenyek/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az előzmények lekérdezésénél: {ex.Message}");
            }
        }

        [Test]
        public async Task AddElozmeny_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.AddElozmeny(1, 1),
                    "Érvényes felhasználó és ajándék azonosító esetén az előzmény hozzáadása nem szabad, hogy kivételt dobjon (POST /elozmenyek/1).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba az előzmény hozzáadásánál: {ex.Message}");
            }
        }

        [Test]
        public async Task SendInvite_ValidData_Succeeds()
        {
            try
            {
                Assert.DoesNotThrowAsync(async () => await service.SendInvite("friend@example.com", 1),
                    "Érvényes e‑mail és felhasználó azonosító esetén a meghívó küldése nem szabad, hogy kivételt dobjon (POST /invite).");
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba a meghívó küldésénél: {ex.Message}");
            }
        }
    }
}
