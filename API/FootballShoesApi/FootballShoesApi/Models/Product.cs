//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FootballShoesApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            this.BillDetails = new HashSet<BillDetail>();
            this.CartDetails = new HashSet<CartDetail>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public Nullable<int> size { get; set; }
        public Nullable<long> price { get; set; }
        public string image { get; set; }
        public Nullable<int> discount { get; set; }
        public string description { get; set; }
        public string information { get; set; }
        public string slug { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CartDetail> CartDetails { get; set; }
    }
}
