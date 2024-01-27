# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class PctpPricing(models.Model):
    code = models.AutoField(db_column='Code', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_bookingid = models.CharField(db_column='U_BookingId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_bookingdate = models.DateTimeField(db_column='U_BookingDate', blank=True, null=True)  # Field name made lowercase.
    u_customername = models.CharField(db_column='U_CustomerName', max_length=254, blank=True, null=True)  # Field name made lowercase.
    u_clienttag = models.CharField(db_column='U_ClientTag', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_clientproject = models.CharField(db_column='U_ClientProject', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_truckername = models.CharField(db_column='U_TruckerName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_truckertag = models.CharField(db_column='U_TruckerTag', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_vehicletypecap = models.CharField(db_column='U_VehicleTypeCap', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_deliverystatus = models.CharField(db_column='U_DeliveryStatus', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_triptype = models.CharField(db_column='U_TripType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_remarksdtr = models.TextField(db_column='U_RemarksDTR', blank=True, null=True)  # Field name made lowercase.
    u_remarkspod = models.TextField(db_column='U_RemarksPOD', blank=True, null=True)  # Field name made lowercase.
    u_grossclientrates = models.DecimalField(db_column='U_GrossClientRates', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_grossclientratestax = models.DecimalField(db_column='U_GrossClientRatesTax', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_ratebasis = models.CharField(db_column='U_RateBasis', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_taxtype = models.CharField(db_column='U_TaxType', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_grossprofitnet = models.DecimalField(db_column='U_GrossProfitNet', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totaladdtlcharges = models.DecimalField(db_column='U_TotalAddtlCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totaladdtlcharges2 = models.DecimalField(db_column='U_totalAddtlCharges2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_addtlcharges = models.DecimalField(db_column='U_AddtlCharges', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_grossprofit = models.DecimalField(db_column='U_GrossProfit', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalinitialclient = models.DecimalField(db_column='U_TotalInitialClient', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalinitialtruckers = models.DecimalField(db_column='U_TotalInitialTruckers', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_totalgrossprofit = models.DecimalField(db_column='U_TotalGrossProfit', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_clienttag2 = models.CharField(db_column='U_ClientTag2', max_length=100, blank=True, null=True)  # Field name made lowercase.
    u_updatedate = models.DateTimeField(db_column='U_UpdateDate', blank=True, null=True)  # Field name made lowercase.
    u_createdate = models.DateTimeField(db_column='U_CreateDate', blank=True, null=True)  # Field name made lowercase.
    u_podnum = models.CharField(db_column='U_PODNum', max_length=25, blank=True, null=True)  # Field name made lowercase.
    u_grosstruckerrates = models.DecimalField(db_column='U_GrossTruckerRates', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_grosstruckerratestax = models.DecimalField(db_column='U_GrossTruckerRatesTax', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_ratebasist = models.CharField(db_column='U_RateBasisT', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_taxtypet = models.CharField(db_column='U_TaxTypeT', max_length=50, blank=True, null=True)  # Field name made lowercase.
    u_demurrage4 = models.DecimalField(db_column='U_Demurrage4', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_addtlcharges2 = models.DecimalField(db_column='U_AddtlCharges2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_grossprofitc = models.DecimalField(db_column='U_GrossProfitC', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_addtldrop = models.DecimalField(db_column='U_AddtlDrop', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_addtldrop2 = models.DecimalField(db_column='U_AddtlDrop2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_backload = models.DecimalField(db_column='U_Backload', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_backload2 = models.DecimalField(db_column='U_Backload2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_boomtruck = models.DecimalField(db_column='U_BoomTruck', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_boomtruck2 = models.DecimalField(db_column='U_BoomTruck2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_demurrage = models.DecimalField(db_column='U_Demurrage', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_demurrage2 = models.DecimalField(db_column='U_Demurrage2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_demurrage3 = models.DecimalField(db_column='U_Demurrage3', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_manpower = models.DecimalField(db_column='U_Manpower', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_manpower2 = models.DecimalField(db_column='U_Manpower2', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_noofdrops = models.DecimalField(db_column='U_NoOfDrops', max_digits=19, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    u_deliveryorigin = models.TextField(db_column='U_DeliveryOrigin', blank=True, null=True)  # Field name made lowercase.
    u_destination = models.TextField(db_column='U_Destination', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = '@PCTP_PRICING'
