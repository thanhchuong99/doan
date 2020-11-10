
using System.Linq;

namespace coffee.dal
{
    using coffee.Common.DAL;
    using coffee.Common.Rsp;
    using Microsoft.EntityFrameworkCore.Metadata.Internal;
    using Models;
    using System;

    public class OrderDetailRep : GenericRep<cofeeContext, OrderDetails>
    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override OrderDetails Read(int id)
        {
            var res = All.FirstOrDefault(p => p.OrderId == id);
            return res;
        }


        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public int Remove(int id)
        {
            var m = base.All.First(i => i.OrderId == id);
            m = base.Delete(m); //TODO
            return m.OrderId;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public SingleRsp CreateOrderDetail(OrderDetails ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.OrderDetails.Add(ts);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
        public SingleRsp UpdateOrderDetail(OrderDetails ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.OrderDetails.Update(ts);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public object GetOrderDetail(string id1,string id2, int page, int size)
        {
            var orderdetail = All;
            if(string.IsNullOrEmpty(id1) && string.IsNullOrEmpty(id2))
            {

            }
            else if (string.IsNullOrEmpty(id2))
            {
                orderdetail = orderdetail.Where(e => e.OrderId.ToString() == (id1));
            }
            else if (!string.IsNullOrEmpty(id1) && !string.IsNullOrEmpty(id2 ))
            {
                orderdetail = orderdetail.Where(e => e.OrderId.ToString() == (id1) );
                orderdetail = orderdetail.Where(e => e.ProductId.ToString() == (id2));
            }
            var offset = (page - 1) * size;
            var total = orderdetail.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = orderdetail.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (orderdetail.Any())
            {
                return res;
            }
            return null;
        }
        public SingleRsp DeleteOrderDetail(int orderid, int productid)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        {
                            var t = context.OrderDetails.Remove(context.OrderDetails.FirstOrDefault(e => e.OrderId == orderid && e.ProductId == productid));
                            context.SaveChanges();
                            tran.Commit();
                        }
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
        #endregion
    }
}