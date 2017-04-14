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

namespace OrderCombinationWebApi.Controllers
{
    public class UserController : BaseController
    {

        public UserController(OrderCombinationDbContext orderCombinationDbContext,IMemoryCache memoryCache) :
        base(orderCombinationDbContext,memoryCache)
        {

        }

        ///<summary>
        /// 获取用户信息
        ///</summary>
        ///<returns>
        /// 用户对象
        ///</returns>
        [HttpPost]
        [Route("GetUserInfo")]
        [AllowAnonymous]
        public async Task<OperateResult> GetUserInfo([FromBody]dynamic data)
        {
            User user = JsonConvert.DeserializeObject<User>(data.ToString());

            User u = await this.orderCombinationDbContext.Users.AsNoTracking().FirstOrDefaultAsync(
                x=>x.UserName == user.UserName && x.Password == user.Password
            );

            if(u == null){return new OperateResult(){ IsSuccess=false,Message="账号或密码错误!" };}
            else
            {
                string token = this.GenerateUserToken(user);/* 生成token信息返回给用户 */

                string result;
                if (!base.memoryCache.TryGetValue(token, out result))
                {
                    result = $"LineZero{DateTime.Now}";
                    //设置相对过期时间2分钟
                    base.memoryCache.Set(token, result, new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20)));
                }

                u.Password = string.Empty;
                return new OperateResult(){ IsSuccess=true,Message="",Data=u,Data2=token };
            }
        }

        //测试方法
        [HttpGet]
        [Route("GetTestList")]
        public OperateResult GetTestList()
        {
            List<string> data = new List<string>(){
                "测试数据1",
                "测试数据2",
                "测试数据3",
                "测试数据4",
                "测试数据5"
            };

            return new OperateResult() { IsSuccess = true, Message = "", Data = data, Data2 = null };
        }
        /* 
            生成用户token信息并返回token
        */
        private string GenerateUserToken(User user)
        {
            if(user==null){return string.Empty;}
            
            string token = Guid.NewGuid().ToString("N");
            //var token = Convert.ToBase64String(guid.ToByteArray()).TrimEnd('=');
			/*
            this.orderCombinationDbContext.UserTokens.Add(new UserToken(){
                UserName = user.UserName,
                Token = token,
                LoginTime = DateTime.Now,
                ExpireTime = DateTime.Now.AddMinutes(1)
            });
            this.orderCombinationDbContext.SaveChangesAsync();
			*/
            return token;
        }
    }
}
