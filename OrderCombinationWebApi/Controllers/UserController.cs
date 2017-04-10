using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderCombinationWebApi.Common;
using OrderCombinationWebApi.Model;
using System;
using Microsoft.Extensions.Caching.Memory;


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
        public async Task<OperateResult> GetUserInfo([FromBody]User user)
        {
            User u = await this.orderCombinationDbContext.Users.AsNoTracking().FirstOrDefaultAsync(
                x=>x.UserName == user.UserName && x.Password == user.Password
            );
            //User user = new User();

            if(u == null){return new OperateResult(){ IsSuccess=false,Message="账号或密码错误!" };}
            else
            {
				// var token = Convert.ToBase64String(guid.ToByteArray()).TrimEnd('=');
                string token = this.GenerateUserToken(user);/* 生成token信息返回给用户 */

                string result;
                if (!base.memoryCache.TryGetValue(token, out result))
                {
                    result = $"LineZero{DateTime.Now}";
                    //设置相对过期时间2分钟
                    base.memoryCache.Set(token, result, new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20)));
                }

                return new OperateResult(){ IsSuccess=true,Message="",Data=user,Data2=token };
            }
        }
		
		//测试方法
		[HttpGet]
        [Route("GetTestList")]
        public async Task<OperateResult> GetTestList()
        {
            List<string> data = new List<string>(){
				"测试数据1",
				"测试数据2",
				"测试数据3",
				"测试数据4",
				"测试数据5"
			};

            return new OperateResult(){ IsSuccess=true,Message="",Data=data,Data2=null };
        }

        [HttpGet]
        [Route("ValidToken")]
        public async Task<OperateResult> ValidToken(string token)
        {
            UserToken tokenObj = await this.orderCombinationDbContext.UserTokens.AsNoTracking().FirstOrDefaultAsync(
                x=>x.Token == token
            );

            if(tokenObj == null){return new OperateResult(){ IsSuccess=false,Message="无效的token." };}
            if(tokenObj.ExpireTime < DateTime.Now){return new OperateResult(){ IsSuccess=false,Message="token已过期." };}
            return new OperateResult(){ IsSuccess=true,Message="",Data=token };
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
