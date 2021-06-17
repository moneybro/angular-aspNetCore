using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace de_ot_portal.Classes.Users
{
    public static class UsersServiceExtension
    {
    public static IServiceCollection AddUsers(this IServiceCollection services)
        {
            services.AddScoped<IUsers, UserFromDB>();
            //services.AddScoped<IUsers, UserFromJSON>();
            return services;
        }
    }
}
