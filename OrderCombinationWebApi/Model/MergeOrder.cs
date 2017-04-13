using System;
using System.Collections.Generic;
using System.Linq;

namespace OrderCombinationWebApi.Model
{
    public class MergeOrder
    {
        public string MergeId {get;set;}
        public List<OrderInfo> MergeOrderList{get;set;}
        public decimal SumPrice
        {
            get
            {
                if(MergeOrderList==null)
                {
                    return 0;
                }
                else
                {
                    decimal sum = 0;
                    foreach (var order in MergeOrderList)
                    {
                        sum += order.Price * order.Quantity;
                    }
                    return sum;
                }
            }   
        }
    }
}