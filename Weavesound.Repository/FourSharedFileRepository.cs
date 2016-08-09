using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Weavesound.DAL;
using Weavesound.Model;

namespace Weavesound.Repository
{
    public sealed class FourSharedFileRepository : IFourSharedFileRepository
    {
        private readonly WeavesoundDbContext _db;

        public FourSharedFileRepository(WeavesoundDbContext db)
        {
            _db = db;
        }

        public void Dispose()
            => _db?.Dispose();

        public IEnumerable<FourSharedFile> Get()
            => _db.FourSharedFiles.ToList();

        public FourSharedFile Get(string id)
            => _db.FourSharedFiles.Find(id);

        public FourSharedFile Insert(FourSharedFile file)
        {
            _db.FourSharedFiles.Add(file);
            _db.SaveChanges();
            return file;
        }

        public void Update(string id, FourSharedFile file)
        {
            _db.Entry(file).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public bool Exists(string id)
            => Get(id) != null;
    }
}
