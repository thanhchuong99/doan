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
    public class OrderController : ControllerBase
    {
        public OrderController()
        {
            _svc = new OrderSvc();
        }
        [HttpPost("get-all-orders")]
        public IActionResult GetAllOrder([FromBody]GetReq req)
        {
            try
            {
                var Orders = _svc.GetOrder(req.Keyword, req.Page, req.Size);
                if (!(Orders.Data is null))
                {

                    return Ok(Orders);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("get-all-orders-by-user")]
        public IActionResult GetAllOrderByUser([FromBody]GetReq req)
        {
            try
            {
                var Orders = _svc.GetOrderByUser(req.Keyword, req.Page, req.Size);
                if (!(Orders.Data is null))
                {
                    return Ok(Orders);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody]OrderReq req)
        {
            var res = _svc.CreateOrder(req);
            return Ok(res);
        }
        [HttpPost("update-order")]
        public IActionResult UpdateOrder([FromBody]OrderReq req)
        {
            var res = _svc.UpdateOrder(req);
            return Ok(res);
        }
        [HttpPost("delete-order")]
        public IActionResult DeleteOrder([FromBody]SimpleReq req)
        {
            var res = _svc.DeleteOrder(req.Id);
            return Ok(res);
        }
        private readonly OrderSvc _svc;
    }
}