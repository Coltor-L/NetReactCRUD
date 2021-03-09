using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NetReactCrud.Models;

namespace NetReactCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationCandidateController : Controller
    {
        private readonly DonationDbContext _context;

        public DonationCandidateController(DonationDbContext context)
        {
            _context = context;
        }
        
        // GET: api/DonationCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationCandidate>>> GetDonationCandidates()
        {
            return await _context.Candidates.ToListAsync();
        }
        
        // GET: api/DonationCandidate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonationCandidate>> GetDonationCandidate(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);

            if (candidate == null)
            {
                return NotFound();
            }

            return candidate;
        }
        
        // Put: api/DonationCandidate/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonationCandidate(int id, DonationCandidate candidate)
        {
            candidate.Id = id;

            _context.Entry(candidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonationCandidateExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }
        
        // POST: api/DonationCandidate
        [HttpPost]
        public async Task<ActionResult<DonationCandidate>> PostDonationCandidate(DonationCandidate candidate)
        {
            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonationCandidate", new {id = candidate.Id}, candidate);
        }
        
        // DELETE: api/DonationCandidate/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DonationCandidate>> DeleteDonationCandidate(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);

            if (candidate == null)
            {
                return NotFound();
            }

            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();

            return candidate;
        }


        private bool DonationCandidateExists(int id)
        {
            return _context.Candidates.Any(e => e.Id == id);
        }
        
        
    }
}