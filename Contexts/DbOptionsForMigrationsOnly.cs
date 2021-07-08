using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace de_ot_portal.Contexts
{
    /// <summary>
    /// Класс DbOptionsForMigrationsOnly применяет интерфейс IDesignTimeDbContextFactory, который типизируется типом контекста данных - в данном случае класс ApplicationContext. Данный интерфейс содержит один метод CreateDbContext(), который должен возвращать созданный объект контекста данных.

    ///В данном случае также получаем конфигурацию из файла appsettings.json и извлекаем из ее строку подключения и таким образом создаем контекст.

    ///Хотя этот класс формально нигде не вызывается и никак не используется, фактически он вызывается инфраструктурой Entity Framework при создании миграции.
    /// </summary>
    public class DbOptionsForMigrationsOnly : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            // получаем конфигурацию из файла appsettings.json
            ConfigurationBuilder builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            IConfigurationRoot config = builder.Build();

            // получаем строку подключения из файла appsettings.json
            string connectionString = config.GetConnectionString("localdbConnection");
            optionsBuilder.UseSqlServer(connectionString, opts => opts.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds));
            return new ApplicationContext(optionsBuilder.Options);
        }
    }
}