using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Weavesound.Model;

namespace Weavesound.Repository
{
    public interface IFourSharedFileRepository : IDisposable
    {
        IEnumerable<FourSharedFile> Get();
        FourSharedFile Get(string id);
        FourSharedFile Insert(FourSharedFile file);
        void Update(string id, FourSharedFile file);
        bool Exists(string id);
    }
}
