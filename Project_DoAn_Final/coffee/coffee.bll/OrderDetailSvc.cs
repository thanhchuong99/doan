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
    public class OrderDetailSvc : GenericSvc<OrderDetailRep, OrderDetails>

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
        public override SingleRsp Update(OrderDetails m)
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
        public SingleRsp GetOrderDetail(string id1,string id2, int page, int size)
        {
            var res = new SingleRsp();
             res.Data = _rep.GetOrderDetail(id1,id2, page, size);
            return res;
        }
        public SingleRsp CreateOrderDetail(OrderDetailReq ts)
        {
            var res = new SingleRsp();
            OrderDetails orderdetail = new OrderDetails();
            orderdetail.OrderId = ts.OrderId;
            orderdetail.ProductId = ts.ProductId;
            orderdetail.Quantity = ts.Quantity;
            res = _rep.CreateOrderDetail(orderdetail);
            res.Data = orderdetail;
            return res;
        }
        public SingleRsp UpdateOrderDetail(OrderDetailReq ts)
        {
            var res = new SingleRsp();
            OrderDetails orderdetail = new OrderDetails();
            orderdetail.OrderId = ts.OrderId;
            orderdetail.ProductId = ts.ProductId;
            orderdetail.Quantity = ts.Quantity;
            res = _rep.UpdateOrderDetail(orderdetail);
            res.Data = orderdetail;
            return res;
        }
        public SingleRsp DeleteOrderDetail(int orderid, int productid)
        {
            var res = new SingleRsp();
            res = _rep.DeleteOrderDetail(orderid,productid);
            return res;
        }
        public OrderDetailSvc() { }
    }
}
