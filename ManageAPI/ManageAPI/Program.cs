using ManageAPI.Model;
using ManageAPI.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<SchoolContext>();
builder.Services.AddScoped<ISchoolRepository, SchoolRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder => {
        builder.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseHttpLogging();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
    builder.AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyHeader()
      .AllowAnyMethod()
  );

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
