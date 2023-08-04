using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.Context;
using HotelManagement.Repositories;
using HotelManagement.Services;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement
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

            builder.Services.AddDbContext<HotelContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("conn"));
            });

            //User Defined Services
            builder.Services.AddScoped<IHotelRepo<int, Hotel>, HotelRepo>();
            builder.Services.AddScoped<IRoomRepo<int, Room>, RoomRepo>();
            builder.Services.AddScoped<IRoomRepo<int, Amenity>, AmenityRepo>();
            builder.Services.AddScoped<IRoomRepo<int, Image>, ImageRepo>();

            builder.Services.AddScoped<IHotelService, HotelService>();
            builder.Services.AddScoped<IRoomService, RoomService>();
            builder.Services.AddScoped<IAmenityService, AmenityService>();
            builder.Services.AddScoped<IImageService, ImageService>();

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