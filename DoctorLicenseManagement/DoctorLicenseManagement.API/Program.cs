using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Application.Services;
using DoctorLicenseManagement.Infrastructure.Repositories;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDoctorRepository>(sp =>
    new DoctorRepository(builder.Configuration.GetConnectionString("DefaultConnection") ?? ""));

builder.Services.AddScoped<DoctorService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.UseCors("AllowAll");
app.Run();