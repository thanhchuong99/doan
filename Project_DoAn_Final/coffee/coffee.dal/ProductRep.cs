
using System.Linq;

namespace coffee.dal
{
    using coffee.Common.DAL;
    using coffee.Common.Rsp;
    using Models;
    using System;
    using System.Collections.Generic;

    public class ProductRep : GenericRep<cofeeContext, Product>
    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Product Read(int id)
        {
            var res = All.FirstOrDefault(p => p.ProductId == id);
            return res;
        }


        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public int Remove(int id)
        {
            var m = base.All.First(i => i.ProductId == id);
            m = base.Delete(m); //TODO
            return m.ProductId;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public SingleRsp CreateProduct(Product ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Product.Add(ts);
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
        public SingleRsp UpdateProduct(Product ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Product.Update(ts);
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

        public object GetProduct(string keyword, int page, int size)
        {
            var Cates = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                Cates = Cates.Where(e => e.ProductId.ToString().Contains(keyword));
            }
            var offset = (page - 1) * size;
            var total = Cates.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = Cates.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (Cates.Any())
            {
                return res;
            }
            return null;
        }
        public object GetProductByCates(string keyword, int page, int size)
        {
            var Cates = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                Cates = Cates.Where(e => e.CategoryId.ToString().Contains(keyword));
            }
            var offset = (page - 1) * size;
            var total = Cates.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = Cates.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (Cates.Any())
            {
                return res;
            }
            return null;
        }
        public object GetListPro(string[] keyword)
        {
            var Cates = All;
            List<Product> query;
            if (keyword.Length > 0)
            {
                 query = (from p in Cates where keyword.Contains(p.ProductId.ToString()) select p).ToList();
                return query;
            }
            return null;
        }
        public SingleRsp DeleteProduct(int id)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        {
                            var t = context.Product.Remove(context.Product.FirstOrDefault(e => e.ProductId == id));
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