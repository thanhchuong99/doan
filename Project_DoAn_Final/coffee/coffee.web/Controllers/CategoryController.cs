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
    public class CategoryController : ControllerBase
    {
        public CategoryController()
        {
            _svc = new CategorySvc();
        }
        [HttpPost("get-all-categorys")]
        public IActionResult GetAllCategory([FromBody]GetReq req)
        {
            try
            {
                var Cates = _svc.GetCategory(req.Keyword, req.Page, req.Size);
                if (!(Cates.Data is null))
                {

                    return Ok(Cates);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-category")]
        public IActionResult CreateCategory([FromBody]CategoryReq req)
        {
            var res = _svc.CreateCategory(req);
            return Ok(res);
        }  
        [HttpPost("update-category")]
        public IActionResult UpdateCategory([FromBody]CategoryReq req)
        {
            var res = _svc.UpdateCategory(req);
            return Ok(res);
        }
        [HttpPost("delete-category")]
        public IActionResult DeleteCategory([FromBody]SimpleReq req)
        { 
            var res = _svc.DeleteCategory(req.Id);
            return Ok(res);
        }
        private readonly CategorySvc _svc;
    }
}