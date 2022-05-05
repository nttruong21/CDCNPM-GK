using FootballShoesApi.DAO;
using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FootballShoesApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class CartController : ApiController
    {
        private CartDAO cartDao;

        // GET
        [Route("api/cart")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            cartDao = new CartDAO();
            return Ok(cartDao.getAll());
        }

        // GET COUNT
        [Route("api/cart/count")]
        [HttpGet]
        public IHttpActionResult GetCount()
        {
            cartDao = new CartDAO();
            return Ok(cartDao.GetCount());
        }

        // GET TOTAL PRICE
        [Route("api/cart/price/total")]
        [HttpGet]
        public IHttpActionResult GetTotalPrice()
        {
            cartDao = new CartDAO();
            return Ok(cartDao.getTotalPrice());
        }

        // POST
        [Route("api/cart")]
        [HttpPost]
        public IHttpActionResult Post(CartDetail cartItem)
        {
            cartDao = new CartDAO();

            // Product product = new ProductDAO().GetProductById((int)cartItem.productId);
            // cartItem.Product = product;

            if (cartDao.Create(cartItem))
            {
                return Ok(cartItem);
            }
            return BadRequest("Thêm sản phẩm vào giỏ hàng thất bại");
        }

        // DELETE
        [Route("api/cart")]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            cartDao = new CartDAO();

            CartDetail cartItem = cartDao.getById(id);

            if (cartItem == null)
            {
                return NotFound();
            }
            if (cartDao.removeItem(cartItem))
            {
                return Ok(id);
            }
            return BadRequest("Error");
        }
    }
}
