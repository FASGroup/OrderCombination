using System;
using System.Collections.Generic;

namespace OrderCombinationWebApi.Model
{
    public class UserToken
    {
      public int Id{get;set;}
      public string UserName {get;set;}
      public string Token {get;set;}
      public DateTime LoginTime{get;set;}
      public DateTime ExpireTime{get;set;}
    }
}