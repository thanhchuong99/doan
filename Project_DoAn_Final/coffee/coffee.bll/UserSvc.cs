using coffee.Common.BLL;
using coffee.dal.Models;
using coffee.dal;
using System;
using System.Collections.Generic;
using System.Text;
using coffee.Common.Rsp;
using coffee.Common.Req;
using coffee.common.Req;

namespace coffee.bll
{
    public class UserSvc : GenericSvc<UserRep, User>

    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();

            var m = _rep.Read(id);
            res.Data = m;

            return res;
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(User m)
        {
            var res = new SingleRsp();

            var m1 = m.UserName != null ? _rep.Read(m.UserName) : _rep.Read(m.UserName);
            if (m1 == null)
            {
                res.SetError("EZ103", "No data.");
            }
            else
            {
                res = base.Update(m);
                res.Data = m;
            }

            return res;
        }

        #endregion
        public SingleRsp GetUser(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetUser(keyword, page, size);
            return res;
        }
        public SingleRsp CreateUser(UserReq ts)
        {
            var res = new SingleRsp();
            User user = new User();
            user.UserName = ts.UserName;
            user.Password = ts.Password;
            user.FullName = ts.FullName;
            user.Location = ts.Location;
            user.Phone = ts.Phone;
            user.RoleId = ts.RoleId;
            res = _rep.CreateUser(user);
            res.Data = user;
            return res;
        }
        public SingleRsp UpdateUser(UserReq ts)
        {
            var res = new SingleRsp();
            User user = new User();
            user.UserName = ts.UserName;
            user.Password = ts.Password;
            user.FullName = ts.FullName;
            user.Location = ts.Location;
            user.Phone = ts.Phone;
            user.RoleId = ts.RoleId;
            res = _rep.UpdateUser(user);
            res.Data = user;
            return res;
        }
        public UserSvc() { }
    }
}
