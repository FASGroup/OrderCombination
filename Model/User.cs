using System;
using System.Collections.Generic;

namespace OrderCombinationWebApi.Model
{
    public class User
    {
      public int Id{get;set;}
      public string UserName {get;set;}
      public string Password {get;set;}
      public string Address {get;set;}
      public DateTime CreateDate{get;set;}
      public virtual ICollection<OrderInfo> CreateOders {get;set;}
      public virtual ICollection<OrderInfo> MergerOrders {get;set;}

    }
}