using System.Threading.Tasks;
using VizsgaAdminWpf;
using NUnit.Framework;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class AjandekokViewModelTests
    {
        private AjandekokViewModel viewModel;

        [SetUp]
        public void Setup()
        {
            viewModel = new AjandekokViewModel();
        }

        [Test]
        public async Task BetoltesAsync_FillsCollection()
        {
            await viewModel.BetoltesAsync();
            Assert.That(viewModel.Ajandekok, Is.Not.Null);
        }
    }
}
