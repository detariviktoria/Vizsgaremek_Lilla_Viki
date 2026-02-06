using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class LoginResponseTests
    {
        [Test]
        public void LoginResponse()
        {
            var loginResponse = new LoginResponse
            {
                username = "Viktória",
                userId = 1
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.username, Is.EqualTo("Viktória"));
                Assert.That(loginResponse.userId, Is.EqualTo(1));
            });
        }

       

        [Test]
        public void LoginResponse_ReturnsViktoriaData()
        {
            var loginResponse = new LoginResponse
            {
                username = "Viktória",
                userId = 1
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.userId, Is.EqualTo(1));
                Assert.That(loginResponse.username, Is.EqualTo("Viktória"));
            });
        }
    }
}
