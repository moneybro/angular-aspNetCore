using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;



namespace de_ot_portal.Classes.Addresses
{
    public class AddressFromJSON : IAddresses
    {
        public List<Address> GetAddrList()
        {
            throw new NotImplementedException();
        }

        public List<Address> GetAddress()
        {
            List<Address> u = new List<Address>();
            
            var jsonText = File.ReadAllText(@"Classes\Addresss\Addresss.json");
            u = JsonConvert.DeserializeObject<List<Address>>(jsonText);
            return u;
        }

        public Address getAddressById(int id)
        {
            var Addresss = GetAddress();
            return Addresss.Find(Address => Address.Id == id);
        }
    }
}
