using backend_api.Data;
using backend_api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Database connection (PostgreSQL via Railway)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 📦 Services
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IIssueReportService, IssueReportService>();
builder.Services.AddScoped<IProfileService, ProfileService>(); // ✅ Profiel service toevoegen

// 🔓 CORS (voor frontend-toegang)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🔍 Swagger for API docs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // ✅ CORS toepassen vóór controllers
app.UseHttpsRedirection();

app.MapControllers();

app.Run();
