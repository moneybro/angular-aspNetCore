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
        public string? Name { get; set; }
        public string? Type { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public float InputCable { get; set; }
    }
}
