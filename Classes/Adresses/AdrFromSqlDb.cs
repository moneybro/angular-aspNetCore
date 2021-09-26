using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Contexts;
using Newtonsoft.Json;



namespace de_ot_portal.Classes.Addresses
{
    public class AdrFromSqlDb : IAddresses
    {
        List<Address> buildings = new List<Address>();
        ApplicationContext db;
        public AdrFromSqlDb(ApplicationContext context)
        {
            db = context;
        }
        
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
            using (db)
            {
                return db.Addresses.ToList();
            }
        }
        public Address getAddressById(int id)
        {
            return AddressesList.Find(Address => Address.Id == id);
        }
    }
}
