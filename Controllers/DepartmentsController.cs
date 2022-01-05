using de_ot_portal.Classes.Departments;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using de_ot_portal.Classes.Departments;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace de_ot_portal.Controllers
{
    [ApiController]
    [Route("api/deps")]


    public class DepartmentController : ControllerBase
    {

        private readonly IDepartments _deps;
        private readonly IWebHostEnvironment _env;
        public DepartmentController(IDepartments deps, IWebHostEnvironment env)
        {
            _deps = deps;
            _env = env;
        }

        /// <summary>
        /// метод возращает список массив пользователей по адресу api/deps в формате json
        /// </summary>
        /// <returns>список всех пользователей</returns>
        [HttpGet]
        public List<Department> Get()
        {
            return _deps.GetDeps();
        }

        /// <summary>
        /// метод возращает пользователя по его ID по адресу api/deps/{id} в формате json
        /// </summary>
        /// <returns>пользователя по ID</returns>
        //GET api/deps/5
        [HttpGet("{id}")]
        public Department Get(int id)
        {
            return _deps.getDepById(id);
        }

        // только для лабораторок, поэтому без DI. Будет удалено, когда проект пойдет жизнь
        [HttpGet("loadGoodData")]
        public bool resetData()
        {
            return DepartmentFromJSON.loadGoodData();
        }

        /// <summary>
        /// метод принимает объект нового пользователя, передает его в соответствующий метод класса для записи в бд. класс определяется в DI
        /// </summary>
        /// <param name="dep">объект класса Dep</param>
        /// <returns>true если добавление в базу прошло успешно, false если добавление в бд не удалось</returns>
        // POST api/<DepController>
        [HttpPost("add")]
        public bool Post([FromBody] object dep)
        {
            return _deps.addDep(dep);
        }

        //[HttpPost("toXmlin")]
        //public string Post([FromBody] int[] dep)
        //{   
        //    string filename = DepFromJSON.depsToXml(dep, _deps);
        //    return filename;
        //}

        /// <summary>
        /// метод принимает объект пользователя, передает его в соответствующий метод класса для обновления в бд. реализация определяется в DI
        /// </summary>
        /// <param name="dep"></param>
        // PUT api/update/
        //[HttpPut("update")]
        //public void Put(object dep)
        //{
        //    _deps.updateDep(dep);
        //}

        /// <summary>
        /// метод принимает id пользователя, передает его в соответствующий метод класса для удаления из бд. реализация определяется в DI
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE api/<DepController>/5
        [HttpDelete("delete/{id}")]
        public bool Delete(int id)
        {
            return _deps.deleteDep(id);
        }
    }
}
