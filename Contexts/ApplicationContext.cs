using Microsoft.EntityFrameworkCore;
using de_ot_portal.Classes;
using System.IO;
using System.Threading.Tasks;
using de_ot_portal.Classes.Addresses;
using de_ot_portal.Classes.Adresses.Placements;
using de_ot_portal.Classes.Taprs;
using de_ot_portal.Classes.Adresses.Calculations;

namespace de_ot_portal.Contexts
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Placement> Placements { get; set; }
        
        public DbSet<Tapr> Taprs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Calculation> Calculations { get; set; }

        public ApplicationContext()
        {
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=web-serv-mini\\mssqllocaldb;Database=DEportalSQLDB;User Id =deportalapp;Password=1234567890");

            //optionsBuilder.UseSqlServer(DbConnectionOptionsGetter.getConnectionString());

        }

        public override void Dispose()
        {
            base.Dispose();
            if (DbConnectionOptionsGetter.streamWtiterInstanceHolder != null) DbConnectionOptionsGetter.streamWtiterInstanceHolder.Dispose();
        }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //setLoggerInstance(options.GetExtension<StreamWriter>);
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public override async ValueTask DisposeAsync()
        {
            await base.DisposeAsync();
            await DbConnectionOptionsGetter.streamWtiterInstanceHolder.DisposeAsync();
        }
    }
}
