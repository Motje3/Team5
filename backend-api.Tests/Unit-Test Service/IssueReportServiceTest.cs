using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_api.Data;
using backend_api.Models;
using backend_api.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace backend_api.Tests.TestService
{
    public class IssueReportServiceTests
    {
        private readonly IssueReportService _service;
        private readonly AppDbContext _context;

        public IssueReportServiceTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            _service = new IssueReportService(_context);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsEmptyList_WhenNoReportsExist()
        {
            var result = await _service.GetAllAsync();
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsReports_OrderedByCreatedAt()
        {
            _context.IssueReports.AddRange(
                new IssueReport { Id = 1, Title = "Old", CreatedAt = new DateTime(2023, 1, 1) },
                new IssueReport { Id = 2, Title = "New", CreatedAt = new DateTime(2024, 1, 1) }
            );
            await _context.SaveChangesAsync();

            var result = await _service.GetAllAsync();

            Assert.Equal(2, result.Count());
            Assert.Equal("Old", result.First().Title); // oudste eerst
        }

        [Fact]
        public async Task CreateAsync_AddsNewReport()
        {
            var report = new IssueReport { Id = 1, Title = "Test Report" };

            var result = await _service.CreateAsync(report);
            var reportsInDb = await _context.IssueReports.ToListAsync();

            Assert.Single(reportsInDb);
            Assert.Equal("Test Report", result.Title);
        }

        [Fact]
        public async Task CreateAsync_SavesCreatedAt_WhenProvided()
        {
            var createdAt = DateTime.UtcNow.AddDays(-1);
            var report = new IssueReport { CreatedAt = createdAt, Title = "Timed Report" };

            var result = await _service.CreateAsync(report);
            Assert.Equal(createdAt, result.CreatedAt);
        }

        [Fact]
        public async Task CreateAsync_SavesTitleCorrectly()
        {
            var report = new IssueReport { Title = "Critical bug" };

            var result = await _service.CreateAsync(report);
            var saved = await _context.IssueReports.FirstOrDefaultAsync();

            Assert.NotNull(saved);
            Assert.Equal("Critical bug", saved?.Title);
        }

        [Fact]
        public async Task GetAllAsync_IncludesShipmentData()
        {
            var shipment = new Shipment
            {
                Id = 1,
                Destination = "Berlin",
                Status = "Pending" 
            };

            var report = new IssueReport
            {
                Title = "With Shipment",
                Shipment = shipment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Shipments.Add(shipment);
            _context.IssueReports.Add(report);
            await _context.SaveChangesAsync();

            var result = (await _service.GetAllAsync()).ToList();

            var firstShipment = result.FirstOrDefault()?.Shipment;

            Assert.NotNull(firstShipment);
            Assert.Equal("Berlin", firstShipment?.Destination);
        }

        [Fact]
        public async Task CreateAsync_AllowsMultipleReportsWithSameTitle()
        {
            var report1 = new IssueReport { Title = "Duplicate" };
            var report2 = new IssueReport { Title = "Duplicate" };

            await _service.CreateAsync(report1);
            await _service.CreateAsync(report2);

            var all = await _context.IssueReports.Where(r => r.Title == "Duplicate").ToListAsync();
            Assert.Equal(2, all.Count);
        }
    }
}
