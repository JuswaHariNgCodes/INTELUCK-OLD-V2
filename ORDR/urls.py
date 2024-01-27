from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'ORDR'
urlpatterns = [
    ########################################################################################################################
    #  START TEMPLATES
    ########################################################################################################################

        path('sales-order', views.index, name='index'),
        path('get-content-rows', views.getContentRows, name='getContentRows'),
        path('get-content-rows-add', views.getContentRowsAdd, name='getContentRowsAdd'),
        path('get-form-settings-ordr', views.getFormSettingsRows, name='getFormSettingsRows'),
        path('get-udf-header', views.getUDFsHeader, name='getUDFsHeader'),
    
    ########################################################################################################################
    #  END TEMPLATES
    ########################################################################################################################



    ########################################################################################################################
    #  START DATA
    ########################################################################################################################
    

        # START BUSINESS PARTNER DATA
        path('get-business-partner-details', views.getBusinessPartnerDetails, name='getBusinessPartnerDetails'),
        path('get-business-partner-details-address-s-details', views.getBusinessPartnerDetailsAddressShipDetails, name='getBusinessPartnerDetailsAddressShipDetails'),
        path('get-business-partner-details-address-b-details', views.getBusinessPartnerDetailsAddressBillDetails, name='getBusinessPartnerDetailsAddressBillDetails'),
        # END BUSINESS PARTNER DATA

        # START UDF UDT/UDO/SO
        path('get-udf-details', views.getUDFDetails, name='getUDFDetails'),
        # END UDF UDT/UDO/SO
    ########################################################################################################################
    #  END DATA
    ########################################################################################################################

    # CONTENT
    path('get-item-details', views.getItemDetails, name='getItemDetails'),
    path('get-uom-details', views.getUomDetails, name='getUomDetails'),
    path('get-whse-details', views.getWarehouseDetails, name='getWarehouseDetails'),
    
    # path('get-input-search', views.getInputSearch, name='getInputSearch'),
    
    #SUBMIT
    path('post-form-settings-ordr', views.postFormSettingsRows, name='postFormSettingsRows'),
    path('crystal-trial', views.extract, name='extract'),
    path('get-document-ORDR', views.getDocument, name='getDocument')

    
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)