using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using coffee.bll;
using coffee.common.Req;
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
    public class ProductController : ControllerBase
    {
        public ProductController()
        {
            _svc = new ProductSvc();
        }
        [HttpPost("get-all-products")]
        public IActionResult GetAllProduct([FromBody]GetReq req)
        {
            try
            {
                var Pros = _svc.GetProduct(req.Keyword, req.Page, req.Size);
                if (!(Pros.Data is null))
                {

                    return Ok(Pros);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("get-all-products-by-cate")]
        public IActionResult GetProductByCate([FromBody]GetReq req)
        {
            try
            {
                var Pros = _svc.GetProductByCates(req.Keyword, req.Page, req.Size);
                if (!(Pros.Data is null))
                {

                    return Ok(Pros);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-product")]
        [Authorize]
        public IActionResult CreateProduct([FromBody]ProductReq req)
        {
            var res = _svc.CreateProduct(req);
            return Ok(res);
        }
        [HttpPost("update-product")]
        [Authorize]
        public IActionResult UpdateProduct([FromBody]ProductReq req)
        {
            var res = _svc.UpdateProduct(req);
            return Ok(res);
        }
        [HttpPost("delete-product")]
        [Authorize]
        public IActionResult DeleteProduct([FromBody]SimpleReq req)
        {
            var res = _svc.DeleteProduct(req.Id);
            return Ok(res);
        }
        [HttpPost("get-list-product")]
        public IActionResult GetListPro([FromBody]ListProReq req)
        {
            var res = _svc.GetListPro(req.Id);
            return Ok(res);
        }
        private readonly ProductSvc _svc;
    }
}