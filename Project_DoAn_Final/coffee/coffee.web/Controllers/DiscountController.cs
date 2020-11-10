using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using coffee.bll;
using coffee.Common.Req;
using coffee.Common.Rsp;
using coffee.dal;
using coffee.dal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TraCuuDiemThiTHPTQG.Common.Req;

namespace coffee.Controllers
{

    //[Authorize(Policy = Policies.Admin)]
    [ApiController]
    [Route("[controller]")]
    public class DiscountController : ControllerBase
    {
        public DiscountController()
        {
            _svc = new DiscountSvc();
        }
        [HttpPost("get-all-discounts")]
        public IActionResult GetAllDiscount([FromBody]GetReq req)
        {
            try
            {
                var Dis = _svc.GetDiscounts(req.Keyword, req.Page, req.Size);
                if (!(Dis.Data is null))
                {

                    return Ok(Dis);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-discount")]
        public IActionResult CreateDiscount([FromBody]Discounts req)
        {
            var res = _svc.CreateDiscount(req);
            return Ok(res);
        }
        [HttpPost("update-discount")]
        public IActionResult UpdateDiscount([FromBody]Discounts req)
        {
            var res = _svc.UpdateDiscount(req);
            return Ok(res);
        }
        [HttpPost("delete-discount")]
        public IActionResult DeleteDiscount([FromBody]SimpleReq req)
        {
            var res = _svc.DeleteDiscount(req.Id);
            return Ok(res);
        }
        private readonly DiscountSvc _svc;
    }
}