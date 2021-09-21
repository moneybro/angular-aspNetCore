using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public static class CalculationsServiceExtension
    {
        public static IServiceCollection AddCalculations(this IServiceCollection services)
        {
            //services.AddScoped<ICalculation, DataProcessor2Txt>();
            services.AddScoped<ICalculation, DataProcessor>();
            return services;
        }
    }
    
}
