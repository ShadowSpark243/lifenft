using DAL;
using DAL1;
using ProjectConnection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigin",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();  // Add this to support credentials
        });
});

// Register Services
builder.Services.AddScoped<AuthenticationDAL>();
builder.Services.AddScoped<UserAccess>();
builder.Services.AddScoped<Callprocedure>();

// Register Singleton Services
builder.Services.AddSingleton<Utility>();
builder.Services.AddSingleton<GridDal>();

// Add HttpClient
builder.Services.AddHttpClient();

// Add Controllers
builder.Services.AddControllers();

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { 
        Title = "Your API", 
        Version = "v1" 
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
    });
}

// Middleware Pipeline
app.UseHttpsRedirection();

// Apply CORS - Make sure to use the correct policy name
app.UseCors("AllowAllOrigin");  // Fixed policy name

app.UseAuthorization();

app.MapControllers();

app.Run(); 