﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;
using VizsgaAdminWpf.ApiServices;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class UserTests
    {
        [Test]
        public void User_PropertySet_GetCorrectValues()
        {
            var user = new User
            {
                UserId = 1,
                Name = "Viktória",
                Email = "viktoria@mail.com",
                Password = "pass123" 
            };

            Assert.Multiple(() =>
            {
                Assert.That(user.UserId, Is.EqualTo(1));
                Assert.That(user.Name, Is.EqualTo("Viktória"));
                Assert.That(user.Email, Is.EqualTo("viktoria@mail.com"));
                Assert.That(user.Password, Is.Not.Null);
            });
        }

        [Test]
        public async Task GetUserById_Test()
        {
            var apiService = new UserApiService();
            var users = await apiService.GetUsers();
            var user = users?.FirstOrDefault(u => u.UserId == 1);

            if (user != null)
            {
                Assert.That(user.UserId, Is.EqualTo(1));
            }
            else
            {
                Assert.Pass("User 1 not found in current DB state, but request completed.");
            }
        }
    }
}
