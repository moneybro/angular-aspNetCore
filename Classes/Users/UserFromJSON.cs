using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using de_ot_portal.Classes;

namespace de_ot_portal.Classes.Users
{
    public class UserFromJSON : IUsers
    {

        public List<User> GetUsers()
        {
            List<User> u = new List<User>();
            
            var jsonText = File.ReadAllText(@"Classes\Users\users.json");
            u = JsonConvert.DeserializeObject<List<User>>(jsonText);
            return u;
        }

        public User getUserById(int id)
        {
            var users = GetUsers();
            return users.Find(user => user.Id == id);
        }

        public void createDB()
        {
            throw new NotImplementedException();
        }
    }
}
