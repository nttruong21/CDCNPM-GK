using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballShoesApi.DAO
{
    public class CartDAO
    {
        private FSEntities db;
        public CartDAO()
        {
            db = new FSEntities();
        }

        // GET ALL
        public List<CartDetail> getAll()
        {
            return db.CartDetails.ToList();
        }

        // GET ONE BY ID
        public CartDetail getById(int id)
        {
            return db.CartDetails.FirstOrDefault(x => x.id == id);
        }

        // CREATE
        public bool Create(CartDetail newItem)
        {
            try
            {
                db.CartDetails.Add(newItem);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // GET COUNT
        public int GetCount()
        {
            return db.CartDetails.ToList().Count();
        }

        // GET TOTAL PRICE
        public long getTotalPrice()
        {
            return db.CartDetails.Sum(x => x.price) != null ? (long)db.CartDetails.Sum(x => x.price) : 0;
        }

        // REMOVE
        public bool removeItem(CartDetail item)
        {
            try
            {
                db.CartDetails.Remove(item);
                db.SaveChanges();
                return true;
            } catch
            {
                return false;
            }
        }
    }
}