using de_ot_portal.Classes.Addresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Users
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Email { get; set; }
        public string InternalPhone { get; set; }
        public string MobPhone { get; set; }
        public Address Address { get; set; } 
    }
}
