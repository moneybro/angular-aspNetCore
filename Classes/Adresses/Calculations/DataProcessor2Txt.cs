using de_ot_portal.Contexts;
using de_ot_portal.Classes.Adresses.Placements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using de_ot_portal.Classes.Taprs;
using System.IO;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public class DataProcessor2Txt : ICalculation
    {
        ApplicationContext db;
        public DataProcessor2Txt(ApplicationContext context)
        {
            db = context;
        }
        public void SortAndSaveData(RawData rd)
        {
            string bigStr = "";
            
                Placement pl = new Placement
                {
                    Name = rd.PlacementName,
                    AddressId = rd.AddressId,
                    Type = rd.PlacementType,
                    InputCable = rd.InputCable
                };
                Tapr tapr = new Tapr
                {
                    PlacementId = 123456,
                    Type = rd.AddressType,
                    Name = rd.TaprName,
                    HoleCable = rd.HoleCable,
                    Rj45Count = rd.Rj45Count
                };
            bigStr += "placement:\r\n" +
                pl.Name + "\r\n" +
                pl.AddressId + "\r\n" +
                pl.Type + "\r\n" +
                pl.InputCable + "\r\n" +
                "tapr:" + "\r\n" +
                    tapr.PlacementId + "\r\n" +
                    tapr.Type + "\r\n" +
                    tapr.Name + "\r\n" +
                    tapr.HoleCable + "\r\n" +
                    tapr.Rj45Count;



            string writePath = @"d:\SD\rawdata.txt";

            try
            {
                using (StreamWriter sw = new StreamWriter(writePath, false, System.Text.Encoding.Default))
                {
                    sw.WriteLine(bigStr);
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}


//public int? Id { get; set; }
//public string? Name { get; set; }
//public string? Type { get; set; }
//public int AddressId { get; set; }
//public Address Address { get; set; }

//public int AddressId { get; set; }
//public string PlacemnetName { get; set; }
//public string Box { get; set; }
//public float HoleCable { get; set; }
//public float InputCable { get; set; }
//public int Rj45Count { get; set; }
//public float KorobCount { get; set; }
//public string Podryadchik { get; set; }