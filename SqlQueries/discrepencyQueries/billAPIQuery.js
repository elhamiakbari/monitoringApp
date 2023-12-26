module.exports=(db, fromDate,toDate) =>{
    const Query=
   ` 
   use ${db}
declare  @accountId int = 6
declare  @CompanyId int = 3
declare @startDate dateTime ='${fromDate}'
declare @endDate dateTime ='${toDate}'
-- drop table statements

  select bapi.Id as 'transactionId', AccountId  , Paydate as'PayDate', Transfer_amount as 'amount', bapi.Balance as 'balance',bapi.Description,
  cast(DiscrepancyCode as varchar(100)) as DiscrepancyCode , Reference_number,
      CASE
        WHEN bapi.Description LIKE N'%پایا%' THEN 'پایا'
		WHEN bapi.Description LIKE N'%ساتنا%' THEN 'ساتنا'
        ELSE 'داخلی'
    END AS TransferType, ac.Name acountname, ba.ProviderType 'provider'
  from BillApis as BAPI 
   join Accounts as Ac on BAPI.AccountId =Ac.Id
   join Banks  Ba on Ba.Id = ac.BankId
  where --bapi.AccountId = @accountId and
     BAPI.Transfer_amount < 0 
  and PayDate > @startDate and PayDate < @endDate  
  and BAPI.Description not like  N'%کارمزد%'
  --and Reference_number ='140208280571211766'
  order by PayDate desc

`;
return Query;
}