using System;
using System.Collections.Generic;

namespace OrderCombinationWebApi.Model
{
    public class UserAddress
    {
      public int Id{get;set;}
      public  int  UserId{get;set;}
      public string ConsigneeName{get;set;}
      public string PhoneNumber{get;set;}
      public bool IsAddressDefault {get;set;}
      public string AddressArea {get;set;}
      public string AddressDetailed {get;set;}
      public DateTime CreateDate{get;set;}
      public string CreateBy{get;set;}
    }
}