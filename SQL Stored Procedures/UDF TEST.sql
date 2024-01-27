SELECT COUNT(Column_Name) AS 'Count'
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'ORDR' AND LEFT(Column_Name,2) = 'U_'


SELECT Column_Name
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'ORDR' AND LEFT(Column_Name,2) = 'U_'


SELECT 
T0.Descr
FROM CUFD T0
WHERE T0.TableID = 'ORDR'

SET NOCOUNT ON; EXEC sp_describe_first_result_set N'PORTAL_USP_UDF_HEADER'

ALTER PROC PORTAL_USP_UDF_HEADER
@Table NVARCHAR(30)
AS
SELECT 
'U_' + T0.AliasID AS 'AliasID',
T0.Descr,
T0.TypeID,
T0.EditType,
T0.SizeID,
T0.TableID,
T0.TypeID,
T0.ValidRule,
T0.NotNull,
	
FROM CUFD T0
WHERE T0.TableID = @Table 

EXEC PORTAL_USP_UDF_HEADER @Table = 'ORDR'


SELECT * FROM CUFD T0
WHERE T0.TableID = 'ORDR'

SELECT 
		'U_' + T0.AliasID AS 'AliasID',
		T0.Descr,
		T0.TypeID,
		T0.EditType,
		T0.SizeID,
		T0.EditSize,
		T0.Dflt,
		T0.RTable,
		T0.RelUdo,
		T0.FieldId,
		T0.tableId,
		MAX(T1.IndexID) AS ValidValues,
		T2.Descr AS DescDflt
		
	
	
		FROM CUFD T0
		LEFT JOIN UFD1 T1 ON T0.tableId = T1.tableId AND T0.FieldId = T1.FieldId 
		LEFT JOIN UFD1 T2 ON T0.Dflt = T2.FldValue AND T0.FieldId = T2.FieldId 
		
		WHERE T0.tableId = 'ORDR'
		GROUP BY
		T0.AliasID,
		T0.Descr,
		T0.TypeID,
		T0.EditType,
		T0.SizeID,
		T0.EditSize,
		T0.Dflt,
		T0.RTable,
		T0.RelUdo,
		T0.FieldId,
		T0.TableId,
		T2.Descr
		
		ORDER BY T0.FieldId


	SELECT 
		'U_' + T0.AliasID AS 'AliasID',
		T0.Descr,
		T0.TypeID,
		T0.EditType,
		T0.SizeID,
		T0.EditSize,
		T0.Dflt,
		T0.RTable,
		T0.RelUdo,
		T1.FieldId,
		T1.IndexID,
		T1.FldValue,
		T1.Descr AS DescrValidValue
	
	
		FROM CUFD T0
		LEFT JOIN UFD1 T1 ON T0.TableID = T1.TableID AND T0.FieldId = T1.FieldId 
		
		WHERE T0.TableID = 'ORDR' AND ISNULL(T0.Dflt,'') <> T1.FldValue


		SELECT 
		T0.Descr
													
		FROM OUTB T0
		WHERE T0.TableName = 'U_UpdateKey'