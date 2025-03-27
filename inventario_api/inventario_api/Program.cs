using inventario_api.Interfaces;
using inventario_api.Models;
using inventario_api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Cadena de conexión a la base de datos
builder.Services.AddDbContext<InventarioBDDContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")!));

//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

//Interfaces y Servicios
builder.Services.AddScoped<ILogServices, LogServices>();
builder.Services.AddScoped<ICategoriaServices, CategoriaServices>();
builder.Services.AddScoped<IEstadoServices, EstadoServices>();
builder.Services.AddScoped<IProductoServices, ProductoServices>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();