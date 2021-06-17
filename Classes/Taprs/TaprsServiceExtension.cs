using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace de_ot_portal.Classes.Taprs
{
    public static class TaprsServiceExtension
    {

        public static IServiceCollection AddTaprs(this IServiceCollection services)
        {
            services.AddScoped<ITaprs, TaprFromJSON>();
            return services;
        }
    }
}
