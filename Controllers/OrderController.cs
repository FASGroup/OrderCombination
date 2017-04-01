using System.Collections.Generic;
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
    }
}
