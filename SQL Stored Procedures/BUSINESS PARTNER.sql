ALTER PROC PORTAL_USP_BUSINESS_PARTNER_DETAILS
@CardCode NVARCHAR(30)
AS

SELECT
	T0.CardCode, 
	T0.CardName,
	CAST(T0.Balance AS NVARCHAR) AS Balance,
	T2.CntctCode,
	T0.CntctPrsn,
	T0.LicTradNum,
	T1.GroupNum,
	T0.Currency,
	T1.PymntGroup,
	ISNULL(T0.ShipToDef,'') AS AddressS,
	
	ISNULL(T0.BillToDef,'') AS AddressB,
	

	T5.TrnspCode,
	T5.TrnspName,

	T6.SlpCode,
	T6.SlpName
																						
																						
FROM OCRD T0
LEFT JOIN OCTG T1 ON T1.GroupNum = T0.GroupNum
LEFT JOIN OCPR T2 ON T2.Name = T0.CntctPrsn AND T2.CardCode = T0.CardCode 
LEFT JOIN OSHP T5 ON T5.TrnspCode = T0.ShipType
INNER JOIN OSLP T6 ON T6.SlpCode = T0.SlpCode

WHERE T0.CardCode = @CardCode
																						
ORDER BY T0.CardCode ASC



EXEC sp_describe_first_result_set N'PORTAL_USP_BUSINESS_PARTNER_DETAILS'

ALTER PROC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_S
@CardCode NVARCHAR(30)
AS

SELECT 
ISNULL(T0.Address,'') AS AddressS
			
				
FROM CRD1 T0
LEFT JOIN OCRY T1 ON T0.Country = T1.Code
INNER JOIN OCRD T2 ON T2.CardCode = T0.CardCode 
		
WHERE T0.CardCode = @CardCode AND T0.AdresType = 'S'



ALTER PROC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_B
@CardCode NVARCHAR(30)
AS
SELECT 
	ISNULL(T0.Address,'') AS AddressB
	FROM CRD1 T0
	LEFT JOIN OCRY T1 ON T0.Country = T1.Code
	INNER JOIN OCRD T2 ON T2.CardCode = T0.CardCode 
		
WHERE T0.CardCode = @CardCode AND T0.AdresType = 'B'

CREATE PROC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_B_DETAILS
@CardCode NVARCHAR(30)
AS
SELECT 
		ISNULL(T0.Address,'') AS Address,
		ISNULL(T0.Street,'') AS Street,
		ISNULL(T0.StreetNo,'') AS StreetNo,
		ISNULL(T0.Block,'') AS Block,
		ISNULL(T0.ZipCode,'') AS ZipCode,
		ISNULL(T0.City,'') AS City,
		ISNULL(T0.County,'') AS County,
		ISNULL(T0.State,'') AS State,
		ISNULL(T0.Country,'') AS CountryCode,
		ISNULL(T1.Name,'') AS Country,
		ISNULL(T0.Building,'') AS Building
				
	FROM CRD1 T0
	LEFT JOIN OCRY T1 ON T0.Country = T1.Code
	INNER JOIN OCRD T2 ON T2.CardCode = T0.CardCode 

	WHERE T0.CardCode = @CardCode  and AdresType = 'B' 

