//using System;
//using System.Threading.Tasks;
//using NUnit.Framework;
//using VizsgaAdminWpf;

//namespace VizsgaAdminWpf.Test;

//[TestFixture]
//public class ApiServiceTests
//{
//    private ApiService service;

//    [SetUp]
//    public void Setup()
//    {
//        service = new ApiService();
//    }

//    [Test]
//    public async Task Login_InvalidCredentials_ReturnsNullOrThrows()
//    {
//        var result = await service.Login("rossz", "rossz");
//        Assert.That(result, Is.Null, "Hibás belépési adatok esetén null‑t várunk.");
//    }

//    [Test]
//    public async Task GetUsers_ReturnsUserList()
//    {
//        var users = await service.GetUsers();

//        Assert.Multiple(() =>
//        {
//            Assert.That(users, Is.Not.Null);
//            Assert.That(users, Is.InstanceOf<List<UserListDto>>());
//            Assert.That(users.Count, Is.GreaterThanOrEqualTo(0));
//        });
//    }

//    [Test]
//    public async Task UpdateUserAdmin_ValidData_Succeeds()
//    {
//        int userId = 1;
//        string name = "Teszt Elek";
//        string email = "teszt@example.com";

//        Assert.DoesNotThrowAsync(async () =>
//            await service.UpdateUserAdmin(userId, name, email, null));
//    }

//    [Test]
//    public async Task GetAjandekok_ReturnsAjandekList()
//    {
//        var ajandekok = await service.GetAjandekok();

//        Assert.Multiple(() =>
//        {
//            Assert.That(ajandekok, Is.Not.Null);
//            Assert.That(ajandekok, Is.InstanceOf<List<AjandekDTO>>());
//            Assert.That(ajandekok.Count, Is.GreaterThanOrEqualTo(0));
//        });
//    }
//}
