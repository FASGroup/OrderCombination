using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderCombinationWebApi.Common;
using OrderCombinationWebApi.Model;

namespace OrderCombinationWebApi.Controllers
{
    public class OrderController : BaseController
    {
        public OrderController(OrderCombinationDbContext orderCombinationDbContext) :
        base(orderCombinationDbContext)
        {

        }

        ///<summary>
        /// 获取未合并订单列表
        ///</summary>
        ///<returns>
        /// 未合并订单集合
        ///</returns>
        [HttpGet]
        [Route("GetUnMergeList")]
        public async Task<List<OrderInfo>> GetUnMergeList()
        {
            return await this.orderCombinationDbContext.OrderInfos
                 .Where(a => a.State == (int)CommonValue.OrderState.UnMerge).AsNoTracking().ToListAsync();
        }

        [HttpGet]
        [Route("GetMergeOrder")]
        public async Task<MergeOrder> GetMergeOrder(string mergeId)
        {
            var mergeOrder = new MergeOrder(){MergeId=mergeId};
            mergeOrder.MergeOrderList = await this.orderCombinationDbContext.OrderInfos
                    .Where(a=>a.MergeId == mergeId).AsNoTracking().ToListAsync();

            return mergeOrder;
        }

        ///<summary>
        /// 合并订单
        ///</summary>
        ///<returns>
        /// 合并后GUID
        ///</returns>
        [HttpGet]
        [Route("MegerOrder")]
        public async Task<CommondityResult> MegerOrder(int userId)
        {            
            SqlParameter userIdSqlParamter = new SqlParameter("@mergeUserId",userId);
            var result = await this.orderCombinationDbContext.CommondityResults.FromSql("Exec dbo.Usp_MergeOrder @mergeUserId ",userIdSqlParamter).FirstOrDefaultAsync();

            return result;
        }

    }
}
