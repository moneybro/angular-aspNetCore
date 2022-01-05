using de_ot_portal.Classes.Addresses;
using de_ot_portal.Classes.Users;
using System;
using System.Collections.Generic;

namespace de_ot_portal.Classes.Departments
{
    public class Department : IEquatable<Department>
    {
        public int Id { get; set; }
        public int? IndexNumber { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? FullName { get; set; }
        public string? ShortName { get; set; }
        //public List<User> Users { get; set; } = new List<User>();

        public string myToString()
        {
            return "ID: " + Id + "\n" +
                "CreateDate: " + CreateDate + "\n" +
                "UpdateDate: " + UpdateDate + "\n" +
                "FullName: " + FullName + "\n";
        }
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            Department objAsUser = obj as Department;
            if (objAsUser == null) return false;
            else return Equals(objAsUser);
        }
        public bool Equals(Department other)
        {
            if (other == null) return false;
            return FullName == other.FullName &&
                Id == other.Id;
        }
    }
}
