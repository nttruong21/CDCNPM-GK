using FootballShoesApi.DAO;
using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FootballShoesApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class BillController : ApiController
    {
        private BillDAO billDao;

        //GET
        [Route("api/bill")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            billDao = new BillDAO();
            return Ok(billDao.GetAllBills());
        }

        // POST
        [Route("api/bill")]
        [HttpPost]
        public IHttpActionResult Post(Bill newBill)
        {
            billDao = new BillDAO();

            if (billDao.Create(newBill))
            {
                return Ok(newBill);
            }
            return BadRequest("Thêm sản phẩm vào giỏ hàng thất bại");
        }

        // PUT
        [Route("api/bill")]
        [HttpPut]
        public IHttpActionResult Put(int id)
        {
            billDao = new BillDAO();

            Bill bill = billDao.GetById(id);
            bill.status = 1;

            if (billDao.Update(bill))
            {
                return Ok(bill);
            }
            return BadRequest("Cập nhật đơn hàng thất bại");
        }
    }
}
