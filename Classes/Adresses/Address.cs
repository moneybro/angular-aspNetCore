using de_ot_portal.Classes.Adresses.Placements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Addresses
{
    public class Address
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? BuildingType { get; set; }
        public string? Sks { get; set; }
        public string? Taprs { get; set; }
        public int? CatalogPage { get; set; }
        public List<Placement> Placements { get; set; } = new List<Placement>();
    }
}
