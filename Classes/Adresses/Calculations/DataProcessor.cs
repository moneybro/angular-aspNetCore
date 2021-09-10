using de_ot_portal.Contexts;
using de_ot_portal.Classes.Adresses.Placements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes.Taprs;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public class DataProcessor : ICalculation
    {
        ApplicationContext db = new ApplicationContext(DbConnectionOptionsGetter.getOptions());
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
                db.Placements.Add(pl);
                db.SaveChanges();
                Tapr tapr = new Tapr
                {
                    PlacementId = (int)pl.Id,
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


//public int? Id { get; set; }
//public string? Name { get; set; }
//public string? Type { get; set; }
//public int AddressId { get; set; }
//public Address Address { get; set; }

//public int AddressId { get; set; }
//public string PlacemnetName { get; set; }
//public string Box { get; set; }
//public float HoleCable { get; set; }
//public float InputCable { get; set; }
//public int Rj45Count { get; set; }
//public float KorobCount { get; set; }
//public string Podryadchik { get; set; }