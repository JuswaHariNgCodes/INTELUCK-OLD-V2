# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class PctpBilling(models.Model):
    code = models.AutoField(db_column='Code', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_bookingid = models.CharField(db_column='U_BookingId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_bookingdate = models.DateTimeField(db_column='U_BookingDate', blank=True, null=True)  # Field name made lowercase.
    u_customername = models.CharField(db_column='U_CustomerName', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_sapclient = models.CharField(db_column='U_SAPClient', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_groupproject = models.CharField(db_column='U_GroupProject', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_platenumber = models.CharField(db_column='U_PlateNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_vehicletypecap = models.CharField(db_column='U_VehicleTypeCap', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverystatus = models.CharField(db_column='U_DeliveryStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverydatepod = models.DateTimeField(db_column='U_DeliveryDatePOD', blank=True, null=True)  # Field name made lowercase.
    u_triptype = models.CharField(db_column='U_TripType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_waybillno = models.CharField(db_column='U_WaybillNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_shipmentmanifestno = models.CharField(db_column='U_ShipmentManifestNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_deliveryreceiptno = models.CharField(db_column='U_DeliveryReceiptNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_seriesno = models.CharField(db_column='U_SeriesNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_otherpoddoc = models.TextField(db_column='U_OtherPODDoc', blank=True, null=True)  # Field name made lowercase.
    u_remarkspod = models.TextField(db_column='U_RemarksPOD', blank=True, null=True)  # Field name made lowercase.
    u_clientreceiveddate = models.DateTimeField(db_column='U_ClientReceivedDate', blank=True, null=True)  # Field name made lowercase.
    u_actualhcrecdate = models.DateTimeField(db_column='U_ActualHCRecDate', blank=True, null=True)  # Field name made lowercase.
    u_podincharge = models.CharField(db_column='U_PODinCharge', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_verifieddatehc = models.DateTimeField(db_column='U_VerifiedDateHC', blank=True, null=True)  # Field name made lowercase.
    u_podstatusdetail = models.TextField(db_column='U_PODStatusDetail', blank=True, null=True)  # Field name made lowercase.
    u_ptfno = models.CharField(db_column='U_PTFNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_dateforwardedbt = models.DateTimeField(db_column='U_DateForwardedBT', blank=True, null=True)  # Field name made lowercase.
    u_billingdeadline = models.DateTimeField(db_column='U_BillingDeadline', blank=True, null=True)  # Field name made lowercase.
    u_billingstatus = models.CharField(db_column='U_BillingStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_servicetype = models.CharField(db_column='U_ServiceType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_sino = models.CharField(db_column='U_SINo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_billingteam = models.CharField(db_column='U_BillingTeam', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_btremarks = models.TextField(db_column='U_BTRemarks', blank=True, null=True)  # Field name made lowercase.
    u_grossinitialrate = models.DecimalField(db_column='U_GrossInitialRate', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_actualbilledrate = models.DecimalField(db_column='U_ActualBilledRate', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_rateadjustments = models.DecimalField(db_column='U_RateAdjustments', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_actualdemurrage = models.DecimalField(db_column='U_ActualDemurrage', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_actualaddcharges = models.DecimalField(db_column='U_ActualAddCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalrecclients = models.DecimalField(db_column='U_TotalRecClients', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_checkingtotalbilled = models.DecimalField(db_column='U_CheckingTotalBilled', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_checking = models.DecimalField(db_column='U_Checking', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_sobnumber = models.CharField(db_column='U_SOBNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_outletno = models.CharField(db_column='U_OutletNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_cbm = models.CharField(db_column='U_CBM', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_si_drno = models.CharField(db_column='U_SI_DRNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_deliverymode = models.CharField(db_column='U_DeliveryMode', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_sourcewhse = models.CharField(db_column='U_SourceWhse', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_totalinvamount = models.DecimalField(db_column='U_TotalInvAmount', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_sono = models.CharField(db_column='U_SONo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_namecustomer = models.CharField(db_column='U_NameCustomer', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_categorydr = models.CharField(db_column='U_CategoryDR', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_forwardload = models.CharField(db_column='U_ForwardLoad', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_backload = models.CharField(db_column='U_BackLoad', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_idnumber = models.CharField(db_column='U_IDNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_typeofaccessorial = models.CharField(db_column='U_TypeOfAccessorial', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_status = models.CharField(db_column='U_Status', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeinemptydem = models.CharField(db_column='U_TimeInEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeoutemptydem = models.CharField(db_column='U_TimeOutEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_verifiedemptydem = models.CharField(db_column='U_VerifiedEmptyDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeinloadeddem = models.CharField(db_column='U_TimeInLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeoutloadeddem = models.CharField(db_column='U_TimeOutLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_verifiedloadeddem = models.CharField(db_column='U_VerifiedLoadedDem', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_remarks = models.TextField(db_column='U_Remarks', blank=True, null=True)  # Field name made lowercase.
    u_timeinadvloading = models.CharField(db_column='U_TimeInAdvLoading', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_dayoftheweek = models.CharField(db_column='U_DayOfTheWeek', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timein = models.CharField(db_column='U_TimeIn', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_timeout = models.CharField(db_column='U_TimeOut', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_odoin = models.CharField(db_column='U_ODOIn', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_odoout = models.CharField(db_column='U_ODOOut', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_docnum = models.CharField(db_column='U_DocNum', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_podnum = models.CharField(db_column='U_PODNum', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_podsonum = models.CharField(db_column='U_PODSONum', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_updatedate = models.DateTimeField(db_column='U_UpdateDate', blank=True, null=True)  # Field name made lowercase.
    u_createdate = models.DateTimeField(db_column='U_CreateDate', blank=True, null=True)  # Field name made lowercase.
    u_updatetime = models.SmallIntegerField(db_column='U_UpdateTime', blank=True, null=True)  # Field name made lowercase.
    u_demurrage = models.DecimalField(db_column='U_Demurrage', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_addcharges = models.DecimalField(db_column='U_AddCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_cwt2307 = models.DecimalField(db_column='U_CWT2307', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_arinvlinenum = models.CharField(db_column='U_ARInvLineNum', max_length=10, blank=True, null=True)  # Field name made lowercase.
    u_noofdrops = models.DecimalField(db_column='U_NoOfDrops', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_solinenum = models.CharField(db_column='U_SOLineNum', max_length=10, blank=True, null=True)  # Field name made lowercase.
    u_totalexceed = models.DecimalField(db_column='U_TotalExceed', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalusage = models.DecimalField(db_column='U_TotalUsage', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_deliveryorigin = models.TextField(db_column='U_DeliveryOrigin', blank=True, null=True)  # Field name made lowercase.
    u_destination = models.TextField(db_column='U_Destination', blank=True, null=True)  # Field name made lowercase.
    u_destinationclient = models.TextField(db_column='U_DestinationClient', blank=True, null=True)  # Field name made lowercase.
    u_totalar = models.DecimalField(db_column='U_TotalAR', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_varar = models.DecimalField(db_column='U_VarAR', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = '@PCTP_BILLING'
