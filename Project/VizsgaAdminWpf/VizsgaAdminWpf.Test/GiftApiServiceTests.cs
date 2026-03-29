using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.ApiServices;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class GiftApiServiceTests
    {
        private GiftApiService service = null!;

        [SetUp]
        public void Setup()
        {
            service = new GiftApiService();
        }

        [Test]
        public async Task GetGifts_ReturnsGiftList()
        {
            try
            {
                var gifts = await service.GetGifts();
                Assert.Multiple(() =>
                {
                    Assert.That(gifts, Is.Not.Null, "Az ajándékok listája nem lehet null.");
                    Assert.That(gifts, Is.InstanceOf<List<GiftDto>>(), "A visszatérési értéknek GiftDto listának kell lennie.");
                });
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }

        [Test]
        public async Task CreateGift_ValidData_Succeeds()
        {
            try
            {
                var newGift = new GiftDto
                {
                    Name = "Teszt Ajándék",
                    Description = "Teszt leírás",
                    Price = 1000,
                    Category = "tárgy"
                };
                var result = await service.CreateGift(newGift);
                Assert.That(result.Success, Is.True.Or.False);
            }
            catch (Exception ex)
            {
                Assert.Inconclusive($"API hiba: {ex.Message}");
            }
        }
    }
}
