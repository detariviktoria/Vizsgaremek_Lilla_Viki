﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using VizsgaAdminWpf.Models;

namespace VizsgaAdminWpf.Test
{
    [TestFixture]
    public class LoginResponseTests
    {
        [Test]
        public void LoginResponse_PropertySet_GetCorrectValues()
        {
            var loginResponse = new LoginResponse
            {
                Username = "Viktória",
                UserId = 1,
                Token = "abc.123.def",
                IsAdmin = true
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.Username, Is.EqualTo("Viktória"));
                Assert.That(loginResponse.UserId, Is.EqualTo(1));
                Assert.That(loginResponse.Token, Is.EqualTo("abc.123.def"));
                Assert.That(loginResponse.IsAdmin, Is.True);
            });
        }

        [Test]
        public void LoginResponse_NullProperties_AreAccepted()
        {
            var loginResponse = new LoginResponse
            {
                Username = null,
                UserId = null
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.Username, Is.Null);
                Assert.That(loginResponse.UserId, Is.Null);
            });
        }

        [Test]
        public void LoginResponse_OnlyUsernameSet_UserIdIsNull()
        {
            var loginResponse = new LoginResponse
            {
                Username = "János"
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.Username, Is.EqualTo("János"));
                Assert.That(loginResponse.UserId, Is.Null);
            });
        }

        [Test]
        public void LoginResponse_OnlyUserIdSet_UsernameIsNull()
        {
            var loginResponse = new LoginResponse
            {
                UserId = 42
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.UserId, Is.EqualTo(42));
                Assert.That(loginResponse.Username, Is.Null);
            });
        }
    }
}
