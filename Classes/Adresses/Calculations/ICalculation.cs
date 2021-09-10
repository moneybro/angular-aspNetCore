using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace de_ot_portal.Classes.Adresses.Calculations
{
    public interface ICalculation
    {
        void SortAndSaveData(RawData rawData);
    }
}
