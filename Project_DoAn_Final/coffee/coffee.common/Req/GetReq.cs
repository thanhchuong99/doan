using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace coffee.Common.Req
{
    public class GetReq
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public string Keyword { get; set; }
    }
}
