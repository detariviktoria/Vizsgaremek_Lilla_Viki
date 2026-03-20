using System;
using NUnit.Framework;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UserListDtoTests
    {
        [Test]
        public void UserListDto_PropertySet_GetCorrectValues()
        {
            var dto = new UserListDto
            {
                user_id = 123,
                name = "Kovács János",
                email = "kovacs.janos@example.com"
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.user_id, Is.EqualTo(123));
                Assert.That(dto.name, Is.EqualTo("Kovács János"));
                Assert.That(dto.email, Is.EqualTo("kovacs.janos@example.com"));
            });
        }

        [Test]
        public void UserListDto_NullProperties_AreAccepted()
        {
            var dto = new UserListDto();

            Assert.Multiple(() =>
            {
                Assert.That(dto.user_id, Is.Null);
                Assert.That(dto.name, Is.Null);
                Assert.That(dto.email, Is.Null);
            });
        }
    }
}
