using Microsoft.EntityFrameworkCore;
using UserManagement.Interfaces;
using UserManagement.Models;
using UserManagement.Models.Context;
using UserManagement.Repositories;
using UserManagement.Services;

namespace UserManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<UserContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("Conn"));
            });

            builder.Services.AddScoped<IRepo<User, int>, UserRepo>();
            builder.Services.AddScoped<IRepo<Agent, int>, AgentRepo>();
            builder.Services.AddScoped<IRepo<Customer, int>, CustomerRepo>();

            builder.Services.AddScoped<IGenerateToken,GenerateTokenService>();
            builder.Services.AddScoped<IUserService,UserService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}