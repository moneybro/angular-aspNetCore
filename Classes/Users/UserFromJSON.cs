using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using de_ot_portal.Classes;
using Newtonsoft.Json.Linq;
using System.Text;

namespace de_ot_portal.Classes.Users
{
    /// <summary>
    /// класс реализует интерфейс IUsers, который необходим для смены реализации через DI.
    /// класс используется для взаимодействия с БД. в качестве БД используется файл json
    /// </summary>
    public class UserFromJSON : IUsers
    {
        string alluserstxt = File.ReadAllText(@"Classes\Users\users.json");
        /// <summary>
        /// метода возвращает коллекцию пользователей
        /// </summary>
        /// <returns>коллекция пользователей</returns>
        public List<User> GetUsers()
        {
            List<User> u = new List<User>();
            u = JsonConvert.DeserializeObject<List<User>>(alluserstxt);
            return u;
        }
        /// <summary>
        /// метод добавляет пользователя в бд
        /// </summary>
        /// <param name="objUser"></param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool addUser(object objUser)
        {
            User stranger;
            try
            {
                stranger = JsonConvert.DeserializeObject<User>(objUser.ToString());
            }
            catch
            {
                return false;
            }

            List<User> users = GetUsers();
            int newUserId = users.Max(item => item.Id) + 1; // находим id для нового пользователя
            stranger.Id = newUserId;
            users.Add(stranger);
            return serializeAndWriteToFile(users);
        }
        /// <summary>
        /// метод предназначен для выбора пользователя по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>объект пользователя</returns>
        public User getUserById(int id)
        {
            var users = GetUsers();
            return users.Find(user => user.Id == id);
        }
        /// <summary>
        /// метод обновления пользователя
        /// </summary>
        /// <param name="user">объект пользователя</param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool updateUser(object user)
        {
            User updatedUser;
            try
            {
                updatedUser = JsonConvert.DeserializeObject<User>(user.ToString());
            }
            catch (Exception)
            {

                return false;
            }
            var allusers = GetUsers();
            allusers.RemoveAll(u => u.Id == updatedUser.Id);
            allusers.Add(updatedUser);
            return serializeAndWriteToFile(allusers);
        }
        /// <summary>
        /// метод удаляет пользователя из БД
        /// </summary>
        /// <param name="id">id пользователя</param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool deleteUser(int id)
        {
            var allusers = GetUsers();
            allusers.RemoveAll(item => item.Id == id);
            return serializeAndWriteToFile(allusers);
        }
        /// <summary>
        /// метод предназначен для сериализации объекта и записи в файл
        /// </summary>
        /// <param name="allusers">коллекция пользователей</param>
        /// <returns>возвращает признак успешности записи в файл (для такой реализации "БД")</returns>
        private bool serializeAndWriteToFile(List<User> allusers)
        {
            try
            {
                string allUsersUpdated = JsonConvert.SerializeObject(allusers);
                File.WriteAllText(@"Classes\Users\users.json", allUsersUpdated, Encoding.UTF8);
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
