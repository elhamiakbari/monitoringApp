module.exports=(db) =>{
    const Query= `declare @date nvarchar(30) = CAST( GETDATE() AS Date )
    ;with cte as (
    select c.Id				as [Compamy ID],
        c.Name				as [Company Name],
        a.Id				as [Account ID],
        a.Name				as [Account Name] ,
        a.AccountNumber		as [Account Number], 
         ch.Id				as [Cheque Id],
        COUNT(p.Id)			as [Count Payee],
        SUM(ch.Amount)		as [Cheque Amount]
    from [${db}].[dbo].Companies c
    inner join[${db}].[dbo].CompanyBankAccounts cb on cb.CompanyId = c.Id
    inner join [${db}].[dbo].Accounts a on a.BankId = cb.BankId and a.CompanyId = c.Id
    inner join [${db}].[dbo].PaymentRequestsCheques ch on ch.AccountId = a.Id
    inner join [${db}].[dbo].PaymentsRequests pr on pr.Id = ch.PaymentRequestId
    inner join [${db}].[dbo].PaymentRequestChequePayees p on p.PaymentRequestChequeId = ch.Id 
    where ch.CreationTime like '%' + @date +'%' and pr.IsReSend = 1
    group by c.Id, c.Name, a.Id, a.Name , a.AccountNumber, TransferType, ch.Id)
    select [Compamy ID],[Company Name],[Account ID],[Account Name],[Account Number], COUNT(*) as [Cheque Count], SUM ([Cheque Amount]) as [Cheque Amount], SUM([Count Payee]) as [Payee Count]
    from  cte
    group by [Compamy ID],[Company Name],[Account ID],[Account Name],[Account Number]`;
    return Query;
}