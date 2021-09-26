using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes;


namespace de_ot_portal.Classes.Users
{
    public interface IUsers
    {
        List<User> GetUsers();
        void createDB();
    }
}
