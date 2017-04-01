using DataAccess.OrderCombinationWebApi.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace OrderCombinationWebApi.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : Controller
    {
       public OrderCombinationDbContext orderCombinationDbContext {get;set;}

       public BaseController(OrderCombinationDbContext orderCombinationDbContext)
       {
         this.orderCombinationDbContext = orderCombinationDbContext;
       }
    }
}
