using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddSwaggerGen(c =>
                       {
                           c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
                       });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddMediatR(typeof(Create.Handler).Assembly);
            services.AddMediatR(typeof(Edit.Handler).Assembly);
            services.AddMediatR(typeof(Delete.Handler).Assembly);

            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            return services;
        }
    }
}