using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using de_ot_portal.Classes.Adresses.Calculations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [Route("api/dataenter")]
    [ApiController]
    public class DataEnter : ControllerBase
    {
        // GET: api/<DataEnter>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DataEnter>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }



        private readonly ICalculation _calculation;
        public DataEnter(ICalculation calculation)
        {
            _calculation = calculation;
        }
        // POST api/<DataEnter>
        [HttpPost]
        public void Post([FromBody] RawData value)
        {
            _calculation.SortAndSaveData(value);
            Console.WriteLine(value.ToString());
        }

        // PUT api/<DataEnter>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DataEnter>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        
    }
}
