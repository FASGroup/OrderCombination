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
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

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
         [AllowAnonymous]
        public async Task<MergeOrder> GetMergeOrder(string mergeId)
        {
            var mergeOrder = new MergeOrder(){MergeId=mergeId};
            mergeOrder.MergeOrderList = await this.orderCombinationDbContext.OrderInfos
                    .Where(a=>a.MergeId == mergeId).AsNoTracking().ToListAsync();

            return mergeOrder;
        }

         [HttpGet]
        [Route("GetMergeOrderHostory")]
        [AllowAnonymous]
        public async    Task<List<MergeOrder>> GetMergeOrderHostory(int userId)
        { 
              List<OrderCombinationWebApi.Model.OrderInfo> Orderlist=new  List<OrderCombinationWebApi.Model.OrderInfo>();
              Orderlist =this.orderCombinationDbContext.OrderInfos.Where(o=>o.MergeBy==userId&&o.State==2).ToList();

              List<string>  MergeOrderidlist=new List<string> ();
              foreach ( OrderInfo o in Orderlist) 
              {
                  MergeOrderidlist.Add(o.MergeId); 
              } 
            List<string> listnew=MergeOrderidlist.Distinct().ToList();

            List<MergeOrder> MergeOrderlist=new List<MergeOrder>();

            foreach(string id in listnew)
            {  
                     var mergeOrder = new MergeOrder(){MergeId=id};
                      mergeOrder.MergeOrderList = await this.orderCombinationDbContext.OrderInfos
                    .Where(a=>a.MergeId == id).AsNoTracking().ToListAsync();

                  MergeOrderlist.Add(mergeOrder);
            } 
            return  MergeOrderlist;

        }

         [HttpGet]
        [Route("GetMergeOrderHostory1")]
        [AllowAnonymous]
        public   List<OrderInfo> GetMergeOrderHostory1(int userId)
        { 
              List<OrderCombinationWebApi.Model.OrderInfo> Orderlist=new  List<OrderCombinationWebApi.Model.OrderInfo>();
              Orderlist =this.orderCombinationDbContext.OrderInfos.Where(o=>o.MergeBy==userId&&o.State==2).ToList();
              return  Orderlist;

        }



        ///<summary>
        /// 合并订单
        ///</summary>
        ///<returns>
        /// 合并后GUID
        ///</returns>
        [HttpGet]
        [Route("MegerOrder")]
        [AllowAnonymous]
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

        //------------------------------------
        /// <summary>
        /// 新增订单 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="CommodityName"></param>
        /// <param name="CommodityUrl"></param>
        /// <param name="Price"></param>
        /// <param name="Quantity"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AddNewOrder")]
        [AllowAnonymous]
        public async Task<OrderInfo>  AddNewOrder(int userId,string CommodityName,string CommodityUrl,string Price,string Quantity,string Remark)
        {

            // OrderCombinationWebApi.Model.OrderInfo model=new OrderCombinationWebApi.Model.OrderInfo();
            // model.CommodityName=CommodityName;
            // model.CommodityUrl=
            // model.Price= Price
 
            // this.orderCombinationDbContext.OrderInfos.Add(order)
            // this.orderCombinationDbContext.OrderInfos.SaveChanges();
            // return 1;
                 
             OrderInfo model = new OrderInfo(); 
             try
            {
                SqlParameter CommodityNameSqlParamter = new SqlParameter("@CommodityName", CommodityName);
                SqlParameter CommodityUrlSqlParamter = new SqlParameter("@CommodityUrl", CommodityUrl);
                SqlParameter PriceSqlParamter = new SqlParameter("@Price", Price);
                SqlParameter QuantitySqlParamter = new SqlParameter("@Quantity", Quantity);
                SqlParameter RemarkSqlParamter = new SqlParameter("@Remark", Remark);
                SqlParameter CreateBySqlParamter = new SqlParameter("@CreateBy",userId );

                string sql = "Exec dbo.Usp_AddNewOrder @CommodityName,@CommodityUrl,@Price,@Quantity,@Remark,@CreateBy";
                var database = this.orderCombinationDbContext.Database;
               
                using (var connection = database.GetDbConnection())
                {
                    using (var command = connection.CreateCommand())
                    {                    
                        command.CommandText = sql;
                        command.Parameters.Add(CommodityNameSqlParamter);
                        command.Parameters.Add(CommodityUrlSqlParamter);
                        command.Parameters.Add(PriceSqlParamter);
                        command.Parameters.Add(QuantitySqlParamter);
                        command.Parameters.Add(RemarkSqlParamter);
                        command.Parameters.Add(CreateBySqlParamter); 

                        await connection.OpenAsync();
                        var reader = await command.ExecuteReaderAsync();
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {                                
                                model.CommodityName = reader[0].ToString();
                                return model;
                            }
                            return model;
                        }
                        else
                        {
                             model = new OrderInfo();
                            return model;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                   model = new OrderInfo();
                   return model;
            }
        }

        //Vinson 
        // [HttpGet]
        // [Route("GetHistoryOrder")]
        // [AllowAnonymous]
        // public async Task<MergeOrder> GetHistoryOrder(string ConditionID)
        // {
        //     //所有记录
        //     if (ConditionID == "1")
        //     {
        //         var result = await this.orderCombinationDbContext.OrderInfos
        //          .AsNoTracking().ToListAsync();
        //         return result;
        //     }
        //     else if (ConditionID == "2") //当天记录
        //     {
        //         var result = await this.orderCombinationDbContext.OrderInfos
        //          .Where(a => a.CreateDate.DayOfYear == DateTime.Now.Day).AsNoTracking().ToListAsync();
        //         return result;
        //     }
        //     else if (ConditionID == "3") //本月记录
        //     {
        //         var result = await this.orderCombinationDbContext.OrderInfos
        //          .Where(a => a.CreateDate.Month == DateTime.Now.Month).AsNoTracking().ToListAsync();
        //         return result;
        //     }
        // }
 
    }
}
