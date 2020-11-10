using System;
using System.Collections.Generic;
using System.Text;

namespace coffee.common.Req
{
    public class UserReq
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public int RoleId { get; set; }

    }
}
