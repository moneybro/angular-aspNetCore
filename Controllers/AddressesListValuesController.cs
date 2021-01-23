using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular_aspNetCore_basics.Classes.Adresses;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace angular_aspNetCore_basics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class AddressesListValuesController : ControllerBase
    {
        //// GET: api/AddressesListValuesController
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/AddressesListValuesController
        [HttpGet]
        public IEnumerable<string> Get()
        {
            AdrFromJSON afj = new AdrFromJSON();

            return afj.getAddrListJson();
        }


        // GET api/<AddressesListValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AddressesListValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AddressesListValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AddressesListValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
