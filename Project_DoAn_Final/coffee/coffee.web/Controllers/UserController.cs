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
namespace coffee.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public UserController()
        {
            _svc = new UserSvc();
        }
        [HttpPost("get-all-User")]
        [Authorize]
        public IActionResult GetAllUser([FromBody]GetReq req)
        {
            try
            {
                var Users = _svc.GetUser(req.Keyword, req.Page, req.Size);
                if (!(Users.Data is null))
                {

                    return Ok(Users);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from database");
            }
        }
        [HttpPost("create-admin")]
        [Authorize(Policy = Policies.Admin)]
        public IActionResult CreateUserAdmin([FromBody]UserReq req)
        {

            SHA256 sha256 = SHA256Managed.Create(); //utf8 here as well
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(req.Password));
            req.Password = Convert.ToBase64String(bytes);
            var res = _svc.CreateUser(req);
            return Ok(res);



        }
        [HttpPost("create-user")]
        
        public IActionResult CreateUser([FromBody]UserReq req)
        {

            SHA256 sha256 = SHA256Managed.Create(); //utf8 here as well
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(req.Password));
            req.Password = Convert.ToBase64String(bytes);
            req.RoleId = 2;
            var res = _svc.CreateUser(req);
            return Ok(res);


        }
        [HttpPost("update-user")]
        [Authorize]
        public IActionResult UpdateUser([FromBody]UserReq req)
        {
            SHA256 sha256 = SHA256Managed.Create(); //utf8 here as well
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(req.Password));
            req.Password = Convert.ToBase64String(bytes);
            var res = _svc.UpdateUser(req);
            return Ok(res);
        }

        private readonly UserSvc _svc;
    }
}