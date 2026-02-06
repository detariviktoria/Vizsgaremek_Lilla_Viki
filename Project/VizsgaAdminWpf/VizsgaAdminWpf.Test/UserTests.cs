using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UserTests
    {
        [Test]
        public void User_PropertySet_GetCorrectValues()
        {
            var user = new User
            {
                id = 1,
                name = "Viktória",
                email = "viktoria@mail.com",
                password = "pass123" 
            };

            Assert.Multiple(() =>
            {
                Assert.That(user.id, Is.EqualTo(1));
                Assert.That(user.name, Is.EqualTo("Viktória"));
                Assert.That(user.email, Is.EqualTo("viktoria@mail.com"));
                Assert.That(user.password, Is.Not.Null);
                Assert.That(user.password, Is.Not.Empty);
            });
        }

        [Test]
        public void GetUserById_Id1()
        {
            var apiService = new ApiService();
            var users = apiService.GetUsers().Result;
            var viktoria = users.FirstOrDefault(u => u.user_id == 1);

            Assert.Multiple(() =>
            {
                Assert.That(viktoria, Is.Not.Null, "Viktória user nem található!");
                Assert.That(viktoria.user_id, Is.EqualTo(1));
                Assert.That(viktoria.name, Is.EqualTo("Viktória"));
                Assert.That(viktoria.email, Is.EqualTo("viktoria@mail.com"));
            });
        }


        
    }
}
