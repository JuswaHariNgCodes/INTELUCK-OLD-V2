from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'OUSR'
urlpatterns = [
    #TEMPLATES
    path('user-management', views.index, name='index'),


    #DATA
    # path('get-employee-master-data', views.getEmployeeMasterData, name='getEmployeeMasterData'),
    path('get-user-master-data', views.getUserMasterData, name='getUserMasterData'),
    path('get-user-profile', views.getUserProfile, name='getUserProfile'),
    
    #SUBMIT
    path('post-ousr', views.submitUser, name='submitUser'),

    
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)