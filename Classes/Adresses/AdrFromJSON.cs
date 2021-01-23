using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace angular_aspNetCore_basics.Classes.Adresses
{
    public class AdrFromJSON : IAdresses
    {
        public Dictionary<int, string> getAdrDict()
        {
            Dictionary<int, string> adrDict = new Dictionary<int, string>();

            var jsonText = File.ReadAllText(@"Classes\Adresses\adresses.json");
            var adrDictObj = JsonConvert.DeserializeObject<List<adrList>>(jsonText);

            Console.WriteLine(adrDictObj.Count);

            foreach (var item in adrDictObj)
            {
                adrDict.Add(item.id, item.name);
            }

            return adrDict;
        }

        public IEnumerable<string> getAddrListJson()
        {
            List<string> adrArr = new List<string>();
            var jsonText = File.ReadAllText(@"Classes\Adresses\adresses.json");
            var adrDictObj = JsonConvert.DeserializeObject<List<adrList>>(jsonText);
            foreach (var item in adrDictObj)
            {
                adrArr.Add(item.name);
            }
            return adrArr;
        }

        public class adrList
        {
            public int id { get; set; }
            public string name { get; set; }

            //public int id;
            //public string name;
        }
    }
}
