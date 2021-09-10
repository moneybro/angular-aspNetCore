using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace de_ot_portal.Contexts
{
    public static class DbConnectionOptionsGetter
    {
        public static string getConnectionString()
        {
            var builder = new ConfigurationBuilder();
            // установка пути к текущему каталогу
            builder.SetBasePath(Directory.GetCurrentDirectory());
            // получаем конфигурацию из файла appsettings.json
            builder.AddJsonFile("appsettings.json");
            // создаем конфигурацию
            var config = builder.Build();
            // получаем строку подключения
            string connectionString = config.GetConnectionString("localdbConnection");
            return connectionString;
        }
        public static DbContextOptions<ApplicationContext> getOptions()
        {
            string connectionString = getConnectionString();

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            //optionsBuilder.LogTo(System.Console.WriteLine);
            //optionsBuilder.LogTo(message => System.Diagnostics.Debug.WriteLine(message));
            //var ls = new ContextLogger();
            //streamWtiterInstanceHolder = ls.streamWriter;
            //optionsBuilder.LogTo(streamWtiterInstanceHolder.WriteLine, new[] { RelationalEventId.CommandExecuted });
            

            var options = optionsBuilder
                .UseSqlServer(connectionString)
                .Options;
            

            return options;
        }

        public static StreamWriter streamWtiterInstanceHolder { get; set; }

    }
}
