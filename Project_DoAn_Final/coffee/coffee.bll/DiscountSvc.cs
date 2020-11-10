using coffee.Common.BLL;
using coffee.dal.Models;
using coffee.dal;
using System;
using System.Collections.Generic;
using System.Text;
using coffee.Common.Rsp;
using coffee.Common.Req;

namespace coffee.bll
{
    public class DiscountSvc : GenericSvc<DiscountRep, Discounts>

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
        public override SingleRsp Update(Discounts m)
        {
            var res = new SingleRsp();

            var m1 = m.DiscountId != null ? _rep.Read(m.DiscountId) : _rep.Read(m.DiscountId);
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
        public SingleRsp GetDiscounts(string keyword, int page, int size)
        {
            var res = new SingleRsp();
            res.Data = _rep.GetDiscounts(keyword, page, size);
            return res;
        }
        public SingleRsp CreateDiscount(Discounts ts)
        {
            var res = new SingleRsp();
            Discounts discounts = new Discounts();
            discounts.DiscountId = ts.DiscountId;
            discounts.DiscountName = ts.DiscountName;
            discounts.DiscountValue = ts.DiscountValue;
            res = _rep.CreateDiscount(discounts);
            res.Data = discounts;
            return res;
        }
        public SingleRsp UpdateDiscount(Discounts ts)
        {
            var res = new SingleRsp();
            Discounts discounts = new Discounts();
            discounts.DiscountId = ts.DiscountId;
            discounts.DiscountName = ts.DiscountName;
            discounts.DiscountValue = ts.DiscountValue;
            res = _rep.CreateDiscount(discounts);
            res.Data = discounts;
            return res;
        }
        public SingleRsp DeleteDiscount(int id)
        {
            var res = new SingleRsp();
            res = _rep.DeleteDiscount(id);
            return res;
        }
        public DiscountSvc() { }
    }
}
