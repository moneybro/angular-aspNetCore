using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Contexts
{
    public class ContextLogger
    {
        private readonly StreamWriter logStream = new StreamWriter("mylog.txt", true);

        public StreamWriter streamWriter
        {
            get
            {
                return logStream;
            }
        }
    }
}
