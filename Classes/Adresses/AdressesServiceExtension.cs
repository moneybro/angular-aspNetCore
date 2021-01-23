using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace angular_aspNetCore_basics.Classes.Adresses
{
    public static class AdressesServiceExtension
    {

        public static IServiceCollection AddAdresses(this IServiceCollection services)
        {
            services.AddScoped<IAdresses, AdrFromJSON>();
            return services;
        }
    }
}
