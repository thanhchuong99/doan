using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace coffee.Common.Req
{
    public class GetOrderDetailReq
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public string id1 { get; set; }
        public string id2 { get; set; }
    }
}
