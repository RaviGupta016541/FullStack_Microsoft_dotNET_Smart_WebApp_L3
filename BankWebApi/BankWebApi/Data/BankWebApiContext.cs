using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BankWebApi.Models;

namespace BankWebApi.Data
{
    public class BankWebApiContext : DbContext
    {
        public BankWebApiContext (DbContextOptions<BankWebApiContext> options)
            : base(options)
        {
        }

        public DbSet<BankWebApi.Models.UserAccount> UserAccount { get; set; }

        public DbSet<BankWebApi.Models.TransactionDetails> TransactionDetails { get; set; }
    }
}
