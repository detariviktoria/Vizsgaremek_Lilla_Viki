using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test;

[TestFixture]
public class AjandekTests
{
    [Test]
    public void Ajandek_PropertySet_GetCorrectValues()
    {
        var ajandek = new Ajandek
        {
            id = 1,
            nev = "Bögre",
            ar = 2500,
            leiras = "Vicces felirat",
            kategoria = "Ajándék",
            image_url = "kep.jpg",
            link_url = "http://pelda.hu"
        };

        Assert.Multiple(() =>
        {
            Assert.That(ajandek.id, Is.EqualTo(1));
            Assert.That(ajandek.nev, Is.EqualTo("Bögre"));
            Assert.That(ajandek.ar, Is.EqualTo(2500));
        });
    }
}
