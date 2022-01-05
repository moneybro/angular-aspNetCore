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
        bool addUser(object serializedUser);
        User getUserById(int id);
        bool deleteUser(int id);
        bool deleteUsers(int[] id);
        bool updateUser(object user);
        List<User> getUsersByDepId(int id);
        bool addUsers(List<User> usersToModify);
    }
}
