using System.Threading.Tasks;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.Services;
using VizsgaAdminWpf.ViewModels;
using NUnit.Framework;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class AdminViewModelTests
    {
        private AdminViewModel viewModel;

        [SetUp]
        public void Setup()
        {
            viewModel = new AdminViewModel();
        }

        [Test]
        public async Task LoadGiftsAsync_FillsGiftsCollection()
        {
            await viewModel.LoadGiftsAsync();
            Assert.That(viewModel.Gifts, Is.Not.Null);
        }

        [Test]
        public async Task LoadUsersAsync_FillsUsersCollection()
        {
            await viewModel.LoadUsersAsync();
            Assert.That(viewModel.Users, Is.Not.Null);
        }
    }
}
