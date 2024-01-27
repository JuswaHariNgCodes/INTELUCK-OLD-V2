from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static


app_name = 'API'
urlpatterns = [
    ########################################################################################################################
    #  START PCTP
    ########################################################################################################################
        ###### POST
            path('pctp-post-tables', views.postPctpTables, name='postPctpTables'),


        ###### GET
            # Latest 200 POD
            # path('pctp-latest-200', views.APIView_PCTP_Window.as_view(), name='getPctpLatest200'),

            path('pctp-latest-200', views.APIView_PCTP_Window_POD, name='getPctpLatest200'),
            path('pctp-vehicle-type-and-capacity', views.APIView_Vehicle_Type_And_Capacity.as_view(), name='getVehicleTypeAndCapacityLatest200'),


            # path('pctp-pod-latest-200', views.getPctpPodLatest200, name='getPctpPodLatest200'),


            path('pctp-pod-api', views.getPctpPod, name='getPctpPod'),
            path('pctp-billing-api', views.getPctpBilling, name='getPctpBilling'),
            path('pctp-tp-api', views.getPctpTp, name='getPctpTp'),
            path('pctp-pricing-api', views.getPctpPricing, name='getPctpPricing'),
    
    ########################################################################################################################
    #  END PCTP
    ########################################################################################################################



    ########################################################################################################################
    #  START DATA
    ########################################################################################################################
    

    ########################################################################################################################
    #  END DATA
    ########################################################################################################################

    # CONTENT
   
   
    #SUBMIT
    
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)