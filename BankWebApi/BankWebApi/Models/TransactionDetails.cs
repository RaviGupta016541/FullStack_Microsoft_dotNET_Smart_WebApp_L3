using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BankWebApi.Models
{
    public class TransactionDetails
    {
        [Key]
        public int TransactionID { get; set; }
        public int FromAccountNumber { get; set; }
        public int ToAccountNumber { get; set; }
        public int Amount { get; set; }
        public DateTime TransactionDate { get; set; } = System.DateTime.Now;
    }
}
