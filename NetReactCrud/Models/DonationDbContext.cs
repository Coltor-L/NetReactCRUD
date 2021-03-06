using Microsoft.EntityFrameworkCore;

namespace NetReactCrud.Models
{
    public class DonationDbContext: DbContext
    {
        public DonationDbContext(DbContextOptions<DonationDbContext> options):base(options)
        {
            
        }

        public DbSet<DonationCandidate> Candidate { get; set; }
        
    }
}