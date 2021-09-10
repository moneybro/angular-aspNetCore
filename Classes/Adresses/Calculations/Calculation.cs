using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public class Calculation
    {
        public int Id { get; set; }
        public int PlacementId { get; set; } // принадлежность к помещению
        public DateTime DateTime { get; set; }
        public string Box { get; set; }
        public float HoleCable { get; set; }
        public float InputCable { get; set; }
        public float Rj45Count { get; set; }
        public float KorobCount { get; set; }
        public string SchemaPath { get; set; }
        public string Podryadchik { get; set; }
    }
}