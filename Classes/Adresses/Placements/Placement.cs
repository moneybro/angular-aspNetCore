using de_ot_portal.Classes.Addresses;
using de_ot_portal.Classes.Taprs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        [ForeignKey("AddressId")]
        public Address Address { get; set; }
        public float? InputCable { get; set; }
        public string? Floor { get; set; }
        public int? RoomsCount { get; set; }
        public float? SqHole { get; set; }
        public float? SqLive { get; set; }
        public string? Tapr { get; set; }
    }
}
