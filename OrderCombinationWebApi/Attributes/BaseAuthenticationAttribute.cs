using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Newtonsoft.Json;
using OrderCombinationWebApi.Model;

namespace OrderCombinationWebApi.Attributes
{
    /// <summary>  
    /// 基本验证Attribtue，用以Action的权限处理(检验token)
    /// </summary>  
    public class BasicAuthenticationAttribute : TypeFilterAttribute
    {

        public BasicAuthenticationAttribute() : base(typeof(TokenAttribute))
        {

        }

        private class TokenAttribute : ActionFilterAttribute
        {
            private readonly IMemoryCache _memoryCache;
            public TokenAttribute(IMemoryCache memoryCache)
            {
                _memoryCache = memoryCache;
            }

            /// <summary>  
            /// 检查用户是否有该Action执行的操作权限  
            /// </summary>  
            /// <param name="actionContext"></param>  
            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {               
                HttpContext context = filterContext.HttpContext;

                //如果请求Header不包含token，则判断是否是匿名调用  
                bool isAnonymous =filterContext.Filters.Any(x=>x is AllowAnonymousFilter);
                //是匿名用户，则继续执行；非匿名用户，抛出“未授权访问”信息  
                if (isAnonymous)
                {
                    base.OnActionExecuting(filterContext);
                }
                else
                {
                    string token = _getHeader(context, "Token");
                    string result;
                    if (!_memoryCache.TryGetValue(token, out result))
                    {
                        this.ReturnNoAuthorized(filterContext);
                    }
                }
            }

            /// <summary>
            /// 是否有权限凭据
            /// </summary>
            /// <param name="context">上下文</param>
            /// <returns></returns>
            private void ReturnNoAuthorized(ActionExecutingContext filterContext)
            {
                HttpContext context = filterContext.HttpContext;
                
                //context.Response.Headers.Add("Content-type", "application/json;charset=UTF-8"); 
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                //context.Response.WriteAsync("无效的token或token已过期");
				/*
                OperateResult r = new OperateResult
                {
                    Data = "401",
                    Message = "You are not authorized!(无效的token或token已过期)"
                };
				*/
                //filterContext.Result = new JsonResult(JsonConvert.SerializeObject(r));
				filterContext.Result = new JsonResult("You are not authorized!(无效的token或token已过期)");
            }

            /// <summary>
            /// 获取请求头
            /// </summary>
            /// <param name="context">上下文</param>
            /// <param name="key">键</param>
            /// <returns>值</returns>
            private string _getHeader(HttpContext context, string key)
            {
                return context.Request.Headers.ContainsKey(key) ?
                       context.Request.Headers[key].ToArray()[0].ToString() : string.Empty;
            }

        }
    }
}