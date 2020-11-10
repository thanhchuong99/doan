using System;
using System.Collections.Generic;
using System.Text;

namespace coffee.common.Req
{
    public class ProductReq
    {
        public int ProductId { get; set; }
        public int? CategoryId { get; set; }
        public string ProductName { get; set; }
        public long? UnitPrice { get; set; }
        public string Description { get; set; }
        public int? Hot { get; set; }
    }
}