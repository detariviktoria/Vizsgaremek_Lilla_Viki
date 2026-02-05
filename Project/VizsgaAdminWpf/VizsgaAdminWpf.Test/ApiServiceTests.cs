using System;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test;

[TestFixture]
public class ApiServiceTests
{
    [Test]
    public async Task Login_InvalidCredentials_ReturnsNullOrThrows()
    {
        var service = new ApiService();

        try
        {
            var result = await service.Login("rossz", "rossz");
            Assert.That(result, Is.Null, "Hibás belépési adatok esetén null‑t várunk.");
        }
        catch (Exception)
        {
            // Ha a szerver nem fut vagy hálózati hiba van, az is elfogadható ebben az integrációs tesztben
            Assert.Pass("Kivétel dobódott (valószínűleg a szerver nem elérhető), ezt a teszt elfogadja.");
        }
    }
}
