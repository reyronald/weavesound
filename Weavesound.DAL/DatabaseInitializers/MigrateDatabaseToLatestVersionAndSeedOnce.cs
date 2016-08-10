using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Weavesound.DAL.Migrations;

namespace Weavesound.DAL.DatabaseInitializers
{
    /// <summary>
    /// If no database is created at startup, it will create one and perform a once time seed.
    /// If there is already one created, it will update its schema according to the current state of the DbContext's 
    /// models without dropping it, which means that it will retain previous data, without adding new one. 
    /// If this is used on an empty database, the deployed application will have an updated schema but without any data. 
    /// </summary>
    /// <typeparam name="TContext"></typeparam>
    /// <typeparam name="TConfig"></typeparam>
    /// <remarks>
    /// IMPORTANT: To use this option, your app's DbContext's Configuration must be set to AutomaticMigrationsEnabled = true. 
    /// If you don't set this, EF's Code First will try to use the migrations you've created, which will not necessarily 
    /// match with the migrations already applied to the existing database and an error will occur when EF try to access/update it.
    /// </remarks>
    internal class MigrateDatabaseToLatestVersionAndSeedOnce : MigrateDatabaseToLatestVersion<WeavesoundDbContext, Configuration>
    {
        public MigrateDatabaseToLatestVersionAndSeedOnce()
        {
        }

        public MigrateDatabaseToLatestVersionAndSeedOnce(string connectionStringName)
            : base(connectionStringName)
        {
        }

        public override void InitializeDatabase(WeavesoundDbContext context)
        {
            bool existed = context.Database.Exists();
            base.InitializeDatabase(context);

            if (!existed)
            {
                OneTimeSeed(context);
            }
        }

        /// <summary>
        /// This Seed method will run after initialization only if the database is not created on application startup.
        /// It is used to inject data necessary for production into the database (like Module info or User accounts).
        /// </summary>
        /// <param name="context"></param>
        private void OneTimeSeed(WeavesoundDbContext context)
        {
            Seeder.ProductionData(context);
            context.SaveChanges();
        }
    }
}
