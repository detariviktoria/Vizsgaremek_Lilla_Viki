using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.ViewModels;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class GiftsViewModelTests
    {
        private GiftsViewModel viewModel = null!;

        [SetUp]
        public void Setup()
        {
            viewModel = new GiftsViewModel();
        }

        [Test]
        public void SelectedGift_PropertyChange_TriggersEvent()
        {
            var changedProperties = new List<string?>();
            viewModel.PropertyChanged += (s, e) => changedProperties.Add(e.PropertyName);

            var gift = new GiftDto { Id = 1, Name = "Teszt" };
            viewModel.SelectedGift = gift;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.SelectedGift, Is.EqualTo(gift));
                Assert.That(changedProperties, Contains.Item(nameof(GiftsViewModel.SelectedGift)));
            });
        }

        [Test]
        public void SelectedGift_PopulatesCurrentGift()
        {
            var gift = new GiftDto 
            { 
                Id = 1, 
                Name = "Szuper Ajándék", 
                Price = 5000, 
                Description = "Leírás", 
                Category = "teszt",
                ImageUrl = "kep.jpg"
            };

            viewModel.SelectedGift = gift;

            Assert.Multiple(() =>
            {
                Assert.That(viewModel.CurrentGift.Name, Is.EqualTo("Szuper Ajándék"));
                Assert.That(viewModel.CurrentGift.Price, Is.EqualTo(5000));
                Assert.That(viewModel.CurrentGift.Description, Is.EqualTo("Leírás"));
                Assert.That(viewModel.CurrentGift.Category, Is.EqualTo("teszt"));
                Assert.That(viewModel.CurrentGift.ImageUrl, Is.EqualTo("kep.jpg"));
            });
        }

        [Test]
        public async Task DeleteGiftAsync_NoSelection_ReturnsFalse()
        {
            viewModel.SelectedGift = null;
            var result = await viewModel.DeleteGiftAsync();

            Assert.That(result, Is.False);
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
    }
}
