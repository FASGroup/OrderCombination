using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace OrderCombinationWebApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    public class BaseController : Controller
    {
       public OrderCombinationDbContext orderCombinationDbContext {get;set;}
       public IMemoryCache memoryCache{get;set;}

       public BaseController(OrderCombinationDbContext orderCombinationDbContext)
       {
         this.orderCombinationDbContext = orderCombinationDbContext;
       }

       public BaseController(OrderCombinationDbContext orderCombinationDbContext,IMemoryCache memoryCache)
       {
         this.orderCombinationDbContext = orderCombinationDbContext;
         this.memoryCache = memoryCache;
       }
    }
}
