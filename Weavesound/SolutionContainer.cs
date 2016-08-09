using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Weavesound.DAL;
using Weavesound.Repository;

namespace Weavesound
{
    internal static class SolutionContainer
    {
        private static IUnityContainer _instance = new UnityContainer();

        public static IUnityContainer Instance
        {
            get
            {
                // Remember to use a new HierarchicalLifetimeManager instance for classes that implement IDisposeable.
                _instance.RegisterType<DbContext, WeavesoundDbContext>(new HierarchicalLifetimeManager());
                
                _instance.RegisterType<WeavesoundDbContext>(new InjectionConstructor());
                
                _instance.RegisterType<IFourSharedFileRepository, FourSharedFileRepository>(new HierarchicalLifetimeManager());

                return _instance;
            }
        }
    }
}