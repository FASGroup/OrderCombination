using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderCombinationWebApi.Common;
using OrderCombinationWebApi.Model;
using System;

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
            var result = await this.orderCombinationDbContext.OrderInfos
                 .Where(a => a.State == (int)CommonValue.OrderState.UnMerge).AsNoTracking().ToListAsync();

            // result.ForEach(a=>{
            //     if(a.CommodityName.Length>20)                
            //     {
            //         a.CommodityName = a.CommodityName.Substring(0,20)+"...";
            //     }
            // });

            return result;

            // return await this.orderCombinationDbContext.OrderInfos
            //      .Where(a => a.State == (int)CommonValue.OrderState.UnMerge).AsNoTracking().ToListAsync();
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
            CommondityResult model = new CommondityResult();
            try
            {
                SqlParameter userIdSqlParamter = new SqlParameter("@mergeUserId", userId);
                string sql = "Exec dbo.Usp_MergeOrder @mergeUserId";
                var database = this.orderCombinationDbContext.Database;
                using (var connection = database.GetDbConnection())
                {
                    using (var command = connection.CreateCommand())
                    {                    
                        command.CommandText = sql;
                        command.Parameters.Add(userIdSqlParamter);
                        await connection.OpenAsync();
                        var reader = await command.ExecuteReaderAsync();
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {                                
                                model.MergeId = reader[0].ToString();
                                return model;
                            }

                            return model;
                        }
                        else
                        {
                             model = new CommondityResult();
                            return model;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                 return model;
            }
        }

    }
}
