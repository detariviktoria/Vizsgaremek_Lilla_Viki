using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class GiftDtoTests
    {
        [Test]
        public void GiftDto_PropertySet_GetCorrectValues()
        {
            var dto = new GiftDto
            {
                Id = 1,
                Name = "Bögre",
                Description = "Vicces felirat",
                Price = 2500,
                Category = "tárgy",
                ImageUrl = "kep.jpg",
                LinkUrl = "http://pelda.hu"
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.Id, Is.EqualTo(1));
                Assert.That(dto.Name, Is.EqualTo("Bögre"));
                Assert.That(dto.Price, Is.EqualTo(2500));
                Assert.That(dto.Category, Is.EqualTo("tárgy"));
            });
        }

        [Test]
        public void GiftDto_AllNullValues_AreAccepted()
        {
            var dto = new GiftDto();

            Assert.Multiple(() =>
            {
                Assert.That(dto.Id, Is.Null);
                Assert.That(dto.Name, Is.Null);
                Assert.That(dto.Description, Is.Null);
                Assert.That(dto.Price, Is.Null);
                Assert.That(dto.Category, Is.Null);
                Assert.That(dto.ImageUrl, Is.Null);
                Assert.That(dto.LinkUrl, Is.Null);
            });
        }
    }
}
