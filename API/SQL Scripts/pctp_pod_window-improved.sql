-- IMPROVED POD QUERY
SET NOCOUNT ON



SELECT TOP 20
    --COLUMNS

	CASE
		WHEN ISNULL(inv1.ItemCode,'') <> '' AND  ISNULL(opch.U_PVNo,'') <> '' THEN 'Y'
		ELSE 'N'
	END AS DisableTableRow,
	--inv1.ItemCode,
	--opch.U_PVNo,
	--tp.U_PVNo,
    -- pod.Code,
    pod.Code AS Code,
	billing.U_BookingId,
    pod.U_BookingDate,
    pod.U_BookingNumber,
    CASE
        WHEN EXISTS(SELECT 1
    FROM ORDR header 
    WHERE header.CANCELED = 'N' AND header.DocEntry = billing.U_PODSONum) THEN billing.U_PODSONum
        ELSE ''
    END AS U_PODSONum,
    -- billing.U_PODSONum AS U_PODSONum,
    -- pod.U_ClientName,
    client.CardName AS U_ClientName,
    pod.U_SAPClient,
    -- pod.U_TruckerName,
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
    -- pod.U_DocNum,
    -- pod.U_TripTicketNo,
    -- pod.U_WaybillNo,
    -- pod.U_ShipmentNo,
    -- pod.U_DeliveryReceiptNo,
    -- pod.U_SeriesNo,
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
    -- pod.U_BillingStatus,
    -- (
    --     SELECT TOP 1
    --     CASE 
    --             WHEN EXISTS (
    --                 SELECT Code
    --     FROM [@BILLINGSTATUS]
    --     WHERE Code = header.U_BillingStatus
    --             ) THEN header.U_BillingStatus
    --             ELSE NULL 
    --         END
    -- FROM OINV header
    --     LEFT JOIN INV1 line ON line.DocEntry = header.DocEntry
    -- WHERE line.ItemCode = pod.U_BookingNumber
    --     AND header.CANCELED = 'N'
    --     AND header.U_BillingStatus IS NOT NULL
    -- ) AS U_BillingStatus,
    12 U_BillingStatus,
    pod.U_ServiceType,
    pod.U_SINo,
    pod.U_BillingTeam,
    pod.U_SOBNumber,
    -- pod.U_OutletNo,
    -- pod.U_CBM,
    -- pod.U_SI_DRNo,
    -- pod.U_DeliveryMode,
    -- pod.U_SourceWhse,
    -- pod.U_TotalInvAmount,
    -- pod.U_SONo,
    -- pod.U_NameCustomer,
    -- pod.U_CategoryDR,
    pod.U_ForwardLoad,
    pod.U_BackLoad,
    -- pod.U_IDNumber,
    pod.U_TypeOfAccessorial,
    -- pod.U_ApprovalStatus,
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
    -- CASE WHEN ISNULL(pod.U_ClientReceivedDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN DATEDIFF(day, pod.U_ClientReceivedDate, pod.U_DeliveryDateDTR) + ISNULL(client.U_DCD,0) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) 
    -- ELSE 0 END AS 'U_ClientSubOverdue', 
    dbo.computeClientSubOverdue(
        pod.U_DeliveryDateDTR,
        pod.U_ClientReceivedDate,
        ISNULL(pod.U_WaivedDays, 0),
        CAST(ISNULL(client.U_DCD,0) as int)
    ) AS 'U_ClientSubOverdue',
    -- CASE WHEN ISNULL(pod.U_ClientReceivedDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
    --     (CASE WHEN (DATEDIFF(day, pod.U_ClientReceivedDate, pod.U_DeliveryDateDTR) + ISNULL(client.U_DCD,0)) < 0 THEN (DATEDIFF(day, pod.U_ClientReceivedDate, pod.U_DeliveryDateDTR) + ISNULL(client.U_DCD,0)) * 200 ELSE 0 END)
    -- ELSE 0 END AS 'U_ClientPenaltyCalc',
    dbo.computeClientPenaltyCalc(
        dbo.computeClientSubOverdue(
            pod.U_DeliveryDateDTR,
            pod.U_ClientReceivedDate,
            ISNULL(pod.U_WaivedDays, 0),
            CAST(ISNULL(client.U_DCD,0) as int)
        )
    ) AS 'U_ClientPenaltyCalc',
    -- CASE 
    -- WHEN ISNULL(pod.U_ActualHCRecDate,'') = '' AND ISNULL(pod.U_DeliveryDateDTR,'') != ''  THEN 
    --     (CASE WHEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) >= 0 THEN 'Ontime' 
    --         WHEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) BETWEEN -13 AND 0 THEN 'Late'
    --         WHEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) <= -13 THEN 'Lost'
    --     END)
    -- WHEN ISNULL(pod.U_ActualHCRecDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
    --     (CASE WHEN DATEDIFF(day, pod.U_ActualHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) >= 0 THEN 'Ontime'
    --         WHEN DATEDIFF(day, pod.U_ActualHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) BETWEEN -13 AND 0 THEN 'Late'
    --         WHEN DATEDIFF(day, pod.U_ActualHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_WaivedDays), 0),'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) <= -13 THEN 'Lost'
    --     END)
    -- ELSE '' END AS 'U_PODStatusPayment',
    dbo.computePODStatusPayment(
        dbo.computeOverdueDays(
            pod.U_ActualHCRecDate,
            dbo.computePODSubmitDeadline(
                pod.U_DeliveryDateDTR,
                ISNULL(client.U_CDC,0)
            ),
            ISNULL(pod.U_HolidayOrWeekend, 0)
        )
    ) AS 'U_PODStatusPayment',
    --pod.U_PODStatusPayment,
    -- CASE WHEN ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN DATEADD(day, CAST(ISNULL(client.U_CDC,0) AS int) , pod.U_DeliveryDateDTR)
    -- ELSE pod.U_PODSubmitDeadline END AS 'U_PODSubmitDeadline',
    dbo.computePODSubmitDeadline(
        pod.U_DeliveryDateDTR,
        ISNULL(client.U_CDC,0)
    ) AS 'U_PODSubmitDeadline',
     --CASE 
     --    WHEN ISNULL(pod.U_ActualHCRecDate,'') = '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR))
     --    WHEN ISNULL(pod.U_ActualHCRecDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN DATEDIFF(day, pod.U_ActualHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) + CAST(ISNULL(NULLIF(ISNUMERIC(pod.U_HolidayOrWeekend), 0),'0') AS int), pod.U_DeliveryDateDTR)) 
     --ELSE 0 END AS 'U_OverdueDays',
    dbo.computeOverdueDays(
        pod.U_ActualHCRecDate,
        dbo.computePODSubmitDeadline(
            pod.U_DeliveryDateDTR,
            ISNULL(client.U_CDC,0)
        ),
        ISNULL(pod.U_HolidayOrWeekend, 0)
    ) AS 'U_OverdueDays',
    --pod.U_OverdueDays,
     --CASE 
     --WHEN ISNULL(pod.U_InitialHCRecDate,'') = '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
     --    (CASE WHEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) BETWEEN -13 AND 0 THEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) * 200 ELSE 0 END)
     --WHEN ISNULL(pod.U_InitialHCRecDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
     --    (CASE WHEN DATEDIFF(day, pod.U_InitialHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) BETWEEN -13 AND 0 THEN DATEDIFF(day, pod.U_InitialHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) * 200 ELSE 0 END)
     --ELSE 0 END AS 'U_InteluckPenaltyCalc',
    dbo.computeInteluckPenaltyCalc(
        dbo.computePODStatusPayment(
            dbo.computeOverdueDays(
                pod.U_ActualHCRecDate,
                dbo.computePODSubmitDeadline(
                    pod.U_DeliveryDateDTR,
                    ISNULL(client.U_CDC,0)
                ),
                ISNULL(pod.U_HolidayOrWeekend, 0)
            )
        ),
        dbo.computeOverdueDays(
            pod.U_ActualHCRecDate,
            dbo.computePODSubmitDeadline(
                pod.U_DeliveryDateDTR,
                ISNULL(client.U_CDC,0)
            ),
            ISNULL(pod.U_HolidayOrWeekend, 0)
        )
    ) AS 'U_InteluckPenaltyCalc',
    pod.U_WaivedDays,
    pod.U_HolidayOrWeekend,
    -- CASE 
    -- WHEN ISNULL(pod.U_InitialHCRecDate,'') = '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
    --     (CASE WHEN DATEDIFF(day, GETDATE(), DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) <= -13 THEN (CASE WHEN ISNULL(pricing.U_TotalInitialTruckers,0) <> 0 THEN -(pricing.U_TotalInitialTruckers * 2) ELSE 0 END) END )
    -- WHEN ISNULL(pod.U_InitialHCRecDate,'') != '' AND ISNULL(pod.U_DeliveryDateDTR,'') != '' THEN 
    --     (CASE WHEN DATEDIFF(day, pod.U_InitialHCRecDate, DATEADD(day, CAST(ISNULL(client.U_CDC,'0') AS int) , pod.U_DeliveryDateDTR)) <= -13 THEN (CASE WHEN ISNULL(pricing.U_TotalInitialTruckers,0) <> 0 THEN -(pricing.U_TotalInitialTruckers * 2) ELSE 0 END) END )
    -- ELSE 0 END AS 'U_LostPenaltyCalc',
    dbo.computeLostPenaltyCalc(
        dbo.computePODStatusPayment(
            dbo.computeOverdueDays(
                pod.U_ActualHCRecDate,
                dbo.computePODSubmitDeadline(
                    pod.U_DeliveryDateDTR,
                    ISNULL(client.U_CDC,0)
                ),
                ISNULL(pod.U_HolidayOrWeekend, 0)
            )
        ),
        pod.U_InitialHCRecDate,
        pod.U_DeliveryDateDTR,
        CASE
            WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_GrossTruckerRates
            WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_GrossTruckerRates / 1.12)
        END + CASE
            WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_Demurrage2
            WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_Demurrage2 / 1.12)
        END + CASE
            WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN (pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload)
            WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN ((pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload) / 1.12)
        END
    ) AS 'U_LostPenaltyCalc',
    -- pod.U_TotalSubPenalties,
    dbo.computeTotalSubPenalties(
        dbo.computeClientPenaltyCalc(
            dbo.computeClientSubOverdue(
                pod.U_DeliveryDateDTR,
                pod.U_ClientReceivedDate,
                ISNULL(pod.U_WaivedDays, 0),
                CAST(ISNULL(client.U_DCD,0) as int)
            )
        ),
        dbo.computeInteluckPenaltyCalc(
            dbo.computePODStatusPayment(
                dbo.computeOverdueDays(
                    pod.U_ActualHCRecDate,
                    dbo.computePODSubmitDeadline(
                        pod.U_DeliveryDateDTR,
                        ISNULL(client.U_CDC,0)
                    ),
                    ISNULL(pod.U_HolidayOrWeekend, 0)
                )
            ),
            dbo.computeOverdueDays(
                pod.U_ActualHCRecDate,
                dbo.computePODSubmitDeadline(
                    pod.U_DeliveryDateDTR,
                    ISNULL(client.U_CDC,0)
                ),
                ISNULL(pod.U_HolidayOrWeekend, 0)
            )
        ),
        dbo.computeLostPenaltyCalc(
            dbo.computePODStatusPayment(
                dbo.computeOverdueDays(
                    pod.U_ActualHCRecDate,
                    dbo.computePODSubmitDeadline(
                        pod.U_DeliveryDateDTR,
                        ISNULL(client.U_CDC,0)
                    ),
                    ISNULL(pod.U_HolidayOrWeekend, 0)
                )
            ),
            pod.U_InitialHCRecDate,
            pod.U_DeliveryDateDTR,
            CASE
                WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_GrossTruckerRates
                WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_GrossTruckerRates / 1.12)
            END + CASE
                WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_Demurrage2
                WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_Demurrage2 / 1.12)
            END + CASE
                WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN (pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload)
                WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN ((pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload) / 1.12)
            END
        ),
        ISNULL(pod.U_PenaltiesManual,0)
    ) AS U_TotalSubPenalties,
    CASE WHEN ISNULL(pod.U_Waived,'') = '' THEN 'N' 
    ELSE pod.U_Waived END AS 'U_Waived',
    pod.U_PercPenaltyCharge,
    pod.U_Approvedby,
    -- pod.U_TotalPenaltyWaived,
    dbo.computeTotalPenaltyWaived(
        dbo.computeTotalSubPenalties(
            dbo.computeClientPenaltyCalc(
                dbo.computeClientSubOverdue(
                    pod.U_DeliveryDateDTR,
                    pod.U_ClientReceivedDate,
                    ISNULL(pod.U_WaivedDays, 0),
                    CAST(ISNULL(client.U_DCD,0) as int)
                )
            ),
            dbo.computeInteluckPenaltyCalc(
                dbo.computePODStatusPayment(
                    dbo.computeOverdueDays(
                        pod.U_ActualHCRecDate,
                        dbo.computePODSubmitDeadline(
                            pod.U_DeliveryDateDTR,
                            ISNULL(client.U_CDC,0)
                        ),
                        ISNULL(pod.U_HolidayOrWeekend, 0)
                    )
                ),
                dbo.computeOverdueDays(
                    pod.U_ActualHCRecDate,
                    dbo.computePODSubmitDeadline(
                        pod.U_DeliveryDateDTR,
                        ISNULL(client.U_CDC,0)
                    ),
                    ISNULL(pod.U_HolidayOrWeekend, 0)
                )
            ),
            dbo.computeLostPenaltyCalc(
                dbo.computePODStatusPayment(
                    dbo.computeOverdueDays(
                        pod.U_ActualHCRecDate,
                        dbo.computePODSubmitDeadline(
                            pod.U_DeliveryDateDTR,
                            ISNULL(client.U_CDC,0)
                        ),
                        ISNULL(pod.U_HolidayOrWeekend, 0)
                    )
                ),
                pod.U_InitialHCRecDate,
                pod.U_DeliveryDateDTR,
                CASE
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_GrossTruckerRates
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_GrossTruckerRates / 1.12)
                END + CASE
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN pricing.U_Demurrage2
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN (pricing.U_Demurrage2 / 1.12)
                END + CASE
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'Y' THEN (pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload)
                    WHEN ISNULL(trucker.VatStatus,'Y') = 'N' THEN ((pricing.U_AddtlDrop + pricing.U_BoomTruck + pricing.U_Manpower + pricing.U_Backload) / 1.12)
                END
            ),
            ISNULL(pod.U_PenaltiesManual,0)
        ),
        ISNULL(pod.U_PercPenaltyCharge,0)
    ) AS U_TotalPenaltyWaived,
    ISNULL(billing.Code,'') 'BillingNum',
    ISNULL(tp.Code,'') 'TPNum',
    ISNULL(pricing.Code,'') 'PricingNum',
    ISNULL(client.U_CDC,0) 'CDC',
    ISNULL(client.U_DCD,0) 'DCD',
    ISNULL(pricing.U_GrossTruckerRates,0) 'GrossTruckerRates',
    ISNULL(CAST(client.U_GroupLocation as nvarchar(max)), '') AS U_GroupProject,
    CAST(pod.U_Attachment as nvarchar(max)) AS U_Attachment,
    CAST(pod.U_DeliveryOrigin as nvarchar(max)) AS U_DeliveryOrigin,
    CAST(pod.U_Destination as nvarchar(max)) AS U_Destination,
    CAST(pod.U_Remarks as nvarchar(max)) AS U_Remarks,
    CAST(pod.U_OtherPODDoc as nvarchar(max)) AS U_OtherPODDoc,
    CAST(pod.U_RemarksPOD as nvarchar(max)) AS U_RemarksPOD,
    CAST(pod.U_PODStatusDetail as nvarchar(max)) AS U_PODStatusDetail,
    CAST(pod.U_BTRemarks as nvarchar(max)) AS U_BTRemarks,
    CAST(pod.U_DestinationClient as nvarchar(max)) AS U_DestinationClient,
    CAST(pod.U_Remarks2 as nvarchar(max)) AS U_Remarks2,
    CAST(pod.U_DocNum as nvarchar(max)) AS U_DocNum,
    CAST(pod.U_TripTicketNo as nvarchar(max)) AS U_TripTicketNo,
    CAST(pod.U_WaybillNo as nvarchar(max)) AS U_WaybillNo,
    CAST(pod.U_ShipmentNo as nvarchar(max)) AS U_ShipmentNo,
    CAST(pod.U_DeliveryReceiptNo as nvarchar(max)) AS U_DeliveryReceiptNo,
    CAST(pod.U_SeriesNo as nvarchar(max)) AS U_SeriesNo,
    CAST(pod.U_OutletNo as nvarchar(max)) AS U_OutletNo,
    CAST(pod.U_CBM as nvarchar(max)) AS U_CBM,
    CAST(pod.U_SI_DRNo as nvarchar(max)) AS U_SI_DRNo,
    CAST(pod.U_DeliveryMode as nvarchar(max)) AS U_DeliveryMode,
    CAST(pod.U_SourceWhse as nvarchar(max)) AS U_SourceWhse,
    CAST(pod.U_SONo as nvarchar(max)) AS U_SONo,
    CAST(pod.U_NameCustomer as nvarchar(max)) AS U_NameCustomer,
    CAST(pod.U_CategoryDR as nvarchar(max)) AS U_CategoryDR,
    CAST(pod.U_IDNumber as nvarchar(max)) AS U_IDNumber,
    CAST(pod.U_ApprovalStatus as nvarchar(max)) AS U_ApprovalStatus,
    CAST(pod.U_TotalInvAmount as nvarchar(max)) AS U_TotalInvAmount

    --COLUMNS
