
using System.Linq;

namespace coffee.dal
{
    using coffee.Common.DAL;
    using coffee.Common.Rsp;
    using Models;
    using System;

    public class UserRep : GenericRep<cofeeContext, User>
    {
        #region -- Overrides --

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override User Read(string id)
        {
            var res = All.FirstOrDefault(p => p.UserName == id);
            return res;
        }


        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public string Remove(string id)
        {
            var m = base.All.First(i => i.UserName == id);
            m = base.Delete(m); //TODO
            return m.UserName;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public SingleRsp CreateUser(User ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        if ((context.User.Where(e => e.UserName == ts.UserName)).Any())
                        {
                            res.SetError("1","UserName đã tồn tại!!!");
                        }
                        else
                        {
                            var t = context.User.Add(ts);
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
        public SingleRsp UpdateUser(User ts)
        {
            var res = new SingleRsp();
            using (var context = new cofeeContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                            var t = context.User.Update(ts);
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
      
        public object GetUser(string keyword, int page, int size)
        {
            var Users = All;
            if (!string.IsNullOrEmpty(keyword))
            {
                Users = Users.Where(e => e.UserName.Contains(keyword));
            }
            var offset = (page - 1) * size;
            var total = Users.Count();
            int totalPage = (total % size) == 0 ? (total / size) : (int)((total / size) + 1);
            var data = Users.Skip(offset).Take(size).ToList();
            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPage = totalPage,
                Page = page,
                Size = size
            };
            if (Users.Any())
            {
                return res;
            }
            return null;
        }
        #endregion
    }
}