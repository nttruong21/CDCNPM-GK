using FootballShoesApi.DAO;
using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FootballShoesApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000/", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        private ProductDAO productDao;

        // GET ALL
        [Route("api/product")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            productDao = new ProductDAO();
            return Ok(productDao.GetAllProducts());
        }

        // GET DISCOUNT
        [Route("api/product/discount")]
        [HttpGet]
        public IHttpActionResult GetDiscount()
        {
            productDao = new ProductDAO();
            return Ok(productDao.getDiscountProducts());
        }

        // GET ONE
        [Route("api/product")]
        [HttpGet]
        public IHttpActionResult Get(string slug)
        {
            productDao = new ProductDAO();
            return Ok(productDao.GetProductBySlug(slug));
        }

        // POST
        public async Task<IHttpActionResult> Post()
        {
            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                productDao = new ProductDAO();

                // Read the form data
                await Request.Content.ReadAsMultipartAsync(provider);

                // Get image and save
                //foreach (MultipartFileData file in provider.FileData){}
                if (provider.FileData.Count <= 0)
                {
                    return BadRequest("0-Image is invalid");
                }
                MultipartFileData fileUpload = provider.FileData[0];
                string fileName = fileUpload.Headers.ContentDisposition.FileName;
                if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                {
                    fileName = fileName.Trim('"');
                }
                if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                {
                    fileName = Path.GetFileName(fileName);
                }
                var listAllProduct = productDao.GetAllProducts();
                int id = listAllProduct.Count > 0 ? (listAllProduct.Last().id + 1) : 1;
                string imageName = "product-" + id.ToString() + "." + fileName.Split('.')[fileName.Split('.').Length - 1];
                string path = Path.Combine(HostingEnvironment.MapPath("~/public/image"), imageName);
                File.Move(fileUpload.LocalFileName, path);

                // Validate
                //if (provider.FormData.GetValues("name") == null)
                //{
                //    return BadRequest("0-Name is invalid");
                //}
                //if (provider.FormData.GetValues("size") == null)
                //{
                //    return BadRequest("0-Size is invalid");
                //}
                //if (provider.FormData.GetValues("price") == null)
                //{
                //    return BadRequest("0-Price is invalid");
                //}
                //if (provider.FormData.GetValues("discount") == null)
                //{
                //    return BadRequest("0-Price is invalid");
                //}
                //if (provider.FormData.GetValues("information") == null)
                //{
                //    return BadRequest("0-Price is invalid");
                //}

                // Create product object and bind data
                Product productObj = new Product();
                productObj.name = provider.FormData.GetValues("name")[0];
                // productObj.color = provider.FormData.GetValues("color")[0];
                productObj.size = Int32.Parse(provider.FormData.GetValues("size")[0]);
                productObj.price = long.Parse(provider.FormData.GetValues("price")[0]);
                productObj.discount = Int32.Parse(provider.FormData.GetValues("discount")[0]);
                productObj.information = provider.FormData.GetValues("information")[0];
                productObj.image = imageName;
                //foreach (var key in provider.FormData.AllKeys)
                //{
                //    foreach (var val in provider.FormData.GetValues(key))
                //    {
                //        Console.WriteLine(string.Format("{0}: {1}", key, val));
                //    }
                //}

                // Create product
                if (productDao.Create(productObj))
                {
                    return Ok("1-Create new product successed");
                }
                else
                {
                    return BadRequest("0-Create product failed");
                }


            }
            catch (System.Exception e)
            {
                return BadRequest("0-Has error");
            }
            
        }

        // PUT
        public IHttpActionResult Put(int id, Product productObj)
        {
            productDao = new ProductDAO();

            // Kiểm tra xem shoes có tồn tại không 
            var productTmp = productDao.GetProductById(id);
            if (productTmp == null)
            {
                return NotFound();
            }
            productTmp.name = productObj.name;
            productTmp.price = productObj.price;
            productTmp.size = productObj.size;
            productTmp.discount = productObj.discount;
            productTmp.information = productObj.information;
            // ...

            if (productDao.Update(productTmp))
            {
                return Ok(productTmp);
            }
            return BadRequest("Cập nhật sản phẩm thất bại");
        }

        // DELETE
        public IHttpActionResult Delete(int id)
        {
            productDao = new ProductDAO();

            var productTmp = productDao.GetProductById(id);
            if (productTmp == null)
            {
                return NotFound();
            }
            if (productDao.Remove(productTmp))
            {
                return Ok("Xóa sản phẩm thành công");
            }
            return BadRequest("Xóa sản phẩm thất bại");
        }
    }
}
