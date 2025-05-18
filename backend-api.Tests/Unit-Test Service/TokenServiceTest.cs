using backend_api.Models;
using backend_api.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Xunit;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend_api.Tests.TestService
{
    public class TokenServiceTests
    {
        private const string ValidKey = "ThisIsAValidKeyWithEnoughLength123!";
        private const string Issuer = "test_issuer";
        private const string Audience = "test_audience";

        private Profile TestUser => new Profile
        {
            Id = 42,
            Username = "unittest",
            FullName = "Unit Test"
            // maak die test hier damian en cook
        };
    }
}