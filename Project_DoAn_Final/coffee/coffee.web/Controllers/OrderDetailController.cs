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
    public class OrderDetailController : ControllerBase
    {
        public OrderDetailController()
        {
            _svc = new OrderDetailSvc();
        }
        [HttpPost("get-all-orderdetail")]
        public IActionResult GetAllOrderDetail([FromBody]GetOrderDetailReq req)
        {
            try
            {
                var OrderDetail = _svc.GetOrderDetail(req.id1,req.id2, req.Page, req.Size);
                if (!(OrderDetail.Data is null))
                {

                    return Ok(OrderDetail);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-orderdetail")]
        public IActionResult CreateOrderDetail([FromBody]OrderDetailReq req)
        {
            var res = _svc.CreateOrderDetail(req);
            return Ok(res);
        }
        [HttpPost("update-orderdetail")]
        public IActionResult UpdateOrderDetail([FromBody]OrderDetailReq req)
        {
            var res = _svc.UpdateOrderDetail(req);
            return Ok(res);
        }
        [HttpPost("delete-orderdetail")]
        public IActionResult DeleteOrderDetail([FromBody]OrderDetailReq req)
        {
            var res = _svc.DeleteOrderDetail(req.OrderId , req.ProductId );
            return Ok(res);
        }
        private readonly OrderDetailSvc _svc;
    }
}