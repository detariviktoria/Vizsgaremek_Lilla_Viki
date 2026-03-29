using System;
using NUnit.Framework;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UploadResponseTests
    {
        [Test]
        public void UploadResponse_PropertySet_GetCorrectValues()
        {
            var response = new UploadResponse
            {
                Message = "Sikeres feltöltés",
                Filename = "test_image.jpg"
            };

            Assert.Multiple(() =>
            {
                Assert.That(response.Message, Is.EqualTo("Sikeres feltöltés"));
                Assert.That(response.Filename, Is.EqualTo("test_image.jpg"));
            });
        }

        [Test]
        public void UploadResponse_NullProperties_AreAccepted()
        {
            var response = new UploadResponse();

            Assert.Multiple(() =>
            {
                Assert.That(response.Message, Is.Null);
                Assert.That(response.Filename, Is.Null);
            });
        }
    }
}
