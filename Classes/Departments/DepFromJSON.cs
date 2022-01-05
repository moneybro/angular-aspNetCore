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
using de_ot_portal.Classes.Users;

namespace de_ot_portal.Classes.Departments
{
    /// <summary>
    /// класс реализует интерфейс IDepartments, который необходим для смены реализации через DI.
    /// класс используется для взаимодействия с БД. в качестве БД используется файл json
    /// </summary>
    public class DepartmentFromJSON : IDepartments
    {
        private IUsers _users;
        public DepartmentFromJSON(IUsers users)
        {
            _users = users;
        }

        string allDepartmentstxt = File.ReadAllText(@"Classes\Departments\Departments.json");
        /// <summary>
        /// метода возвращает коллекцию пользователей
        /// </summary>
        /// <returns>коллекция пользователей</returns>
        public List<Department> GetDeps()
        {
            List<Department> u = new List<Department>();
            u = JsonConvert.DeserializeObject<List<Department>>(allDepartmentstxt);
            return u;
        }
        /// <summary>
        /// метод добавляет пользователя в бд
        /// </summary>
        /// <param name="Department"></param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool addDep(object Department)
        {
            Department stranger;
            try
            {
                string strTxt = Department.ToString();
                stranger = JsonConvert.DeserializeObject<Department>(strTxt);
            }
            catch
            {
                return false;
            }

            List<Department> Departments = GetDeps();
            int newDepartmentId = Departments.Max(item => item.Id) + 1; // находим id для нового пользователя
            int newDepartmentIndexNumber = (int)(Departments.Max(item => item.IndexNumber) + 1);
            stranger.Id = newDepartmentId;
            stranger.IndexNumber = newDepartmentIndexNumber;
            stranger.CreateDate = DateTime.Now;
            if (!Departments.Contains(stranger))
            {
                Departments.Add(stranger);
                return serializeAndWriteToFile(Departments);
            }
            else
            {
                Console.WriteLine($"Department {stranger.FullName} with id:{stranger.Id} exist. not added to db");
                return false;
            }
            
        }
        /// <summary>
        /// метод предназначен для выбора пользователя по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>объект пользователя</returns>
        public Department getDepById(int id)
        {
            var Departments = GetDeps();
            return Departments.Find(Department => Department.Id == id);
        }
        /// <summary>
        /// метод обновления пользователя
        /// </summary>
        /// <param name="Department">объект пользователя</param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        public bool updateDep(object Department)
        {
            Department updatedDepartment;
            try
            {
                updatedDepartment = JsonConvert.DeserializeObject<Department>(Department.ToString());
            }
            catch (Exception)
            {

                return false;
            }
            var allDepartments = GetDeps();
            allDepartments.RemoveAll(u => u.Id == updatedDepartment.Id);
            allDepartments.Add(updatedDepartment);
            return serializeAndWriteToFile(allDepartments);
        }
        /// <summary>
        /// метод удаляет пользователя из БД
        /// </summary>
        /// <param name="id">id пользователя</param>
        /// <returns>возвращает признак успешности записи в БД</returns>
        
        
        public bool deleteDep(int id)
        {
            
            var allDepartments = GetDeps();
            var depExist = allDepartments.Count(d => d.Id == id);

            if (depExist > 0) // если в департаменте есть пользователи, то мы их сначала переносим в департамент "не распределен"
            {
                var usersToModify = _users.getUsersByDepId(id); // через DI работаем либо с SQL, либо с json
                int[] usersIdsToDel = new int[usersToModify.Count()];

                for (int i = 0; i < usersToModify.Count; i++)
                {
                    usersIdsToDel[i] = usersToModify[i].Id;
                }

                _users.deleteUsers(usersIdsToDel);

                foreach (var user in usersToModify) {
                    user.DepId = 0;
                }

                _users.addUsers(usersToModify);

                allDepartments.RemoveAll(item => item.Id == id);
                return serializeAndWriteToFile(allDepartments);
            }
            else return false;
        }
        /// <summary>
        /// метод предназначен для сериализации объекта и записи в файл
        /// </summary>
        /// <param name="allDepartments">коллекция пользователей</param>
        /// <returns>возвращает признак успешности записи в файл (для такой реализации "БД")</returns>
        private bool serializeAndWriteToFile(List<Department> allDepartments)
        {
            try
            {
                string allDepartmentsUpdated = JsonConvert.SerializeObject(allDepartments);
                File.WriteAllText(@"Classes\Departments\Departments.json", allDepartmentsUpdated, Encoding.UTF8);
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
                File.Delete(@"Classes\Departments\Departments.json");
                File.Copy(@"Classes\Departments\DepartmentsBackup.json", @"Classes\Departments\Departments.json");
                return true;
            }
            catch 
            {
                return false;
            }
            
        }

        public static bool addDepartmentsFromUploadedFile(string fileName, IDepartments DepartmentFromJSON)
        {
            try
            {
                var oldDepartments = DepartmentFromJSON.GetDeps();
                string newDepartmentsTxt = File.ReadAllText(fileName);
                List<Department> u = new List<Department>();
                u = JsonConvert.DeserializeObject<List<Department>>(newDepartmentsTxt);

                foreach (var Department in u)
                {
                    if (!oldDepartments.Contains(Department))
                    {
                        Department.Id = oldDepartments.Max(item => item.Id) + 1;
                        Department.CreateDate = DateTime.Now;
                        oldDepartments.Add(Department);
                    }
                }
                string allDepartmentsUpdated = JsonConvert.SerializeObject(oldDepartments);
                File.WriteAllText(@"Classes\Departments\Departments.json", allDepartmentsUpdated, Encoding.UTF8);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        
        public static string DepartmentsToXml(int[] DepartmentsIds, IDepartments _Departments)
        {
            string filename = "xmlDepartments_";
            List<Department> DepartmentsToXml = new List<Department>();
            foreach (var id in DepartmentsIds)
            {
                DepartmentsToXml.Add(_Departments.getDepById(id));
            }

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Department>));

            string path = @"D:\repos\DePortal_ng+c#\wwwroot\filesForDownload\xmlDepartments\";
            DirectoryInfo dirInfo = new DirectoryInfo(path);
            if (!dirInfo.Exists)
            {
                dirInfo.Create();
            }

            filename += DateTime.Now.ToShortDateString() + ".xml";
            string fullname = path + filename;

            if (File.Exists(fullname))
            {
                Console.WriteLine("deleted");
                File.Delete(fullname);
            }

            using (FileStream fstream = new FileStream($"{fullname}", FileMode.CreateNew))
            {
                xmlSerializer.Serialize(fstream, DepartmentsToXml);
            }

            return filename;
        }
    }
}
