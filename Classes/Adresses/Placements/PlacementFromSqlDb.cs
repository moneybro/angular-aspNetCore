using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes.Addresses;
using de_ot_portal.Contexts;
using Newtonsoft.Json;



namespace de_ot_portal.Classes.Adresses.Placements
{
    public class PlacementFromSqlDb : IPlacements
    {
        ApplicationContext db;
        public PlacementFromSqlDb(ApplicationContext context)
        {
            db = context;
        }
        public List<Placement> GetPlacementsByAddressId()
        {
            return GetPlacementsByAddressId(0);
        }
        public List<Placement> GetPlacementsByAddressId(int adrId)
        {
            using (db)
            {
                if (adrId == 0)
                {
                    return db.Placements.ToList();
                }
                else
                {
                    return db.Placements.Where(pl => pl.AddressId == adrId).ToList();
                }
                
            }
        }

        
    }
}
