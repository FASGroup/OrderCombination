using Microsoft.EntityFrameworkCore;
using OrderCombinationWebApi.Model;
using OrderCombinationWebApi.Model.Mapping;

namespace DataAccess.OrderCombinationWebApi.DataAccess
{
    public class OrderCombinationDbContext : DbContext
    {
       public OrderCombinationDbContext(DbContextOptions<OrderCombinationDbContext> options)
            : base(options)
        {

        }

        public DbSet<UserToken> UserTokens {get;set;}
        public DbSet<User> Users {get;set;}
        public DbSet<OrderInfo> OrderInfos {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            OrderInfoMapping.Config(builder.Entity<OrderInfo>());
            UserTokenMapping.Config(builder.Entity<UserToken>());
            UserMapping.Config(builder.Entity<User>());
        }
    }
}