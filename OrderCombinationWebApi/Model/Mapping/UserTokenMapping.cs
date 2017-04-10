using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OrderCombinationWebApi.Model.Mapping
{
    public class UserTokenMapping
    {
        public static void Config(EntityTypeBuilder<UserToken> EntityTypeBuilder)
        {

            EntityTypeBuilder.ToTable("UserToken");
            EntityTypeBuilder.HasKey(t => t.Id);

            EntityTypeBuilder.Property(t => t.Id).UseSqlServerIdentityColumn();
            // EntityTypeBuilder.HasOne(a => a.CreateUser).WithMany(a => a.CreateOders).HasForeignKey(a => a.CreateBy);
            // EntityTypeBuilder.HasOne(a => a.MergeUser).WithMany(a => a.MergerOrders).HasForeignKey(a => a.MergeBy);
        }
    }
}