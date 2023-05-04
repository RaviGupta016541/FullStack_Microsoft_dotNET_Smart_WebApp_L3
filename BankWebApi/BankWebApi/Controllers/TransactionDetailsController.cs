using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankWebApi.Data;
using BankWebApi.Models;

namespace BankWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionDetailsController : ControllerBase
    {
        private readonly BankWebApiContext _context;

        public TransactionDetailsController(BankWebApiContext context)
        {
            _context = context;
        }

        // GET: api/TransactionDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDetails>>> GetTransactionDetails()
        {
            return await _context.TransactionDetails.ToListAsync();
        }

        // GET: api/TransactionDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDetails>> GetTransactionDetails(int id)
        {
            var transactionDetails = await _context.TransactionDetails.FindAsync(id);

            if (transactionDetails == null)
            {
                return NotFound();
            }

            return transactionDetails;
        }
        //[Route("api/[controller]/GetTransactionByAccountNumber")]
        [HttpGet("GetTransactionByAccountNumber/{accountNumber}")]
        public async Task<ActionResult<IEnumerable<TransactionDetails>>> GetTransactionByAccountNumber(int accountNumber)
        {
            var transactionDetails = await _context.TransactionDetails.Where(s=>s.FromAccountNumber==accountNumber || s.ToAccountNumber == accountNumber).OrderByDescending (s=>s.TransactionDate).ToListAsync();

            if (transactionDetails == null)
            {
                return NotFound("No transaction found");
            }

            return transactionDetails;
        }

        

        // POST: api/TransactionDetails
        [HttpPost]
        public async Task<ActionResult<TransactionDetails>> PostTransactionDetails(TransactionDetails transactionDetails)
        {
            var findReceiver = _context.UserAccount.Where(s => s.AccountNumber == transactionDetails.ToAccountNumber && s.isFreeze!=true).FirstOrDefault();
            if(findReceiver == null)
            {
                return BadRequest("Incorrect account number of receiver.");
            }
            var currentMoney= _context.UserAccount.Where(s => s.AccountNumber == transactionDetails.FromAccountNumber && s.isFreeze != true).Select(s=>s.AccountBalance).FirstOrDefault();
            if (currentMoney < transactionDetails.Amount)
            {
                return BadRequest("Insufficent money in your account.");
            }
            var makeTransaction=DoTransaction(transactionDetails.FromAccountNumber, transactionDetails.ToAccountNumber, transactionDetails.Amount);
            if (!makeTransaction)
            {
                return BadRequest("Failed");
            }
            _context.TransactionDetails.Add(transactionDetails);
            await _context.SaveChangesAsync();          
            return Ok("success");
        }

        
        private bool DoTransaction(int FromAccount,int ToAccount,int Ammount)
        {
            var deduct = _context.UserAccount.Where(s => s.AccountNumber == FromAccount).FirstOrDefault();
            if (deduct == null)
            {
                return false;
            }
            deduct.AccountBalance = deduct.AccountBalance - Ammount;
            var credit = _context.UserAccount.Where(s => s.AccountNumber == ToAccount).FirstOrDefault();
            if (credit == null)
            {
                return false;
            }
            credit.AccountBalance +=  Ammount;
            var k=_context.SaveChanges();
            return true;
        }
        
    }
}
