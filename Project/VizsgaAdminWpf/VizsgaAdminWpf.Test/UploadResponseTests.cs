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
                message = "Sikeres feltöltés",
                filename = "test_image.jpg"
            };

            Assert.Multiple(() =>
            {
                Assert.That(response.message, Is.EqualTo("Sikeres feltöltés"));
                Assert.That(response.filename, Is.EqualTo("test_image.jpg"));
            });
        }

        [Test]
        public void UploadResponse_NullProperties_AreAccepted()
        {
            var response = new UploadResponse();

            Assert.Multiple(() =>
            {
                Assert.That(response.message, Is.Null);
                Assert.That(response.filename, Is.Null);
            });
        }
    }
}
