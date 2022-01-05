using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes;


namespace de_ot_portal.Classes.Departments
{
    public interface IDepartments
    {
        List<Department> GetDeps();
        bool addDep(object serializedDep);
        Department getDepById(int id);
        bool deleteDep(int id);
        bool updateDep(object dep);
    }
}
