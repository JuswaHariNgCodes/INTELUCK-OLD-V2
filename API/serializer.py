from rest_framework import serializers
from .models import PctpPod
from .models import PctpBilling
from .models import PctpTp 
from .models import PctpPricing

from .models import Vehicletypeandcap
from .models import DeliveryStatus

from .models import PctpPodWindowRowModel

#####################################################################################################################################################################
################# PCTP MODELS ###############################
#####################################################################################################################################################################
################# PCTP POD
class PctpPodSerializer(serializers.ModelSerializer):
    class Meta:
        model=PctpPod
        fields='__all__'
        
################# PCTP BILLING
class PctpBillingSerializer(serializers.ModelSerializer):
    class Meta:
        model=PctpBilling
        fields=(
            'code',
            'name',
            'u_bookingid',
            'u_bookingdate',
            'u_customername',
            'u_sapclient',
            'u_groupproject',
            'u_platenumber',
            'u_vehicletypecap',
            'u_deliverystatus',
            'u_deliverydatepod',
            'u_triptype',
            'u_waybillno',
            'u_shipmentmanifestno',
            'u_deliveryreceiptno',
            'u_seriesno',
            'u_otherpoddoc',
            'u_remarkspod',
            'u_clientreceiveddate',
            'u_actualhcrecdate',
            'u_podincharge',
            'u_verifieddatehc',
            'u_podstatusdetail',
            'u_ptfno',
            'u_dateforwardedbt',
            'u_billingdeadline',
            'u_billingstatus',
            'u_servicetype',
            'u_sino',
            'u_billingteam',
            'u_btremarks',
            'u_grossinitialrate',
            'u_actualbilledrate',
            'u_rateadjustments',
            'u_actualdemurrage',
            'u_actualaddcharges',
            'u_totalrecclients',
            'u_checkingtotalbilled',
            'u_checking',
            'u_sobnumber',
            'u_outletno',
            'u_cbm',
            'u_si_drno',
            'u_deliverymode',
            'u_sourcewhse',
            'u_totalinvamount',
            'u_sono',
            'u_namecustomer',
            'u_categorydr',
            'u_forwardload',
            'u_backload',
            'u_idnumber',
            'u_typeofaccessorial',
            'u_status',
            'u_timeinemptydem',
            'u_timeoutemptydem',
            'u_verifiedemptydem',
            'u_timeinloadeddem',
            'u_timeoutloadeddem',
            'u_verifiedloadeddem',
            'u_remarks',
            'u_timeinadvloading',
            'u_dayoftheweek',
            'u_timein',
            'u_timeout',
            'u_odoin',
            'u_odoout',
            'u_docnum',
            'u_podnum',
            'u_podsonum',
            'u_updatedate',
            'u_createdate',
            'u_updatetime',
            'u_demurrage',
            'u_addcharges',
            'u_cwt2307',
            'u_arinvlinenum',
            'u_noofdrops',
            'u_solinenum',
            'u_totalexceed',
            'u_totalusage',
            'u_deliveryorigin',
            'u_destination',
            'u_destinationclient',
            'u_totalar',
            'u_varar'
        )

################# PCTP TP
class PctpTpSerializer(serializers.ModelSerializer):
    class Meta:
        model=PctpTp
        fields=(
            'code',
            'name',
            'u_bookingid',
            'u_bookingdate',
            'u_clientname',
            'u_truckername',
            'u_truckersap',
            'u_deliverystatus',
            'u_deliverydatepod',
            'u_tripticketno',
            'u_waybillno',
            'u_shipmentmanifestno',
            'u_deliveryreceiptno',
            'u_seriesno',
            'u_otherpoddoc',
            'u_tpstatus',
            'u_grosstruckerrates',
            'u_grosstruckerratesn',
            'u_ratebasis',
            'u_taxtype',
            'u_demurrage',
            'u_addtldrop',
            'u_boomtruck',
            'u_manpower',
            'u_backload',
            'u_addtlcharges',
            'u_demurragen',
            'u_addtlchargesn',
            'u_actualrates',
            'u_rateadjustments',
            'u_actualdemurrage',
            'u_actualcharges',
            'u_boomtruck2',
            'u_othercharges',
            'u_totalsubpenalty',
            'u_totalpenaltywaived',
            'u_totalpenalty',
            'u_totalpayable',
            'u_ewt2307',
            'u_totalpayablerec',
            'u_paymentvoucherno',
            'u_orrefno',
            'u_actualpaymentdate',
            'u_paymentreference',
            'u_paymentstatus',
            'u_remarks',
            'u_updatedate',
            'u_createdate',
            'u_podnum',
            'u_podsonum',
            'u_docnum',
            'u_aging',
            'u_apinvlinenum',
            'u_pvno',
            'u_tpincharge',
            'u_caanddp',
            'u_interest',
            'u_otherdeductions',
            'u_totaldeductions',
            'u_remarks1',
            'u_totalap',
            'u_vartp'
        )

################# PCTP PRICING      
class PctpPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model=PctpPricing
        fields=(
            'code',
            'name',
            'u_bookingid',
            'u_bookingdate',
            'u_customername',
            'u_clienttag',
            'u_clientproject',
            'u_truckername',
            'u_truckertag',
            'u_vehicletypecap',
            'u_deliverystatus',
            'u_triptype',
            'u_remarksdtr',
            'u_remarkspod',
            'u_grossclientrates',
            'u_grossclientratestax',
            'u_ratebasis',
            'u_taxtype',
            'u_grossprofitnet',
            'u_totaladdtlcharges',
            'u_totaladdtlcharges2',
            'u_addtlcharges',
            'u_grossprofit',
            'u_totalinitialclient',
            'u_totalinitialtruckers',
            'u_totalgrossprofit',
            'u_clienttag2',
            'u_updatedate',
            'u_createdate',
            'u_podnum',
            'u_grosstruckerrates',
            'u_grosstruckerratestax',
            'u_ratebasist',
            'u_taxtypet',
            'u_demurrage4',
            'u_addtlcharges2',
            'u_grossprofitc',
            'u_addtldrop',
            'u_addtldrop2',
            'u_backload',
            'u_backload2',
            'u_boomtruck',
            'u_boomtruck2',
            'u_demurrage',
            'u_demurrage2',
            'u_demurrage3',
            'u_manpower',
            'u_manpower2',
            'u_noofdrops',
            'u_deliveryorigin',
            'u_destination',
        )

#####################################################################################################################################################################
################# PCTP WINDOW VIEWING MODELS ###############################
#####################################################################################################################################################################
################# PCTP VEHICLE TYPE AND CAP

################# PCTP POD
class PctpPodWindowModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=PctpPodWindowRowModel
        fields='__all__'


class PctpWindowPODViewSerializer(serializers.ModelSerializer):
    # # vehicletypeadcap = VehicleTypeAndCapSerialzer(many=True,read_only=True)
    # vehicle_details = VehicleTypeAndCapSerialzer(many=True,read_only=True)
    class Meta:
        model=PctpPod
        fields='__all__'

class VehicleTypeAndCapSerialzer(serializers.ModelSerializer):
    class Meta:
        model=Vehicletypeandcap
        fields='__all__'

class DeliveryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vehicletypeandcap
        fields='__all__'
