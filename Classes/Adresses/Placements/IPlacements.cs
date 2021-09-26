using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Adresses.Placements
{
    public interface IPlacements
    {
        List<Placement> GetPlacementsByAddressId();
        List<Placement> GetPlacementsByAddressId(int id);
    }
}
