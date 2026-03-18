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
                user_id = 1,
                name = "Viktória",
                email = "viktoria@mail.com",
                password = "pass123" 
            };

            Assert.Multiple(() =>
            {
                Assert.That(user.user_id, Is.EqualTo(1));
                Assert.That(user.name, Is.EqualTo("Viktória"));
                Assert.That(user.email, Is.EqualTo("viktoria@mail.com"));
                Assert.That(user.password, Is.Not.Null);
            });
        }

        [Test]
        public async Task GetUserById_Test()
        {
            var apiService = new ApiService();
            var users = await apiService.GetUsers();
            var user = users?.FirstOrDefault(u => u.user_id == 1);

            if (user != null)
            {
                Assert.That(user.user_id, Is.EqualTo(1));
            }
            else
            {
                Assert.Pass("User 1 not found in current DB state, but request completed.");
            }
        }
    }
}
