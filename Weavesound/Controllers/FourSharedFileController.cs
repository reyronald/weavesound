using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Weavesound.Model;
using Weavesound.Repository;

namespace Weavesound.Controllers
{
    public class FourSharedFileController : ApiController
    {
        private readonly IFourSharedFileRepository _repository;

        public FourSharedFileController(IFourSharedFileRepository repository)
        {
            _repository = repository;
        }

        // GET api/fourSharedFile
        public IEnumerable<FourSharedFile> Get()
            => _repository.Get();

        // GET api/fourSharedFile/5
        public FourSharedFile Get(string id)
            => _repository.Get(id);

        // POST api/fourSharedFile
        public FourSharedFile Post([FromBody]FourSharedFile file)
            => _repository.Insert(file);

        // PUT api/fourSharedFile/5
        public void Put(string id, [FromBody]FourSharedFile file)
            => _repository.Update(id, file);

        // DELETE api/fourSharedFile/5
        public void Delete(string id)
        {
            throw new NotSupportedException();
        }
    }
}
