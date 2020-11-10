using System;
using System.Collections.Generic;

namespace coffee.dal.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int ProductId { get; set; }
        public int? CategoryId { get; set; }
        public string ProductName { get; set; }
        public long? UnitPrice { get; set; }
        public string Description { get; set; }
        public int? Hot { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
