using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OrderCombinationWebApi.Model;
using Newtonsoft.Json;
using Microsoft.Extensions.Caching.Memory;

namespace OrderCombinationWebApi.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;
        private HttpContext _context;
        private IMemoryCache _memoryCache;

        public TokenMiddleware(RequestDelegate next,IMemoryCache memoryCache)
        {
            _next = next;
            _memoryCache = memoryCache;
        }

        public async Task Invoke(HttpContext context)
        {
            _context = context;
			
            string url = context.Request.Path;
            if (!url.Contains("GetUserInfo"))
            {
                string token = _getHeader(context, "Token");
                string result;
                if (!_memoryCache.TryGetValue(token, out result))
                {
                    await ReturnNoAuthorized(context);
                    return;
                }
            }
			
            await _next.Invoke(context);
        }

        /// <summary>
        /// 是否有权限凭据
        /// </summary>
        /// <param name="context">上下文</param>
        /// <returns></returns>
        private async Task ReturnNoAuthorized(HttpContext context)
        {
            // OperateResult response = new OperateResult
            // {
            //     Data = "401",
            //     Message = "You are not authorized!"
            // };
            context.Response.StatusCode = 401;
            //await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            await context.Response.WriteAsync("无效的token或token已过期");
        }


        /// <summary>
        /// 是否token过期 
        /// </summary>
        /// <param name="context">上下文</param>
        /// <returns></returns>
        private async Task ReturnTokenTimeOut(HttpContext context)
        {
            OperateResult response = new OperateResult
            {
                Data = "408",
                Message = "Token time out!"
            };
            context.Response.StatusCode = 408;
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
        }

        /// <summary>
        /// 获取参数值
        /// </summary>
        /// <param name="context">上下文</param>
        /// <param name="key">参数键值</param>
        /// <returns>参数值</returns>
        private string _getParam(HttpContext context, string key)
        {
            switch (context.Request.Method.ToUpper())
            {
                case "POST":
                    return context.Request.Form[key];
                    break;
                case "GET":
                    return context.Request.Query[key];
                    break;
                default:
                    return context.Request.Query[key];
                    break;
            }
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