# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class PctpTp(models.Model):
    code = models.AutoField(db_column='Code', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_bookingid = models.CharField(db_column='U_BookingId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_bookingdate = models.DateTimeField(db_column='U_BookingDate', blank=True, null=True)  # Field name made lowercase.
    u_clientname = models.CharField(db_column='U_ClientName', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_truckername = models.CharField(db_column='U_TruckerName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_truckersap = models.CharField(db_column='U_TruckerSAP', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_deliverystatus = models.CharField(db_column='U_DeliveryStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverydatepod = models.DateTimeField(db_column='U_DeliveryDatePOD', blank=True, null=True)  # Field name made lowercase.
    u_tripticketno = models.CharField(db_column='U_TripTicketNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_waybillno = models.CharField(db_column='U_WaybillNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_shipmentmanifestno = models.CharField(db_column='U_ShipmentManifestNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_deliveryreceiptno = models.CharField(db_column='U_DeliveryReceiptNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_seriesno = models.CharField(db_column='U_SeriesNo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_otherpoddoc = models.TextField(db_column='U_OtherPODDoc', blank=True, null=True)  # Field name made lowercase.
    u_tpstatus = models.CharField(db_column='U_TPStatus', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_grosstruckerrates = models.DecimalField(db_column='U_GrossTruckerRates', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_grosstruckerratesn = models.DecimalField(db_column='U_GrossTruckerRatesN', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_ratebasis = models.CharField(db_column='U_RateBasis', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_taxtype = models.CharField(db_column='U_TaxType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_demurrage = models.CharField(db_column='U_Demurrage', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_addtldrop = models.CharField(db_column='U_AddtlDrop', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_boomtruck = models.CharField(db_column='U_BoomTruck', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_manpower = models.CharField(db_column='U_Manpower', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_backload = models.CharField(db_column='U_BackLoad', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_addtlcharges = models.DecimalField(db_column='U_Addtlcharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_demurragen = models.CharField(db_column='U_DemurrageN', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_addtlchargesn = models.CharField(db_column='U_AddtlChargesN', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_actualrates = models.DecimalField(db_column='U_ActualRates', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_rateadjustments = models.DecimalField(db_column='U_RateAdjustments', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_actualdemurrage = models.CharField(db_column='U_ActualDemurrage', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_actualcharges = models.DecimalField(db_column='U_ActualCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_boomtruck2 = models.CharField(db_column='U_BoomTruck2', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_othercharges = models.DecimalField(db_column='U_OtherCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalsubpenalty = models.DecimalField(db_column='U_TotalSubPenalty', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalpenaltywaived = models.DecimalField(db_column='U_TotalPenaltyWaived', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalpenalty = models.DecimalField(db_column='U_TotalPenalty', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalpayable = models.DecimalField(db_column='U_TotalPayable', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_ewt2307 = models.DecimalField(db_column='U_EWT2307', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalpayablerec = models.DecimalField(db_column='U_TotalPayableRec', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_paymentvoucherno = models.CharField(db_column='U_PaymentVoucherNo', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_orrefno = models.CharField(db_column='U_ORRefNo', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_actualpaymentdate = models.DateTimeField(db_column='U_ActualPaymentDate', blank=True, null=True)  # Field name made lowercase.
    u_paymentreference = models.CharField(db_column='U_PaymentReference', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_paymentstatus = models.CharField(db_column='U_PaymentStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_remarks = models.TextField(db_column='U_Remarks', blank=True, null=True)  # Field name made lowercase.
    u_updatedate = models.DateTimeField(db_column='U_UpdateDate', blank=True, null=True)  # Field name made lowercase.
    u_createdate = models.DateTimeField(db_column='U_CreateDate', blank=True, null=True)  # Field name made lowercase.
    u_podnum = models.CharField(db_column='U_PODNum', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_podsonum = models.CharField(db_column='U_PODSONum', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_docnum = models.CharField(db_column='U_DocNum', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_aging = models.DateTimeField(db_column='U_Aging', blank=True, null=True)  # Field name made lowercase.
    u_apinvlinenum = models.CharField(db_column='U_APInvLineNum', max_length=10, blank=True, null=True)  # Field name made lowercase.
    u_pvno = models.CharField(db_column='U_PVNo', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_tpincharge = models.CharField(db_column='U_TPincharge', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_caanddp = models.DecimalField(db_column='U_CAandDP', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_interest = models.DecimalField(db_column='U_Interest', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_otherdeductions = models.DecimalField(db_column='U_OtherDeductions', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totaldeductions = models.DecimalField(db_column='U_TOTALDEDUCTIONS', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_remarks1 = models.CharField(db_column='U_REMARKS1', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_totalap = models.DecimalField(db_column='U_TotalAP', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_vartp = models.DecimalField(db_column='U_VarTP', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = '@PCTP_TP'
