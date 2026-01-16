using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestClass]
    internal class AjandekTests
    {
        [TestMethod]
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

            Assert.AreEqual(1, ajandek.id);
            Assert.AreEqual("Bögre", ajandek.nev);
            Assert.AreEqual(2500, ajandek.ar);
        }
    }
}
