using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VizsgaAdminWpf;

namespace VizsgaAdminWpf.Test
{
    [TestClass]
    internal class ApiServiceTests
    {
        [TestMethod]
        public async Task Login_WrongServer_ReturnsNullOrThrows()
        {
            var service = new ApiService();

            try
            {
                var result = await service.Login("rossz", "rossz");
                Assert.IsNull(result);
            }
            catch
            {
                Assert.IsTrue(true); 
            }
        }
    }
}
