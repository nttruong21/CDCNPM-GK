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
    public class BillDetailController : ApiController
    {
        private BillDetailDAO billDetailDao;

        // POST
        [Route("api/billdetail")]
        [HttpPost]
        public IHttpActionResult Post(BillDetail billDetailItem)
        {
            billDetailDao = new BillDetailDAO();

            // Thêm tất cả các sản phẩm trong giỏ hàng
            // List<CartDetail> listAllProductsInCart = new CartDAO().getAll();

            if (billDetailDao.Create(billDetailItem))
            {
                return Ok(billDetailItem);
            }
            return BadRequest("Tạo hóa đơn chi tiết thất bại");
        }
    }
}
