-- POD
-- WaybillNo
-- Waybill #

-- ShipmentManifestNo
-- Shipment No / Manifest No

-- DeliveryReceiptNo
-- Delivery Receipt No

-- SeriesNo
-- Series #
SET NOCOUNT ON
SELECT TOP 200
    --COLUMNS
    --CASE
    --    WHEN EXISTS(SELECT 1 FROM OINV H, INV1 L WHERE H.DocEntry = L.DocEntry AND L.ItemCode = pod.U_BookingNumber AND H.CANCELED = 'N')
    --        AND EXISTS(
    --            SELECT 1 
    --            FROM OPCH H, PCH1 L 
    --            WHERE H.DocEntry = L.DocEntry AND H.CANCELED = 'N' 
    --            AND (L.ItemCode = pod.U_BookingNumber
    --            OR (REPLACE(REPLACE(RTRIM(LTRIM(tp.U_PVNo)), ' ', ''), ',', '') LIKE '%' + RTRIM(LTRIM(H.U_PVNo)) + '%')))
    --    THEN 'Y'
    --    ELSE 'N'
    --END 
	
	'N' AS DisableTableRow,
    pod.Code AS Code,
    pod.U_BookingDate,
    pod.U_BookingNumber,
    --CASE
    --    WHEN EXISTS(SELECT 1 FROM ORDR header WHERE header.CANCELED = 'N' AND header.DocEntry = billing.U_PODSONum) THEN billing.U_PODSONum
    --    ELSE ''
    --END 
	'' AS U_PODSONum,
    client.CardName AS U_ClientName,
    pod.U_SAPClient,
    trucker.CardName AS U_TruckerName,
    pod.U_ISLAND, 
    pod.U_ISLAND_D, 
    pod.U_IFINTERISLAND, 
    pod.U_VERIFICATION_TAT,
    pod.U_POD_TAT,
    pod.U_ActualDateRec_Intitial,
    pod.U_SAPTrucker,
    pod.U_PlateNumber,
    pod.U_VehicleTypeCap,
    pod.U_DeliveryStatus,
    pod.U_DeliveryDateDTR,
    pod.U_DeliveryDatePOD,
    pod.U_NoOfDrops,
    pod.U_TripType,
    pod.U_Receivedby,
    pod.U_ClientReceivedDate,
    pod.U_InitialHCRecDate,
    pod.U_ActualHCRecDate,
    pod.U_DateReturned,
    pod.U_PODinCharge,
    pod.U_VerifiedDateHC,
    pod.U_PTFNo,
    pod.U_DateForwardedBT,
    pod.U_BillingDeadline,
    pod.U_BillingStatus,
    pod.U_ServiceType,
    pod.U_SINo,
    pod.U_BillingTeam,
    pod.U_SOBNumber,
    pod.U_ForwardLoad,
    pod.U_BackLoad,
    pod.U_TypeOfAccessorial,
    pod.U_TimeInEmptyDem,
    pod.U_TimeOutEmptyDem,
    pod.U_VerifiedEmptyDem,
    pod.U_TimeInLoadedDem,
    pod.U_TimeOutLoadedDem,
    pod.U_VerifiedLoadedDem,
    pod.U_TimeInAdvLoading,
    pod.U_PenaltiesManual,
    CASE WHEN ISNULL(pod.U_DayOfTheWeek,'') = '' THEN DATENAME(dw, pod.U_BookingDate)
    ELSE pod.U_DayOfTheWeek END AS 'U_DayOfTheWeek',
    pod.U_TimeIn,
    pod.U_TimeOut,
    pod.U_TotalNoExceed,
    pod.U_ODOIn,
    pod.U_ODOOut,
    pod.U_TotalUsage,
    CASE WHEN ISNULL(pod.U_ClientReceivedDate,'') = '' THEN 'PENDING' 
    ELSE 'SUBMITTED' 
    END AS 'U_ClientSubStatus', 
    0 AS 'U_ClientSubOverdue', 
    
    0 AS 'U_ClientPenaltyCalc',
    0 AS 'U_PODStatusPayment',
    0 AS 'U_PODSubmitDeadline',
    0 AS 'U_OverdueDays',
    0 AS 'U_InteluckPenaltyCalc',
    pod.U_WaivedDays,
    pod.U_HolidayOrWeekend,
    0 AS 'U_LostPenaltyCalc',
    
    0 AS U_TotalSubPenalties,
    CASE WHEN ISNULL(pod.U_Waived,'') = '' THEN 'N' 
    ELSE pod.U_Waived END AS 'U_Waived',
    pod.U_PercPenaltyCharge,
    pod.U_Approvedby,
   
    0 AS U_TotalPenaltyWaived,
    ISNULL(billing.Code,'') 'BillingNum',
    ISNULL(tp.Code,'') 'TPNum',
    ISNULL(pricing.Code,'') 'PricingNum',
    ISNULL(client.U_CDC,0) 'CDC',
    ISNULL(client.U_DCD,0) 'DCD',
    ISNULL(pricing.U_GrossTruckerRates,0) 'GrossTruckerRates',
    ISNULL(client.U_GroupLocation, '') AS U_GroupProject,
    pod.U_Attachment AS U_Attachment,
    pod.U_DeliveryOrigin AS U_DeliveryOrigin,
    pod.U_Destination AS U_Destination,
    pod.U_Remarks AS U_Remarks,
    pod.U_OtherPODDoc AS U_OtherPODDoc,
    pod.U_RemarksPOD AS U_RemarksPOD,
    pod.U_PODStatusDetail AS U_PODStatusDetail,
    pod.U_BTRemarks AS U_BTRemarks,
    pod.U_DestinationClient AS U_DestinationClient,
    pod.U_Remarks2 AS U_Remarks2,
    pod.U_DocNum AS U_DocNum,
    pod.U_TripTicketNo AS U_TripTicketNo,
    pod.U_WaybillNo AS U_WaybillNo,
    pod.U_ShipmentNo AS U_ShipmentNo,
    pod.U_DeliveryReceiptNo AS U_DeliveryReceiptNo,
    pod.U_SeriesNo AS U_SeriesNo,
    pod.U_OutletNo AS U_OutletNo,
    pod.U_CBM AS U_CBM,
    pod.U_SI_DRNo AS U_SI_DRNo,
    pod.U_DeliveryMode AS U_DeliveryMode,
    pod.U_SourceWhse AS U_SourceWhse,
    pod.U_SONo AS U_SONo,
    pod.U_NameCustomer AS U_NameCustomer,
    pod.U_CategoryDR AS U_CategoryDR,
    pod.U_IDNumber AS U_IDNumber,
    pod.U_ApprovalStatus AS U_ApprovalStatus,
    pod.U_TotalInvAmount AS U_TotalInvAmount

    --COLUMNS
FROM [dbo].[@PCTP_POD] pod 
INNER JOIN [dbo].[@PCTP_BILLING] billing ON pod.U_BookingNumber = billing.U_BookingId
INNER JOIN [dbo].[@PCTP_TP] tp ON pod.U_BookingNumber = tp.U_BookingId
INNER JOIN [dbo].[@PCTP_PRICING] pricing ON pod.U_BookingNumber = pricing.U_BookingId
INNER JOIN OCRD client ON pod.U_SAPClient = client.CardCode
INNER JOIN OCRD trucker ON pod.U_SAPTrucker = trucker.CardCode
