using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Weavesound.Model
{
    public class FourSharedFile
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }
        public DateTime Modified { get; set; }
        public string Description { get; set; }
        public object Tags { get; set; }
        public string Path { get; set; }
        public string ParentId { get; set; }
        public string DownloadPage { get; set; }
        public string OwnerId { get; set; }
        public string MimeType { get; set; }
        public string Exif { get; set; }
        public string Md5 { get; set; }
        public bool OwnerOnly { get; set; }
        public string Status { get; set; }
        public string VirusScanResult { get; set; }
        public string Id3 { get; set; }
    }
}
