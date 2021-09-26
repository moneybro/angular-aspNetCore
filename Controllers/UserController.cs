using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using de_ot_portal.Classes.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/users")]
    
    
    public class UserController : ControllerBase
    {

        private readonly IUsers _users;
        public UserController(IUsers users)
        {
            _users = users;
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

        /// <summary>
        /// метод принимает объект нового пользователя, передает его в соответствующий метод класса для записи в бд. класс определяется в DI
        /// </summary>
        /// <param name="user">объект класса User</param>
        /// <returns>true если добавление в базу прошло успешно, false если добавление в бд не удалось</returns>
        // POST api/<UserController>
        [HttpPost("add")]
        public bool Post([FromBody] object user)
        {
            return _users.addUser(user);
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
