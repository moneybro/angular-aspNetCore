using de_ot_portal.Classes.Addresses;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Users
{
    public class User : IEquatable<User>
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string ShortName { get; set; }
        public string Position { get; set; }
        public string RoomNumber { get; set; }
        public string Email { get; set; }
        public string InternalPhone { get; set; }
        public string MobPhone { get; set; }
        public Address Address { get; set; }

        public string myToString()
        {
            return "ID: " + Id + "\n" +
                "CreateDate: " + CreateDate + "\n" +
                "UpdateDate: " + UpdateDate + "\n" +
                "FullName: " + FullName + "\n" +
                "Age: " + Age + "\n" +
                "ShortName: " + ShortName + "\n" +
                "Position: " + Position + "\n" +
                "RoomNumber: " + RoomNumber + "\n" +
                "Email: " + Email + "\n" +
                "InternalPhone: " + InternalPhone + "\n" +
                "MobPhone: " + MobPhone + "\n";
        }
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            User objAsUser = obj as User;
            if (objAsUser == null) return false;
            else return Equals(objAsUser);
        }
        public bool Equals(User other)
        {
            if (other == null) return false;
            return FullName == other.FullName &&
                Age == other.Age;
        }
    }
}
