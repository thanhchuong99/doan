using System;
using System.Collections.Generic;

namespace coffee.dal.Models
{
    public partial class Discounts
    {
        public Discounts()
        {
            Orders = new HashSet<Orders>();
        }

        public int DiscountId { get; set; }
        public string DiscountName { get; set; }
        public double DiscountValue { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
