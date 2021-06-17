using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace de_ot_portal.Classes.Addresses
{
    public static class AdressesServiceExtension
    {

        public static IServiceCollection AddAdresses(this IServiceCollection services)
        {
            services.AddScoped<IAddresses, AdrFromJSON>();
            return services;
        }
    }
}
