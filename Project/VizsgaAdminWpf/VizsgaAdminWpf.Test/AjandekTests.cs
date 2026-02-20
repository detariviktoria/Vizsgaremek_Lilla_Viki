using NUnit.Framework;
using VizsgaAdminWpf;

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
            Assert.That(ajandek.leiras, Is.EqualTo("Vicces felirat"));
            Assert.That(ajandek.kategoria, Is.EqualTo("Ajándék"));
            Assert.That(ajandek.image_url, Is.EqualTo("kep.jpg"));
            Assert.That(ajandek.link_url, Is.EqualTo("http://pelda.hu"));
        });
    }

    [Test]
    public void Ajandek_EmptyStrings_AreAccepted()
    {
        var ajandek = new Ajandek
        {
            nev = "",
            leiras = "",
            kategoria = "",
            image_url = "",
            link_url = ""
        };

        Assert.Multiple(() =>
        {
            Assert.That(ajandek.nev, Is.EqualTo(""));
            Assert.That(ajandek.leiras, Is.EqualTo(""));
        });
    }
}
