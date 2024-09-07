using Amazon.Polly;
using Amazon.Runtime;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Sleepypedia.Data;

var builder = WebApplication.CreateBuilder(args);

var awsOptions = builder.Configuration.GetAWSOptions();
awsOptions.Credentials = new BasicAWSCredentials(
    builder.Configuration["AWS:AccessKey"],
    builder.Configuration["AWS:SecretKey"]
);
awsOptions.Region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);

builder.Services.AddDbContext<ArticleContextCollection>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDefaultAWSOptions(awsOptions);
builder.Services.AddAWSService<IAmazonPolly>();
builder.Services.AddHttpClient();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Sleepypedia API - Polly TTS & Wikipedia", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sleepypedia API v1"));
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();