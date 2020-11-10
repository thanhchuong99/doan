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
    public class CategorySvc : GenericSvc<CategoryRep, Category>

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
        public override SingleRsp Update(Category m)
        {
            var res = new SingleRsp();

            var m1 = m.CategoryId != null ? _rep.Read(m.CategoryId) : _rep.Read(m.CategoryId);
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
        public SingleRsp GetCategory(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetCategory(keyword, page, size);
            return res;
        }
        public SingleRsp CreateCategory(CategoryReq ts)
        {
            var res = new SingleRsp();
            Category cate = new Category();
            cate.CategoryId = ts.CategoryId;
            cate.CategoryName = ts.CategoryName;
            res = _rep.CreateCategory(cate);
            res.Data = cate;
            return res;
        }
        public SingleRsp UpdateCategory(CategoryReq ts)
        {
            var res = new SingleRsp();
            Category cate = new Category();
            cate.CategoryId = ts.CategoryId;
            cate.CategoryName = ts.CategoryName;
            res = _rep.UpdateCategory(cate);
            res.Data = cate;
            return res;
        }
        public SingleRsp DeleteCategory(int id)
        {
            var res = new SingleRsp();
            res = _rep.DeleteCategory(id);
            return res;
        }
        public CategorySvc() { }
    }
}
