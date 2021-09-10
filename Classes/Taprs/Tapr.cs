using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Taprs
{
    public class Tapr
    {
        public int Id { get; set; }
        public int PlacementId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public float HoleCable { get; set; }
        public int Rj45Count { get; set; }
        public string? SchemaPath { get; set; }
    }
}
