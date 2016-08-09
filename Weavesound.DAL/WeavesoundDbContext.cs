using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Weavesound.DAL.Migrations;
using Weavesound.Model;

namespace Weavesound.DAL
{
    public class WeavesoundDbContext : DbContext
    {
        public DbSet<FourSharedFile> FourSharedFiles { get; set; }
        
        public static WeavesoundDbContext Create()
            => new WeavesoundDbContext();

        public WeavesoundDbContext()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<WeavesoundDbContext, Configuration>());

            Configuration.AutoDetectChangesEnabled = true;
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
            
            Database.Log = s => Debug.WriteLine(s);
        }
    }
}
