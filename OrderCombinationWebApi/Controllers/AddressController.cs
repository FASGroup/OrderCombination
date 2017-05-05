using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderCombinationWebApi.Model;
using System;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Data.SqlClient;

namespace OrderCombinationWebApi.Controllers
{
    public class AddressController : BaseController
    {
        public AddressController(OrderCombinationDbContext orderCombinationDbContext,IMemoryCache memoryCache) :
        base(orderCombinationDbContext,memoryCache)
        {

        }  
        /// <summary>
        /// 获得单个地址
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAddressByID")]
         [AllowAnonymous]        
         public async Task<UserAddress> GetAddressByID(int Id)
        { 
             UserAddress  userAddress =await this.orderCombinationDbContext.UserAddresss.FirstOrDefaultAsync(a=>a.Id==Id);
             return  userAddress;
        } 
 
        /// <summary>
        /// 获取该用户全部地址
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
         [HttpGet]
         [Route("GetAllAddressByUserID")]
         [AllowAnonymous]        
         public List<UserAddress> GetAllAddressByUserID(int UserId)
        { 
             List<UserAddress> userAddresslist=new  List<UserAddress>();
             userAddresslist =this.orderCombinationDbContext.UserAddresss.Where(u=>u.UserId==UserId).ToList();
             return  userAddresslist;
        }
         
         /// <summary>
        ///删除
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("DeleteAddressByID")]
        [AllowAnonymous]

        public async Task<UserAddress> DeleteAddressByID(int Id)
        {
            try{
                UserAddress  userAddress =this.orderCombinationDbContext.UserAddresss.FirstOrDefault(a=>a.Id==Id);
                this.orderCombinationDbContext.Remove(userAddress);
                this.orderCombinationDbContext.SaveChanges();
                return userAddress;
            }
            catch(Exception ex)
            {
                return null;
            }
        }
 
        /// <summary>
        /// 新增保存
        /// </summary>
        /// <param name="userAddress"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SaveNewAddress")]
        [AllowAnonymous]
        public async Task<UserAddress>  SaveNewAddress(int Id,int userId,string ConsigneeName,string PhoneNumber,string AddressArea,string AddressDetailed)
        {
            try{
                OrderCombinationWebApi.Model.UserAddress  model = new OrderCombinationWebApi.Model.UserAddress ();
                model.UserId=userId;
                model.ConsigneeName=ConsigneeName;
                model.PhoneNumber=PhoneNumber;
                model.AddressArea=AddressArea;
                model.AddressDetailed=AddressDetailed;
                model.IsAddressDefault=false;
                model.CreateDate=DateTime.Now.Date;
                model.CreateBy=userId.ToString();

                if(Id==0)
                {
                    this.orderCombinationDbContext.Add(model);
                    this.orderCombinationDbContext.SaveChanges();
                    return model;
                }
                else{
                    model.Id=Id;
                    this.orderCombinationDbContext.Update(model);
                    this.orderCombinationDbContext.SaveChanges();
                    return model;
                }
            }catch(Exception ex)
            {
                UserAddress o=new  UserAddress();
                return o;
            }
            
 
            //  UserAddress model = new UserAddress();
            // try
            // {
            //     SqlParameter IdSqlParamter=new SqlParameter("@Id",Id);
            //     SqlParameter UserIdSqlParamter = new SqlParameter("@UserId", userId);
            //     SqlParameter ConsigneeNameSqlParamter = new SqlParameter("@ConsigneeName", ConsigneeName);
            //     SqlParameter PhoneNumberSqlParamter = new SqlParameter("@PhoneNumber", PhoneNumber);
            //     SqlParameter AddressAreaSqlParamter = new SqlParameter("@AddressArea", AddressArea);
            //     SqlParameter AddressDetailedSqlParamter = new SqlParameter("@AddressDetailed", AddressDetailed); 

            //     string sql = "Exec dbo.Usp_AddNewAddress @Id,@UserId,@ConsigneeName,@PhoneNumber,@AddressArea,@AddressDetailed";
            //     var database = this.orderCombinationDbContext.Database;
               
            //     using (var connection = database.GetDbConnection())
            //     {
            //         using (var command = connection.CreateCommand())
            //         {                    
            //             command.CommandText = sql;

            //             command.Parameters.Add(IdSqlParamter);
            //             command.Parameters.Add(UserIdSqlParamter);
            //             command.Parameters.Add(ConsigneeNameSqlParamter);
            //             command.Parameters.Add(PhoneNumberSqlParamter);
            //             command.Parameters.Add(AddressAreaSqlParamter);
            //             command.Parameters.Add(AddressDetailedSqlParamter);
                         
            //             await connection.OpenAsync();
            //             var reader = await command.ExecuteReaderAsync();
            //             if (reader.HasRows)
            //             {
            //                 while (await reader.ReadAsync())
            //                 {                                
            //                     model.ConsigneeName = reader[0].ToString();
            //                     return model;
            //                 }
            //                 return model;
            //             }
            //             else
            //             {
            //                  model = new UserAddress();
            //                 return model;
            //             }
            //         }
            //     }
            // }
            // catch (Exception ex)
            // {
            //        model = new UserAddress();
            //        return model;
            // }
        
        }
        
    }
}
