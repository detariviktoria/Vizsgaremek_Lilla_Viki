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
                UserId = 123,
                Name = "Kovács János",
                Email = "kovacs.janos@example.com"
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.UserId, Is.EqualTo(123));
                Assert.That(dto.Name, Is.EqualTo("Kovács János"));
                Assert.That(dto.Email, Is.EqualTo("kovacs.janos@example.com"));
            });
        }

        [Test]
        public void UserListDto_NullProperties_AreAccepted()
        {
            var dto = new UserListDto();

            Assert.Multiple(() =>
            {
                Assert.That(dto.UserId, Is.Null);
                Assert.That(dto.Name, Is.Null);
                Assert.That(dto.Email, Is.Null);
            });
        }
    }
}
