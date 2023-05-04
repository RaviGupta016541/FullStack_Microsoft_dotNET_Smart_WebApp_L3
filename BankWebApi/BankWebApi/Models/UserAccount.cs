using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BankWebApi.Models
{
    public class UserAccount
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int AccountNumber { get; set; }
        public string Password { get; set; }
        public float AccountBalance { get; set; }
        public string Location { get; set; }
        public string phone { get; set; }
        public bool isFreeze { get; set; }
        public bool isAdmin { get; set; }
        public DateTime CreatedDate { get; set; } = System.DateTime.Now;

    }
    public class Login
    {
        public int AccountNumber { get; set; }
        public string Password { get; set; }
    }
    public class UserResponce
    {
        public int userId { get; set; }
        public string UserName { get; set; }
        public int AccountNumber { get; set; }
        public float AccountBalance { get; set; }
        public bool isAdmin { get; set;}
        public string status { get; set;}
    }

   
}
