using de_ot_portal.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Users
{
    public class UserFromDB : IUsers
    {
        ApplicationContext db;
        public UserFromDB(ApplicationContext context)
        {
            db = context;
        }
        public List<User> GetUsers()
        {
            List<User> users;
            using (db)
            {
                users = db.Users.ToList();
            }
            return users;
        }
        public User getUserById(int id)
        {
            throw new NotImplementedException();
        }

        public bool updateUser(User id)
        {
            throw new NotImplementedException();
        }
        public bool deleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public bool addUser(object serializedUser)
        {
            throw new NotImplementedException();
        }

        public bool updateUser(object user)
        {
            throw new NotImplementedException();
        }

        public List<User> getUserByDepId(int id)
        {
            throw new NotImplementedException();
        }

        public bool updateRealUser(User user)
        {
            throw new NotImplementedException();
        }

        public bool deleteUsers(int[] id)
        {
            throw new NotImplementedException();
        }

        public bool updateUsers(List<User> users)
        {
            throw new NotImplementedException();
        }

        public List<User> getUsersByDepId(int id)
        {
            throw new NotImplementedException();
        }

        public bool addUsers(List<User> usersToModify)
        {
            throw new NotImplementedException();
        }
    }
}
