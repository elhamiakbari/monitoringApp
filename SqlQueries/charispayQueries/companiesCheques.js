module.exports=(db) =>{
    const QUERY= `
    declare @date nvarchar(30) = CAST( GETDATE() AS Date )
    ;with cte as (
    select c.Id as companyId, c.Name, pr.Id, count(p.Id) as PayeeCount , sum(p.price) Amount
    from [${db}].[dbo].PaymentsRequests pr
    inner join [${db}].[dbo].Companies c on pr.CompanyId = c.Id
    inner join [${db}].[dbo].PaymentRequestPayees p on p.PaymentRequestId = pr.Id
    where pr.CreationTime like '%' + @date + '%'
    group by c.Id, c.Name, pr.Id
    )
    select  companyId			as [Company ID],
            Name				as [Company Name],
            COUNT(Id)			as [PaymentRequest Count],
            SUM(PayeeCount)		as [Payee Count],
            SUM(Amount)			as [Amount]
    from cte 
    group by companyId, Name
    `;
    return QUERY;
}