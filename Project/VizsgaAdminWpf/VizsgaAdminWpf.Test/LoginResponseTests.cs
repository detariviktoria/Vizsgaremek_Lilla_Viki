﻿﻿﻿using System;
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
                username = "Viktória",
                userId = 1,
                token = "abc.123.def",
                isAdmin = true
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.username, Is.EqualTo("Viktória"));
                Assert.That(loginResponse.userId, Is.EqualTo(1));
                Assert.That(loginResponse.token, Is.EqualTo("abc.123.def"));
                Assert.That(loginResponse.isAdmin, Is.True);
            });
        }

        [Test]
        public void LoginResponse_NullProperties_AreAccepted()
        {
            var loginResponse = new LoginResponse
            {
                username = null,
                userId = null
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.username, Is.Null);
                Assert.That(loginResponse.userId, Is.Null);
            });
        }

        [Test]
        public void LoginResponse_OnlyUsernameSet_UserIdIsNull()
        {
            var loginResponse = new LoginResponse
            {
                username = "János"
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.username, Is.EqualTo("János"));
                Assert.That(loginResponse.userId, Is.Null);
            });
        }

        [Test]
        public void LoginResponse_OnlyUserIdSet_UsernameIsNull()
        {
            var loginResponse = new LoginResponse
            {
                userId = 42
            };

            Assert.Multiple(() =>
            {
                Assert.That(loginResponse.userId, Is.EqualTo(42));
                Assert.That(loginResponse.username, Is.Null);
            });
        }
    }
}
