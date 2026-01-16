using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestClass]
    internal class AjandekDtoTests
    {
        [TestMethod]
        public void AjandekDTO_AllowNullValues()
        {
            var dto = new AjandekDTO();

            Assert.IsNull(dto.id);
            Assert.IsNull(dto.nev);
            Assert.IsNull(dto.ar);
        }
    }
}
