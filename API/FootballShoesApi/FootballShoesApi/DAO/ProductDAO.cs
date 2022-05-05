using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballShoesApi.DAO
{
    public class ProductDAO
    {
        private FSEntities db;
        public ProductDAO()
        {
            db = new FSEntities();
        }

        // Create
        public bool Create(Product newProduct)
        {
            try
            {
                db.Products.Add(newProduct);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Update
        public bool Update(Product productObj)
        {
            try
            {
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Remove
        public bool Remove(Product productObj)
        {
            try
            {
                db.Products.Remove(productObj);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Get all
        public List<Product> GetAllProducts()
        {
            return db.Products.ToList();
        }

        // Get all discount products
        public List<Product> getDiscountProducts()
        {
            return db.Products.OrderByDescending(x => x.discount).Where(x => x.discount > 0).ToList();
        }

        // Get one product by id
        public Product GetProductById(int id)
        {
            return db.Products.FirstOrDefault(x => x.id == id);
        }

        // Get one product by slug
        public Product GetProductBySlug(string slug)
        {
            return db.Products.FirstOrDefault(x => x.slug.Equals(slug));
        }

        // Get num of row items
        public int GetCount()
        {
            return db.Products.ToList().Count();
        }

        // Get max id
        public int getMaxId()
        {
            var list = db.Products.ToList();
            if (list.Count > 0)
            {
                return list.Last().id;
            }
            else
            {
                return 0;
            }

        }
    }
}