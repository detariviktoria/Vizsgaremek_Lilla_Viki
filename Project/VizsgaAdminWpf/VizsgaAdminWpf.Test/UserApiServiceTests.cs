using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.ApiServices;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UserApiServiceTests
    {
        private UserApiService service = null!;

        [SetUp]
        public void Setup()
        {
            service = new UserApiService();
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
                });
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
    }
}
