using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using de_ot_portal.Classes;

namespace de_ot_portal.Classes.Addresses
{
    public class AdrFromJSON : IAddresses
    {
        List<Address> buildings = new List<Address>();
        public List<Address> GetAddrList()
        {
            var jsonText = File.ReadAllText(@"Classes\Adresses\adresses.json");

            buildings = JsonConvert.DeserializeObject<List<Address>>(jsonText);
            return buildings;
        }
    }
}
