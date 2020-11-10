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
    public class OrderSvc : GenericSvc<OrderRep, Orders>

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
        public override SingleRsp Update(Orders m)
        {
            var res = new SingleRsp();

            var m1 = m.OrderId != null ? _rep.Read(m.OrderId) : _rep.Read(m.OrderId);
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
        public SingleRsp GetOrder(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetOrder(keyword, page, size);
            return res;
        }
        public SingleRsp GetOrderByUser(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetOrderByUser(keyword, page, size);
            return res;
        }
        public SingleRsp CreateOrder(OrderReq ts)
        {
            var res = new SingleRsp();
            Orders orders = new Orders();
            orders.OrderId = ts.OrderId;
            orders.UserName = ts.UserName;
            orders.OrderDate = ts.OrderDate;
            orders.DiscountId = ts.DiscountId;
            orders.ShipAddress = ts.ShipAddress;
            res = _rep.CreateOrder(orders);
            res.Data = orders;
            return res;
        }
        public SingleRsp UpdateOrder(OrderReq ts)
        {
            var res = new SingleRsp();
            Orders orders = new Orders();
            orders.OrderId = ts.OrderId;
            orders.UserName = ts.UserName;
            orders.OrderDate = ts.OrderDate;
            orders.DiscountId = ts.DiscountId;
            orders.ShipAddress = ts.ShipAddress;
            res = _rep.UpdateOrder(orders);
            res.Data = orders;
            return res;
        }
        public SingleRsp DeleteOrder(int id)
        {
            var res = new SingleRsp();
            res = _rep.DeleteOrder(id);
            return res;
        }
        public OrderSvc() { }
    }
}
