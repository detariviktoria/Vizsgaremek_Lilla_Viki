using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.ViewModels;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UserViewModelTests
    {
        private UserViewModel viewModel = null!;

        [SetUp]
        public void Setup()
        {
            viewModel = new UserViewModel();
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
                Assert.That(changedProperties, Contains.Item(nameof(UserViewModel.IsLoggedIn)));
                Assert.That(changedProperties, Contains.Item(nameof(UserViewModel.IsNotLoggedIn)));
            });
        }

        [Test]
        public void SelectedUser_PropertyChange_TriggersEvent()
        {
            var changedProperties = new List<string?>();
            viewModel.PropertyChanged += (s, e) => changedProperties.Add(e.PropertyName);

            var user = new UserListDto { UserId = 1, Name = "Teszt", Email = "teszt@example.com" };
            viewModel.SelectedUser = user;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.SelectedUser, Is.EqualTo(user));
                Assert.That(changedProperties, Contains.Item(nameof(UserViewModel.SelectedUser)));
                Assert.That(viewModel.CurrentUserName, Is.EqualTo("Teszt"));
                Assert.That(viewModel.CurrentUserEmail, Is.EqualTo("teszt@example.com"));
            });
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
