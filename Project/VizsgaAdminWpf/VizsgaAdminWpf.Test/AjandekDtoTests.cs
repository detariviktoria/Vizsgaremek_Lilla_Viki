using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf;
namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class AjandekDtoTests
    {
        [Test]
        public void AjandekDTO_PropertySet_GetCorrectValues()
        {
            var dto = new AjandekDTO
            {
                id = 1,
                nev = "Bögre",
                leiras = "Vicces felirat",
                ar = 2500,
                kategoria = "Ajándék",
                image_url = "kep.jpg",
                link_url = "http://pelda.hu"
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.id, Is.EqualTo(1));
                Assert.That(dto.nev, Is.EqualTo("Bögre"));
                Assert.That(dto.ar, Is.EqualTo(2500));
                Assert.That(dto.kategoria, Is.EqualTo("Ajándék"));
            });
        }

        [Test]
        public void AjandekDTO_AllNullValues_AreAccepted()
        {
            var dto = new AjandekDTO();

            Assert.Multiple(() =>
            {
                Assert.That(dto.id, Is.Null);
                Assert.That(dto.nev, Is.Null);
                Assert.That(dto.leiras, Is.Null);
                Assert.That(dto.ar, Is.Null);
                Assert.That(dto.kategoria, Is.Null);
                Assert.That(dto.image_url, Is.Null);
                Assert.That(dto.link_url, Is.Null);
            });
        }

        [Test]
        public void AjandekDTO_PartialPropertiesSet_OtherPropertiesNull()
        {
            var dto = new AjandekDTO
            {
                nev = "Póló",
                ar = 3500
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.nev, Is.EqualTo("Póló"));
                Assert.That(dto.ar, Is.EqualTo(3500));
                Assert.That(dto.id, Is.Null);
                Assert.That(dto.leiras, Is.Null);
            });
        }

        [Test]
        public void AjandekDTO_EmptyStringProperties_AreAccepted()
        {
            var dto = new AjandekDTO
            {
                nev = "",
                leiras = "",
                kategoria = "",
                image_url = "",
                link_url = ""
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.nev, Is.EqualTo(""));
                Assert.That(dto.leiras, Is.EqualTo(""));
                Assert.That(dto.kategoria, Is.EqualTo(""));
            });
        }
    }
}
