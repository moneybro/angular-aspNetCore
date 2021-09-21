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
        public void createDB()
        {
            //Console.WriteLine("db created");
            

            using (db)
            {
                UserFromJSON usersList = new UserFromJSON();

                var usersJson = usersList.GetUsers();

                foreach (var item in usersJson)
                {
                    db.Users.Add(item);
                }
                
                db.SaveChanges();
                Console.WriteLine("Объекты успешно сохранены");

                // получаем объекты из бд и выводим на консоль
                var usersFromDb = db.Users.ToList();
                Console.WriteLine("Список объектов:");
                foreach (User u in usersFromDb)
                {
                    Console.WriteLine($"{u.Id};{u.Email};{u.InternalPhone};{u.MobPhone}");
                }
            }
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
    }
}
