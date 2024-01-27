mssql
SA
SAPB1Admin
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class PctpPod(models.Model):
    code = models.AutoField(db_column='Code', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_bookingdate = models.DateTimeField(db_column='U_BookingDate', blank=True, null=True)  # Field name made lowercase.
    u_bookingnumber = models.CharField(db_column='U_BookingNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_clientname = models.CharField(db_column='U_ClientName', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_sapclient = models.CharField(db_column='U_SAPClient', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_truckername = models.CharField(db_column='U_TruckerName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_saptrucker = models.CharField(db_column='U_SAPTrucker', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_platenumber = models.CharField(db_column='U_PlateNumber', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_vehicletypecap = models.CharField(db_column='U_VehicleTypeCap', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverystatus = models.CharField(db_column='U_DeliveryStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverydatedtr = models.DateTimeField(db_column='U_DeliveryDateDTR', blank=True, null=True)  # Field name made lowercase.
    u_deliverydatepod = models.DateTimeField(db_column='U_DeliveryDatePOD', blank=True, null=True)  # Field name made lowercase.
    u_noofdrops = models.DecimalField(db_column='U_NoOfDrops', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_triptype = models.CharField(db_column='U_TripType', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_remarks = models.TextField(db_column='U_Remarks', blank=True, null=True)  # Field name made lowercase.
    u_otherpoddoc = models.TextField(db_column='U_OtherPODDoc', blank=True, null=True)  # Field name made lowercase.
    u_remarkspod = models.TextField(db_column='U_RemarksPOD', blank=True, null=True)  # Field name made lowercase.
    u_receivedby = models.CharField(db_column='U_Receivedby', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_clientreceiveddate = models.DateTimeField(db_column='U_ClientReceivedDate', blank=True, null=True)  # Field name made lowercase.
    u_initialhcrecdate = models.DateTimeField(db_column='U_InitialHCRecDate', blank=True, null=True)  # Field name made lowercase.
    u_actualhcrecdate = models.DateTimeField(db_column='U_ActualHCRecDate', blank=True, null=True)  # Field name made lowercase.
    u_datereturned = models.DateTimeField(db_column='U_DateReturned', blank=True, null=True)  # Field name made lowercase.
    u_podincharge = models.CharField(db_column='U_PODinCharge', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_verifieddatehc = models.DateTimeField(db_column='U_VerifiedDateHC', blank=True, null=True)  # Field name made lowercase.
    u_podstatusdetail = models.TextField(db_column='U_PODStatusDetail', blank=True, null=True)  # Field name made lowercase.
    u_ptfno = models.CharField(db_column='U_PTFNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_dateforwardedbt = models.DateTimeField(db_column='U_DateForwardedBT', blank=True, null=True)  # Field name made lowercase.
    u_billingdeadline = models.DateTimeField(db_column='U_BillingDeadline', blank=True, null=True)  # Field name made lowercase.
    u_billingstatus = models.CharField(db_column='U_BillingStatus', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_servicetype = models.CharField(db_column='U_ServiceType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_sino = models.CharField(db_column='U_SINo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_billingteam = models.CharField(db_column='U_BillingTeam', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_btremarks = models.TextField(db_column='U_BTRemarks', blank=True, null=True)  # Field name made lowercase.
    u_sobnumber = models.CharField(db_column='U_SOBNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_forwardload = models.CharField(db_column='U_ForwardLoad', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_backload = models.CharField(db_column='U_BackLoad', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_typeofaccessorial = models.CharField(db_column='U_TypeOfAccessorial', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeinemptydem = models.CharField(db_column='U_TimeInEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeoutemptydem = models.CharField(db_column='U_TimeOutEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_verifiedemptydem = models.CharField(db_column='U_VerifiedEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeinloadeddem = models.CharField(db_column='U_TimeInLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeoutloadeddem = models.CharField(db_column='U_TimeOutLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_verifiedloadeddem = models.CharField(db_column='U_VerifiedLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_remarks2 = models.TextField(db_column='U_Remarks2', blank=True, null=True)  # Field name made lowercase.
    u_timeinadvloading = models.CharField(db_column='U_TimeInAdvLoading', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_dayoftheweek = models.CharField(db_column='U_DayOfTheWeek', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timein = models.CharField(db_column='U_TimeIn', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeout = models.CharField(db_column='U_TimeOut', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_odoin = models.CharField(db_column='U_ODOIn', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_odoout = models.CharField(db_column='U_ODOOut', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_clientsubstatus = models.CharField(db_column='U_ClientSubStatus', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_clientsuboverdue = models.CharField(db_column='U_ClientSubOverdue', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_clientpenaltycalc = models.CharField(db_column='U_ClientPenaltyCalc', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_podstatuspayment = models.CharField(db_column='U_PODStatusPayment', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_podsubmitdeadline = models.DateTimeField(db_column='U_PODSubmitDeadline', blank=True, null=True)  # Field name made lowercase.
    u_overduedays = models.CharField(db_column='U_OverdueDays', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_inteluckpenaltycalc = models.CharField(db_column='U_InteluckPenaltyCalc', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_waiveddays = models.CharField(db_column='U_WaivedDays', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_holidayorweekend = models.CharField(db_column='U_HolidayOrWeekend', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_lostpenaltycalc = models.CharField(db_column='U_LostPenaltyCalc', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_totalsubpenalties = models.CharField(db_column='U_TotalSubPenalties', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_waived = models.CharField(db_column='U_Waived', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_percpenaltycharge = models.CharField(db_column='U_PercPenaltyCharge', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_approvedby = models.CharField(db_column='U_Approvedby', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_totalpenaltywaived = models.CharField(db_column='U_TotalPenaltyWaived', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_updatedate = models.DateTimeField(db_column='U_UpdateDate', blank=True, null=True)  # Field name made lowercase.
    u_createdate = models.DateTimeField(db_column='U_CreateDate', blank=True, null=True)  # Field name made lowercase.
    u_attachment = models.TextField(db_column='U_Attachment', blank=True, null=True)  # Field name made lowercase.
    u_creator = models.CharField(db_column='U_Creator', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_totalnoexceed = models.DecimalField(db_column='U_TotalNoExceed', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalusage = models.DecimalField(db_column='U_TotalUsage', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_penaltiesmanual = models.DecimalField(db_column='U_PenaltiesManual', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_island = models.CharField(db_column='U_ISLAND', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_island_d = models.CharField(db_column='U_ISLAND_D', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_ifinterisland = models.CharField(db_column='U_IFINTERISLAND', max_length=10, blank=True, null=True)  # Field name made lowercase.
    u_verification_tat = models.IntegerField(db_column='U_VERIFICATION_TAT', blank=True, null=True)  # Field name made lowercase.
    u_pod_tat = models.IntegerField(db_column='U_POD_TAT', blank=True, null=True)  # Field name made lowercase.
    u_actualdaterec_intitial = models.DateTimeField(db_column='U_ActualDateRec_Intitial', blank=True, null=True)  # Field name made lowercase.
    u_deliveryorigin = models.TextField(db_column='U_DeliveryOrigin', blank=True, null=True)  # Field name made lowercase.
    u_destination = models.TextField(db_column='U_Destination', blank=True, null=True)  # Field name made lowercase.
    u_destinationclient = models.TextField(db_column='U_DestinationClient', blank=True, null=True)  # Field name made lowercase.
    u_tripticketno = models.TextField(db_column='U_TripTicketNo', blank=True, null=True)  # Field name made lowercase.
    u_waybillno = models.TextField(db_column='U_WaybillNo', blank=True, null=True)  # Field name made lowercase.
    u_shipmentno = models.TextField(db_column='U_ShipmentNo', blank=True, null=True)  # Field name made lowercase.
    u_deliveryreceiptno = models.TextField(db_column='U_DeliveryReceiptNo', blank=True, null=True)  # Field name made lowercase.
    u_seriesno = models.TextField(db_column='U_SeriesNo', blank=True, null=True)  # Field name made lowercase.
    u_outletno = models.TextField(db_column='U_OutletNo', blank=True, null=True)  # Field name made lowercase.
    u_cbm = models.TextField(db_column='U_CBM', blank=True, null=True)  # Field name made lowercase.
    u_si_drno = models.TextField(db_column='U_SI_DRNo', blank=True, null=True)  # Field name made lowercase.
    u_deliverymode = models.TextField(db_column='U_DeliveryMode', blank=True, null=True)  # Field name made lowercase.
    u_sourcewhse = models.TextField(db_column='U_SourceWhse', blank=True, null=True)  # Field name made lowercase.
    u_sono = models.TextField(db_column='U_SONo', blank=True, null=True)  # Field name made lowercase.
    u_namecustomer = models.TextField(db_column='U_NameCustomer', blank=True, null=True)  # Field name made lowercase.
    u_categorydr = models.TextField(db_column='U_CategoryDR', blank=True, null=True)  # Field name made lowercase.
    u_idnumber = models.TextField(db_column='U_IDNumber', blank=True, null=True)  # Field name made lowercase.
    u_approvalstatus = models.TextField(db_column='U_ApprovalStatus', blank=True, null=True)  # Field name made lowercase.
    u_docnum = models.TextField(db_column='U_DocNum', blank=True, null=True)  # Field name made lowercase.
    u_totalinvamount = models.TextField(db_column='U_TotalInvAmount', blank=True, null=True)  # Field name made lowercase.
    u_editing = models.CharField(db_column='U_Editing', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = '@PCTP_POD'
