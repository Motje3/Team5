using backend_api.Data;
using backend_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// 🔌 PostgreSQL via Railway
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🧠 Services
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IIssueReportService, IssueReportService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// 🔐 JWT Auth & Authorization
var key    = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];

builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer           = true,
      ValidateAudience         = true,
      ValidateLifetime         = true,
      ValidateIssuerSigningKey = true,
      ValidIssuer              = issuer,
      ValidAudience            = audience,
      IssuerSigningKey         = new SymmetricSecurityKey(key),
      NameClaimType            = ClaimTypes.Name
    };
  });

builder.Services.AddAuthorization();

// 🔓 CORS for frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
      policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// 🧪 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🧩 Controllers
builder.Services.AddControllers();

var app = builder.Build();

// ✅ Swagger only in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🧱 Middleware
app.UseCors("AllowAll");
app.UseHttpsRedirection();

// 🔐 Authentication & 🔓 Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
