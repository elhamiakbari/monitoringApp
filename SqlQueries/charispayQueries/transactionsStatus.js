module.exports=(db, date) =>{
    const Query=
   ` declare @date nvarchar(30) = DATEADD(day,${date}, CAST( GETDATE() AS Date ))
select
p.PaymentPayeeState,
case
when p.PaymentPayeeState = 0 then N'ارسال نشده'
when p.PaymentPayeeState = 1 then N'پرداخت شده'
when p.PaymentPayeeState = 2 then N'درانتظار پاسخ بانک'
when p.PaymentPayeeState = 3 then N'رد شده'
when p.PaymentPayeeState = 4 then N'ناموفق از سمت بانک'
when p.PaymentPayeeState = 5 then N'پیش از ارسال به بانک'
when p.PaymentPayeeState = 6 then N'خطا خورده'

end as State,
count(p.Id) as [count],
sum(p.price) [Sum Amount],@date date 
from (select [${db}].[dbo].PaymentRequestsCheques.PaymentRequestId,SUM([${db}].[dbo].PaymentRequestsCheques.Amount) as Amount,MAX([${db}].[dbo].PaymentRequestsCheques.CreationTime) as CreationTime from [${db}].[dbo].PaymentRequestsCheques group by PaymentRequestId) c
inner join [${db}].[dbo].PaymentRequestPayees p on p.PaymentRequestId = c.PaymentRequestId
where c.CreationTime like '%'+ @date +'%'
group by p.PaymentPayeeState  `;
return Query;
}