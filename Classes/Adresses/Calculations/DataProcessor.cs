using de_ot_portal.Contexts;
using de_ot_portal.Classes.Adresses.Placements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes.Taprs;
using Microsoft.EntityFrameworkCore;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public class DataProcessor : ICalculation
    {
        ApplicationContext db;
        public DataProcessor(ApplicationContext context)
        {
            db = context;
        }
        public void SortAndSaveData(RawData rd)
        {
            using (db)
            {
                Placement pl = new Placement
                {
                    Name = rd.PlacementName,
                    AddressId = rd.AddressId,
                    Type = rd.PlacementType,
                    InputCable = rd.InputCable
                };
                if (!(db.Placements.Where(a => a.Name.Contains(pl.Name) && a.AddressId == pl.AddressId).ToList().Count() > 0))
                {
                    db.Placements.Add(pl);
                }
                else
                {
                   pl.Id = db.Placements.FirstOrDefault(p => p.Name == pl.Name && p.AddressId == 31).Id;
                    //.Where(p => p.Name == pl.Name && p.AddressId == 31);
                }
                db.SaveChanges();
                Tapr tapr = new Tapr
                {
                    Id = (int)pl.Id,
                    Type = rd.AddressType,
                    Name = rd.TaprName,
                    HoleCable = rd.HoleCable,
                    Rj45Count = rd.Rj45Count
                };
                db.Taprs.Add(tapr);
                db.SaveChanges();
                Console.WriteLine($"placementId:{pl.Id}");
            }
        }
    }
}