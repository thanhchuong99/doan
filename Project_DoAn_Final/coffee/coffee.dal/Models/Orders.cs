using System;
using System.Collections.Generic;

namespace coffee.dal.Models
{
    public partial class Orders
    {
        public Orders()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int OrderId { get; set; }
        public string UserName { get; set; }
        public DateTime OrderDate { get; set; }
        public int? DiscountId { get; set; }
        public string ShipAddress { get; set; }

        public virtual Discounts Discount { get; set; }
        public virtual User UserNameNavigation { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
