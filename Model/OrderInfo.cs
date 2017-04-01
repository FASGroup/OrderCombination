using System;

namespace OrderCombinationWebApi.Model
{
    public class OrderInfo
    {
      public int Id{get;set;}
      public string CommodityName {get;set;}
      public string CommodityUrl{get;set;}
      public decimal Price{get;set;}
      public int Quantity{get;set;}
      public decimal Amount{get;set;}
      public string Remark{get;set;}
      public string MergeId{get;set;}
      public DateTime? MergeDate{get;set;}
      public int? MergeBy{get;set;}
      public int State{get;set;} 
      public DateTime CreateDate {get;set;}
      public int CreateBy{get;set;}
      public virtual User CreateUser{get;set;}
      public virtual User MergeUser{get;set;}

    }
}