using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Weavesound.Model;

namespace Weavesound.DAL
{
    internal static partial class Seeder
    {
        /// <summary>
        /// Include here data needed for production.
        /// </summary>
        /// <param name="context"></param>
        internal static void ProductionData(WeavesoundDbContext context)
        {
            string json = Encoding.UTF8.GetString(Properties.Resources.seed);
            FourSharedFile[] files = JsonConvert.DeserializeObject<FourSharedFile[]>(json);

            foreach (FourSharedFile file in files)
            {
                context.FourSharedFiles.AddOrUpdate(file);
            }
        }
    }
}
