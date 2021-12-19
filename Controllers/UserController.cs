using de_ot_portal.Classes.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/users")]


    public class UserController : ControllerBase
    {

        private readonly IUsers _users;
        private readonly IWebHostEnvironment _env;
        public UserController(IUsers users, IWebHostEnvironment env)
        {
            _users = users;
            _env = env;
        }

        /// <summary>
        /// метод возращает список массив пользователей по адресу api/users в формате json
        /// </summary>
        /// <returns>список всех пользователей</returns>
        [HttpGet]
        public List<User> Get()
        {
            return _users.GetUsers();
        }

        /// <summary>
        /// метод возращает пользователя по его ID по адресу api/users/{id} в формате json
        /// </summary>
        /// <returns>пользователя по ID</returns>
        //GET api/users/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _users.getUserById(id);
        }

        // только для лабораторок, поэтому без DI. Будет удалено, когда проект пойдет жизнь
        [HttpGet("loadGoodData")]
        public bool resetData()
        {
            return UserFromJSON.loadGoodData();
        }

        /// <summary>
        /// метод принимает объект нового пользователя, передает его в соответствующий метод класса для записи в бд. класс определяется в DI
        /// </summary>
        /// <param name="user">объект класса User</param>
        /// <returns>true если добавление в базу прошло успешно, false если добавление в бд не удалось</returns>
        // POST api/<UserController>
        [HttpPost("add")]
        public bool Post([FromBody] User user)
        {
            return _users.addUser(user);
        }

        [HttpPost("upload"), DisableRequestSizeLimit]
        public bool UploadFiles()
        {
            try
            {
                var file = Request.Form.Files[0];
                var pathToSave = _env.WebRootPath + "\\uploaded_files";

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);

                    using (FileStream fs = System.IO.File.Create(fullPath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                    UserFromJSON.addUsersFromUploadedFile(fullPath, _users);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                //return StatusCode(500, $"Internal server error: {ex}");
                return false;
            }
        }

        [HttpPost("toXmlin")]
        public string Post([FromBody] int[] user)
        {   
            string filename = UserFromJSON.usersToXml(user, _users);
            return filename;
        }

        /// <summary>
        /// метод принимает объект пользователя, передает его в соответствующий метод класса для обновления в бд. реализация определяется в DI
        /// </summary>
        /// <param name="user"></param>
        // PUT api/update/
        [HttpPut("update")]
        public void Put(object user)
        {
            _users.updateUser(user);
        }

        /// <summary>
        /// метод принимает id пользователя, передает его в соответствующий метод класса для удаления из бд. реализация определяется в DI
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE api/<UserController>/5
        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return _users.deleteUser(id);
        }
    }
}
