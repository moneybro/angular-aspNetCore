using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using de_ot_portal.Classes.Addresses;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/AddressesListValues")]
    
    public class AddressesListValuesController : ControllerBase
    {
        private readonly IAddresses _addresses;
        public AddressesListValuesController(IAddresses addresses)
        {
            _addresses = addresses;
        }

        [HttpGet]
        public List<Address> Get()
        {
            return _addresses.GetAddrList();
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
