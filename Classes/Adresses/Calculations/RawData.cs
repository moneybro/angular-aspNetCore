using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public class RawData
    {
        public int AddressId { get; set; }
        public string AddressType { get; set; }
        public string PlacementName { get; set; }
        public string PlacementType { get; set; }
        public string TaprName { get; set; }
        public string Box { get; set; }

        public float HoleCable { get; set; }

        public float InputCable { get; set; }
        public int Rj45Count {get; set;}
        public float KorobCount { get; set; }
        public string Podryadchik { get; set; }

        public override string ToString()
        {
            return $"{AddressId},{PlacementName},{PlacementType},{Box},{HoleCable},{InputCable},{Rj45Count},{KorobCount},{Podryadchik}";
        }
    }
}
