using FootballShoesApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FootballShoesApi.DAO
{
    public class BillDetailDAO
    {
        private FSEntities db;
        public BillDetailDAO()
        {
            db = new FSEntities();
        }

        // CREATE
        public bool Create(BillDetail newBillDetail)
        {
            try
            {
                db.BillDetails.Add(newBillDetail);
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