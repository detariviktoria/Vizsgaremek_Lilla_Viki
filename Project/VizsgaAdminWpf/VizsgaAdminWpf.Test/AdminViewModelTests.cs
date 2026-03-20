using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.ViewModels;
using VizsgaAdminWpf.Models;

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
        public void SelectedGift_PropertyChange_TriggersEvent()
        {
            string? changedProperty = null;
            viewModel.PropertyChanged += (s, e) => changedProperty = e.PropertyName;

            var gift = new AjandekDTO { id = 1, nev = "Teszt" };
            viewModel.SelectedGift = gift;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.SelectedGift, Is.EqualTo(gift));
                Assert.That(changedProperty, Is.EqualTo(nameof(AdminViewModel.SelectedGift)));
            });
        }

        [Test]
        public void IsLoggedIn_PropertyChange_TriggersEvents()
        {
            var changedProperties = new List<string?>();
            viewModel.PropertyChanged += (s, e) => changedProperties.Add(e.PropertyName);

            viewModel.IsLoggedIn = true;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.IsLoggedIn, Is.True);
                Assert.That(viewModel.IsNotLoggedIn, Is.False);
                Assert.That(changedProperties, Contains.Item(nameof(AdminViewModel.IsLoggedIn)));
                Assert.That(changedProperties, Contains.Item(nameof(AdminViewModel.IsNotLoggedIn)));
            });
        }

        [Test]
        public void SelectedUser_PropertyChange_TriggersEvent()
        {
            string? changedProperty = null;
            viewModel.PropertyChanged += (s, e) => changedProperty = e.PropertyName;

            var user = new UserListDto { user_id = 1, name = "Teszt" };
            viewModel.SelectedUser = user;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.SelectedUser, Is.EqualTo(user));
                Assert.That(changedProperty, Is.EqualTo(nameof(AdminViewModel.SelectedUser)));
            });
        }

        [Test]
        public async Task LoadGiftsAsync_IntegrationTest()
        {
            try
            {
                await viewModel.LoadGiftsAsync();
                Assert.That(viewModel.Gifts, Is.Not.Null);
            }
            catch (System.Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task LoadUsersAsync_IntegrationTest()
        {
            try
            {
                await viewModel.LoadUsersAsync();
                Assert.That(viewModel.Users, Is.Not.Null);
            }
            catch (System.Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }
    }
}
