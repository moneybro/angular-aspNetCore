﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;



namespace de_ot_portal.Classes.Addresses
{
    public class AdrFromJSON : IAddresses
    {
        List<Address> buildings = new List<Address>();
        string jsonText = File.ReadAllText(@"Classes\Adresses\adresses.json");

        internal List<Address> AddressesList {
            get
            {
                return AddressesList;
            }
            set 
            {
                AddressesList = GetAddrList();
            } 
        }
        public List<Address> GetAddrList()
        {
            AddressesList = JsonConvert.DeserializeObject<List<Address>>(jsonText);
            return buildings;
        }

        public Address getAddressById(int id)
        {
            return AddressesList.Find(Address => Address.Id == id);
        }
    }
}
