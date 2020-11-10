
using System.Linq;

namespace coffee.dal
{
    using coffee.Common.DAL;
    using coffee.Common.Rsp;
    using Models;
    using System;

    public class DiscountRep : GenericRep<cofeeContext, Discounts>
    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Discounts Read(int id)
        {
            var res = All.FirstOrDefault(p => p.DiscountId == id);
            return res;
        }


        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public int Remove(int id)
        {
            var m = base.All.First(i => i.DiscountId == id);
            m = base.Delete(m); //TODO
            return m.DiscountId;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public SingleRsp CreateDiscount(Discounts ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Discounts.Add(ts);
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
        public SingleRsp UpdateDiscount(Discounts ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Discounts.Update(ts);
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

        public object GetDiscounts(string keyword, int page, int size)
        {
            var discounts = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                discounts = discounts.Where(e => e.DiscountId.ToString().Contains(keyword) || e.DiscountName.Contains(keyword));
            }
            var offset = (page - 1) * size;
            var total = discounts.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = discounts.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (discounts.Any())
            {
                return res;
            }
            return null;
        }
        public SingleRsp DeleteDiscount(int id)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        {
                            var t = context.Discounts.Remove(context.Discounts.FirstOrDefault(e => e.DiscountId == id));
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