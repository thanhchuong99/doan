using System;
using System.Collections.Generic;

namespace coffee.dal.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Orders>();
        }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public int RoleId { get; set; }

        public virtual Roles Role { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
