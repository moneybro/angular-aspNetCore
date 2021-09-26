using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using de_ot_portal.Classes.Addresses;
using de_ot_portal.Classes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/taprs")]
    [Route("api/taprs/business")]
    [Route("api/taprs/comfort")]
    [Route("api/taprs/econom")]
    [Route("api/taprs/standart")]

    public class TaprsController : ControllerBase
    {
        [HttpGet]
        public void Get()
        {
        }


        // GET api/<TaprsController>/5
        //[HttpGet("{name}")]
        //public void Get(string name)
        //{
        //    Console.WriteLine(name);            
        //}

        // POST api/<TaprsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TaprsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TaprsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
