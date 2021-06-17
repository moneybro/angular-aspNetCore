using Microsoft.EntityFrameworkCore;
using de_ot_portal.Classes;
using System.IO;
using System.Threading.Tasks;

namespace de_ot_portal.Contexts
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationContext()
        {
            Database.EnsureCreated();
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //optionsBuilder.UseSqlServer("Server=web-serv-mini\\mssqllocaldb;Database=DEportalSQLDB;User Id =deportalapp;Password=1234567890");

        //    //optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=DEportalDB;Trusted_Connection=True;");
        //}

        public override void Dispose()
        {
            base.Dispose();
            DbConnectionOptionsGetter.streamWtiterInstanceHolder.Dispose();
        }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //setLoggerInstance(options.GetExtension<StreamWriter>);
            Database.EnsureCreated();
        }

        public override async ValueTask DisposeAsync()
        {
            await base.DisposeAsync();
            await DbConnectionOptionsGetter.streamWtiterInstanceHolder.DisposeAsync();
        }
    }
}
