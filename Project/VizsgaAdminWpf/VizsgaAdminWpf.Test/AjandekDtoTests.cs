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
                kategoria = "tárgy",
                image_url = "kep.jpg",
                link_url = "http://pelda.hu"
            };

            Assert.Multiple(() =>
            {
                Assert.That(dto.id, Is.EqualTo(1));
                Assert.That(dto.nev, Is.EqualTo("Bögre"));
                Assert.That(dto.ar, Is.EqualTo(2500));
                Assert.That(dto.kategoria, Is.EqualTo("tárgy"));
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
    }
}
