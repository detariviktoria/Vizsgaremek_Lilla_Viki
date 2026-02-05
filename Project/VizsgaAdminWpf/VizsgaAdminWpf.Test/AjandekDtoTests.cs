using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test;

[TestFixture]
public class AjandekDtoTests
{
    [Test]
    public void AjandekDTO_AllowNullValues()
    {
        var dto = new AjandekDTO();

        Assert.That(dto.id, Is.Null);
        Assert.That(dto.nev, Is.Null);
        Assert.That(dto.ar, Is.Null);
    }
}
