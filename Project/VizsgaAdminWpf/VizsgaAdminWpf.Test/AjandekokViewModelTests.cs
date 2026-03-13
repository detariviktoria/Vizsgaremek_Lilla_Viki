using System.Threading.Tasks;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.Services;
using VizsgaAdminWpf.ViewModels;
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
        public async Task AjandekokBetoltese_FillsCollection()
        {
            await viewModel.AjandekokBetoltese();
            Assert.That(viewModel.Ajandekok, Is.Not.Null);
        }
    }
}
