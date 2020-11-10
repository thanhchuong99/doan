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
    public class ProductSvc : GenericSvc<ProductRep, Product>

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
        public override SingleRsp Update(Product m)
        {
            var res = new SingleRsp();

            var m1 = m.ProductId != null ? _rep.Read(m.ProductId) : _rep.Read(m.ProductId);
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
        public SingleRsp GetProduct(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetProduct(keyword, page, size);
            return res;
        }
        public SingleRsp GetProductByCates(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetProductByCates(keyword, page, size);
            return res;
        }
        public SingleRsp CreateProduct(ProductReq ts)
        {
            var res = new SingleRsp();
            Product product = new Product();
            product.ProductId = ts.ProductId;
            product.CategoryId = ts.CategoryId;
            product.ProductName = ts.ProductName;
            product.UnitPrice = ts.UnitPrice;
            product.Description = ts.Description;
            product.Hot = ts.Hot;
            res = _rep.CreateProduct(product);
            res.Data = product;
            return res;
        }
        public SingleRsp UpdateProduct(ProductReq ts)
        {
            var res = new SingleRsp();
            Product product = new Product();
            product.ProductId = ts.ProductId;
            product.CategoryId = ts.CategoryId;
            product.ProductName = ts.ProductName;
            product.UnitPrice = ts.UnitPrice;
            product.Description = ts.Description;
            product.Hot = ts.Hot;
            res = _rep.UpdateProduct(product);
            res.Data = product;
            return res;
        }
        public SingleRsp DeleteProduct(int id)
        {
            var res = new SingleRsp();
            res = _rep.DeleteProduct(id);
            return res;
        }
        public SingleRsp GetListPro(string[] id)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetListPro(id);
            return res;
        }
        public ProductSvc() { }
    }
}
