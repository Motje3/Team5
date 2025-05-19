using backend_api.Controllers;
using backend_api.DTOs;
using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.TestHost;

namespace backend_api.IntegrationTests
{
    public class ShipmentsControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly Mock<IShipmentService> _mockService;

        public ShipmentsControllerTests(WebApplicationFactory<Program> factory)
        {
            _mockService = new Mock<IShipmentService>();

            var customizedFactory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Vervang IShipmentService door mock
                    services.AddScoped(sp => _mockService.Object);
                });
            });

            _client = customizedFactory.CreateClient();
        }

    }
}