
using System.Linq;

namespace coffee.dal
{
    using coffee.Common.DAL;
    using coffee.Common.Rsp;
    using Models;
    using System;

    public class OrderRep : GenericRep<cofeeContext, Orders>
    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Orders Read(int id)
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
        public SingleRsp CreateOrder(Orders ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Orders.Add(ts);
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
        public SingleRsp UpdateOrder(Orders ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Orders.Update(ts);
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

        public object GetOrder(string keyword, int page, int size)
        {
            var orders = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                orders = orders.Where(e => e.OrderId.ToString().Contains(keyword));
            }
          
            var offset = (page - 1) * size;
            var total = orders.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = orders.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (orders.Any())
            {
                return res;
            }
            return null;
        }
        public object GetOrderByUser(string keyword, int page, int size)
        {
            var orders = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                orders = orders.Where(e => e.UserName.Contains(keyword));
            }

            var offset = (page - 1) * size;
            var total = orders.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = orders.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (orders.Any())
            {
                return res;
            }
            return null;
        }
        public SingleRsp DeleteOrder(int id)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        {
                            var t = context.Orders.Remove(context.Orders.FirstOrDefault(e => e.OrderId == id));
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