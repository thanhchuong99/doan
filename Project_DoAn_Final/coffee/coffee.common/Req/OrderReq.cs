using System;
using System.Collections.Generic;
using System.Text;

namespace coffee.common.Req
{
    public class OrderReq
    {
        public int OrderId { get; set; }
        public string UserName { get; set; }
        public DateTime OrderDate { get; set; }
        public int? DiscountId { get; set; }
        public string ShipAddress { get; set; }
    }
}
