using Microsoft.EntityFrameworkCore;

namespace ManageAPI.Model
{
    public class SchoolContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(@"Server=VN-MICHAEL\SQLEXPRESS;Database=Test;Trusted_Connection=True");
        }

        public DbSet<School> Schools { get; set; }
    }
}
