using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using de_ot_portal.Classes;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Xml.Serialization;

namespace de_ot_portal.Classes.Users
{
    /// <summary>
    /// класс реализует интерфейс IUsers, который необходим для смены реализации через DI.
    /// класс используется для взаимодействия с БД. в качестве БД используется файл json
    /// </summary>
    public class UserFromJSON : IUsers
    {
        
        /// <summary>
        /// метода возвращает коллекцию пользователей
        /// </summary>
        /// <returns>коллекция пользователей</returns>
        public List<User> GetUsers()
        {
            string alluserstxt = File.ReadAllText(@"Classes\Users\users.json");
            List<User> u = new List<User>();
            u = JsonConvert.DeserializeObject<List<User>>(alluserstxt);
            return u;
        }
        /// <summary>
        /// метод добавляет пользователя в бд
        /// </summary>
        /// <param name="user"></param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool addUser(object user)
        {
            User stranger;
            try
            {
                string strTxt = user.ToString();
                stranger = JsonConvert.DeserializeObject<User>(strTxt);
            }
            catch
            {
                return false;
            }

            List<User> users = GetUsers();
            int newUserId = users.Max(item => item.Id) + 1; // находим id для нового пользователя
            stranger.Id = newUserId;
            stranger.CreateDate = DateTime.Now;
            if (!users.Contains(stranger))
            {
                users.Add(stranger);
                return serializeAndWriteToFile(users);
            }
            else
            {
                Console.WriteLine($"user {stranger.FullName} with id:{stranger.Id} exist. not added to db");
                return false;
            }   
        }

        public bool addUsers(List<User> usersToAdd)
        {
            List<User> users = GetUsers();
            users.AddRange(usersToAdd);
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

        public List<User> getUsersByDepId(int depId)
        {
            var users = GetUsers();
            return users.FindAll(user => user.DepId == depId);
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

        public bool deleteUsers(int[] usersIds)
        {
            var allusers = GetUsers();
            foreach (var userId in usersIds)
            {
                allusers.RemoveAll(item => item.Id == userId);
            }
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

        public static bool loadGoodData()
        {
            try
            {
                File.Delete(@"Classes\Users\users.json");
                File.Copy(@"Classes\Users\usersBackup.json", @"Classes\Users\users.json");
                return true;
            }
            catch 
            {
                return false;
            }
            
        }

        public static bool addUsersFromUploadedFile(string fileName, IUsers userFromJSON)
        {
            try
            {
                //string newUsersTxt = File.ReadAllText(fileName);
                //List<object> u = new List<object>();
                //u = JsonConvert.DeserializeObject<List<object>>(newUsersTxt);

                //foreach (var user in u)
                //{
                //    userFromJSON.addUser(user);
                //}

                var oldusers = userFromJSON.GetUsers();
                string newUsersTxt = File.ReadAllText(fileName);
                List<User> u = new List<User>();
                u = JsonConvert.DeserializeObject<List<User>>(newUsersTxt);

                foreach (var user in u)
                {
                    if (!oldusers.Contains(user))
                    {
                        user.Id = oldusers.Max(item => item.Id) + 1;
                        user.CreateDate = DateTime.Now;
                        oldusers.Add(user);
                    }
                }
                string allUsersUpdated = JsonConvert.SerializeObject(oldusers);
                File.WriteAllText(@"Classes\Users\users.json", allUsersUpdated, Encoding.UTF8);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public void usersToXml()
        {
            Dictionary<string, string> filteredSortedUsers = new Dictionary<string, string>();

            filteredSortedUsers.Add("age", "asc");
            //filteredSortedUsers.Add("roomNumber", "desc");
            //filteredSortedUsers.Add("startDate", "2021-12-03");
            //filteredSortedUsers.Add("endDate", "2021-12-15");

            var users = GetUsers();
            List<Action> actions = new List<Action>();

            int i = 0;
            foreach (var sorter in filteredSortedUsers)
            {
                switch (sorter.Key)
                {
                    case "age":
                        if (sorter.Value == "asc")
                        {
                            users = (i == 0) ? users.OrderBy(u => u.Age).ToList() : users.OrderBy(u => u).ThenBy(u => u.Age).ToList();
                            i++;
                        }
                        else
                        {
                            users = (i == 0) ? users.OrderByDescending(u => u.Age).ToList() : users.OrderByDescending(u => u).ThenByDescending(u => u.Age).ToList();
                        }
                        break;
                }
            }

            foreach (var user in users)
            {
                Console.WriteLine(user);
            }







            //XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<User>));

            //string usersTxt = File.ReadAllText(@"D:\repos\DePortal_ng+c#\Classes\Users\users.json");
            ////List<User> users = JsonConvert.DeserializeObject<List<User>>(usersTxt);


            //string path = @"D:\repos\DePortal_ng+c#\wwwroot\filesForDownload\xmlUsers\";
            //DirectoryInfo dirInfo = new DirectoryInfo(path);
            //if (!dirInfo.Exists)
            //{
            //    dirInfo.Create();
            //}

            //using (FileStream fstream = new FileStream($"{path}\\note.xml", FileMode.OpenOrCreate))
            //{
            //    xmlSerializer.Serialize(fstream, users);
            //}
        }

        public static string usersToXml(int[] usersIds, IUsers _users)
        {
            string filename = "xmlUsers_";
            List<User> usersToXml = new List<User>();
            foreach (var id in usersIds)
            {
                usersToXml.Add(_users.getUserById(id));
            }

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<User>));

            string path = @"wwwroot\filesForDownload\xmlUsers\";
            DirectoryInfo dirInfo = new DirectoryInfo(path);
            if (!dirInfo.Exists)
            {
                dirInfo.Create();
            }
            filename += DateTime.Now.Day.ToString() +
                DateTime.Now.Month.ToString() +
                DateTime.Now.Year.ToString() + "_" +
                DateTime.Now.Hour.ToString() +
                DateTime.Now.Minute.ToString() +
                DateTime.Now.Second.ToString() +
                ".xml";

            //filename += DateTime.Now.ToShortDateString() + ".xml";
            string fullname = path + filename;

            if (File.Exists(fullname))
            {
                Console.WriteLine("deleted");
                File.Delete(fullname);
            }

            using (FileStream fstream = new FileStream($"{fullname}", FileMode.CreateNew))
            {
                xmlSerializer.Serialize(fstream, usersToXml);
            }

            return filename;
        }
    }
}