FROM [dbo].[@PCTP_POD] pod WITH (NOLOCK)
--------------------------------------------------------------------------------------------------------------------------
INNER JOIN [dbo].[@PCTP_BILLING] billing WITH (NOLOCK) ON pod.U_BookingNumber = billing.U_BookingId
INNER JOIN [dbo].[@PCTP_TP] tp WITH (NOLOCK) ON pod.U_BookingNumber = tp.U_BookingId
INNER JOIN [dbo].[@PCTP_PRICING] pricing WITH (NOLOCK) ON pod.U_BookingNumber = pricing.U_BookingId
INNER JOIN [dbo].[OCRD] client ON pod.U_SAPClient = client.CardCode
INNER JOIN [dbo].[OCRD] trucker ON pod.U_SAPTrucker = trucker.CardCode

LEFT JOIN [dbo].[INV1] inv1 ON pod.U_BookingNumber = inv1.ItemCode
LEFT JOIN [dbo].[OINV] oinv ON inv1.DocEntry = oinv.DocEntry AND oinv.CANCELED = 'N'


LEFT JOIN [dbo].[OPCH] opch ON REPLACE(REPLACE(RTRIM(LTRIM(tp.U_PVNo)), ' ', ''), ',', '') LIKE '%' + RTRIM(LTRIM(opch.U_PVNo)) + '%' AND opch.CANCELED = 'N'

-- @ParameterHere
--WHERE pod.U_BookingNumber = 'I23286501RXR'
-- WHERE MONTH(pod.U_BookingDate) = 2

--INNER JOIN OCRD client WITH (NOLOCK) ON pod.U_SAPClient = client.CardCode
--INNER JOIN OCRD trucker WITH (NOLOCK) ON pod.U_SAPTrucker = trucker.CardCode


