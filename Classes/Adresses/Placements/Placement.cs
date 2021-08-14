using de_ot_portal.Classes.Addresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Adresses.Placements
{
    public class Placement
    {
        public int? Id { get; set; }
        public string? name { get; set; }
        public string? placementType { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
    }
}
