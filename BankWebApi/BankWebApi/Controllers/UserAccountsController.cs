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
    public class UserAccountsController : ControllerBase
    {
        private readonly BankWebApiContext _context;

        public UserAccountsController(BankWebApiContext context)
        {
            _context = context;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccount>>> GetUserAccount()
        {
            return await _context.UserAccount.ToListAsync();
        }

        // GET: api/UserAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAccount>> GetUserAccount(int id)
        {
            var userAccount = await _context.UserAccount.FindAsync(id);

            if (userAccount == null)
            {
                return NotFound();
            }
            userAccount.Password = "********";
            return userAccount;
        }
        // GET: api/UserAccounts/5

        [HttpGet("FreezeUnFreeze/{id}")]
        public async Task<IActionResult> FreezeUnFreeze(int id)
        {
            var userAccount = await _context.UserAccount.FindAsync(id);
            var isFreeze = userAccount.isFreeze;
            if (userAccount == null)
            {
                return NotFound("something wrong");
            }
            userAccount.isFreeze = !userAccount.isFreeze;
            _context.SaveChanges();
            return Ok("status changed");
        }
        [HttpGet("ResetPassword/{AccountNumber}/{oldPassword}/{newPassword}")]
        public async Task<IActionResult> ResetPassword(int AccountNumber, string oldPassword, string newPassword)
        {
            var userAccount = await _context.UserAccount.Where(s => s.AccountNumber == AccountNumber).FirstOrDefaultAsync();
            if (userAccount == null)
            {
                return NotFound("Account not found");
            }
            if (userAccount.Password != oldPassword)
            {
                return NotFound("Wrong old password");
            }
            userAccount.Password = newPassword;
            _context.SaveChanges();
            return Ok("Password updated");
        }

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccount userAccount)
        {
            if (id != userAccount.UserID)
            {
                return BadRequest();
            }

            _context.Entry(userAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserAccounts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        {
            var AccountAvailable = _context.UserAccount.Where(s => s.AccountNumber == userAccount.AccountNumber).FirstOrDefault();
            if (AccountAvailable != null)
            {
                return BadRequest("Already exist account number.");
            }
            userAccount.isFreeze = false;
            userAccount.isAdmin = false;
            _context.UserAccount.Add(userAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAccount", new { id = userAccount.UserID }, userAccount);
        }

        // DELETE: api/UserAccounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserAccount>> DeleteUserAccount(int id)
        {
            var userAccount = await _context.UserAccount.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }

            _context.UserAccount.Remove(userAccount);
            await _context.SaveChangesAsync();

            return userAccount;
        }

        private bool UserAccountExists(int id)
        {
            return _context.UserAccount.Any(e => e.UserID == id);
        }

        [HttpPost("UserLogin")]
        public IActionResult UserLogin(Login login)
        {
            UserResponce userResponce = new UserResponce();
            var userAvailable = _context.UserAccount.Where(s => s.AccountNumber == login.AccountNumber && s.Password == login.Password).FirstOrDefault();
            
            if (userAvailable != null)
            {
                userResponce.AccountNumber = userAvailable.AccountNumber;
                userResponce.UserName = userAvailable.UserName;
                userResponce.AccountBalance = userAvailable.AccountBalance;
                userResponce.userId = userAvailable.UserID;
                userResponce.isAdmin = userAvailable.isAdmin;
                if (userAvailable.isFreeze)
                {
                userResponce.status = "freezed";
                }
                else
                userResponce.status = "success";
            }
            else
            {
                userResponce.userId = 0;
                userResponce.AccountNumber = 0;
                userResponce.AccountBalance = 0;
                userResponce.UserName = "";
                userResponce.isAdmin = false;
                userResponce.status = "failed";
            }
            return Ok(userResponce);
        }

        //[Route("getAccountBalance/{getAccountBalance}")]
        [HttpGet("getAccountBalance")]
        public IActionResult getBalance(int AccountNumber)
        {
            var message="";
            var accountBalance = _context.UserAccount.Where(s => s.AccountNumber == AccountNumber).FirstOrDefault();
            if (accountBalance == null)
            {
                message = "Incorrect Account Number";
                
                return Ok(new ObjectResult(new { message = message }));
            }

            message = "success";
            return Ok(
                new ObjectResult(new { accountBalance = accountBalance.AccountBalance, message = message })
                );
        }
    }
}
