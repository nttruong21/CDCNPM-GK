using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballShoesApi.DAO
{
    public class BillDAO
    {
        private FSEntities db;
        public BillDAO()
        {
            db = new FSEntities();
        }

        // GET ALL
        public List<Bill> GetAllBills()
        {
            return db.Bills.ToList();
        }

        // GET ONE BY ID
        public Bill GetById(int id)
        {
            return db.Bills.FirstOrDefault(x => x.id == id);
        }

        // CREATE
        public bool Create(Bill newBill)
        {
            try
            {
                db.Bills.Add(newBill);
                db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // UPDATE
        public bool Update(Bill newBill)
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
    }
}