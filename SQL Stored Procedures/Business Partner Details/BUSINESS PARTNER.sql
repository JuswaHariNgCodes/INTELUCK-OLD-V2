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
	ISNULL(T3.Address,'') AS AddressS,
	ISNULL(T3.Street,'') AS StreetS,
	ISNULL(T3.StreetNo,'') AS StreetNoS,
	ISNULL(T3.Block,'') AS BlockS,
	ISNULL(T3.ZipCode,'') AS ZipCodeS,
	ISNULL(T3.City,'') AS CityS,
	ISNULL(T3.County,'') AS CountyS,
	ISNULL(T3.State,'') AS State,
	ISNULL(T3.Country,'') AS CountryCodeS,
	ISNULL(T3B.Name,'') AS CountryS,
	ISNULL(T3.Building,'') AS BuildingS,

	ISNULL(T4.Address,'') AS AddressB,
	ISNULL(T4.Street,'') AS StreetB,
	ISNULL(T4.StreetNo,'') AS StreetNoB,
	ISNULL(T4.Block,'') AS BlockB,
	ISNULL(T4.ZipCode,'') AS ZipCodeB,
	ISNULL(T4.City,'') AS CityB,
	ISNULL(T4.County,'') AS CountyB,
	ISNULL(T4.State,'') AS StateB,
	ISNULL(T4.Country,'') AS CountryCodeB,
	ISNULL(T4B.Name,'') AS CountryB,
	ISNULL(T4.Building,'') AS BuildingB,


	T5.TrnspCode,
	T5.TrnspName,

	T6.SlpCode,
	T6.SlpName
																						
																						
FROM OCRD T0
LEFT JOIN OCTG T1 ON T1.GroupNum = T0.GroupNum
LEFT JOIN OCPR T2 ON T2.Name = T0.CntctPrsn AND T2.CardCode = T0.CardCode 
LEFT JOIN CRD1 T3 ON T3.CardCode = T0.CardCode AND T3.AdresType = 'S' 
LEFT JOIN OCRY T3B ON T3B.Code = T3.Country
LEFT JOIN CRD1 T4 ON T4.CardCode = T0.CardCode AND T4.AdresType = 'B' 
LEFT JOIN OCRY T4B ON T4B.Code = T4.Country
LEFT JOIN OSHP T5 ON T5.TrnspCode = T0.ShipType
LEFT JOIN OSLP T6 ON T6.SlpCode = T0.SlpCode

WHERE T0.CardCode = @CardCode
																						
ORDER BY T0.CardCode ASC


EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS @CardCode = 'C20000'


EXEC sp_describe_first_result_set N'PORTAL_USP_BUSINESS_PARTNER_DETAILS'
