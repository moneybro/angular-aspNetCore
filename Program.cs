using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal;
using de_ot_portal.Contexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace de_ot_portal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args) // создание строителя, получение экземпляра хоста 
                .Build() // построение IHost
                .Run();  // запуск приложения
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)             //инициализация экземпляра строителя (builder) для создания IHostBuilder
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>(); // определение класса, который ответственнен за настройку сервера
                });
    }
}
