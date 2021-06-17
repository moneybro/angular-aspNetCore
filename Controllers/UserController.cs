using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using de_ot_portal.Classes.Users;
using de_ot_portal.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/users")]
    
    
    public class UserController : ControllerBase
    {
        //UserFromJSON ufj = new UserFromJSON();
        UserFromDB ufdb = new UserFromDB();

        [HttpGet]
        public List<User> Get()
        {
            //Redirect("api/User/0");
            
            return ufdb.GetUsers();
        }


        // GET api/<UserController>/5
        //[HttpGet("{id}")]
        //public User Get(int id)
        //{
        //    return ufj.getUserById(id);
        //}

        [HttpGet("crdb")]
        public void crdb()
        {
            ufdb.createDB();
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
