using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes.Adresses.Placements;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace de_ot_portal.Controllers
{
    [Route("api/placements")]
    [ApiController]
    public class PlacementsController : ControllerBase
    {
        private readonly IPlacements placements;
        public PlacementsController(IPlacements _placements) => placements = _placements;

        [HttpGet()]
        public List<Placement> Get()
        {
            return placements.GetPlacementsByAddressId();
        }


        // GET api/<AddressesListValuesController>/5
        [HttpGet("{id}")]
        public List<Placement> Get(int id)
        {
            return placements.GetPlacementsByAddressId(id);
        }
    }

    
}
