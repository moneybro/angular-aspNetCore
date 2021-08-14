using de_ot_portal.Classes.Adresses.Placements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Addresses
{
    public class Address
    {
        public int? Id { get; set; }
        public string? name { get; set; }
        public string? buildingType { get; set; }
        public string? sks { get; set; }
        public string? taprs { get; set; }
        public int? catalogPage { get; set; }
        public List<Placement> Placements { get; set; } = new List<Placement>();
    }
}
