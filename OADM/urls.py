from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'OADM'
urlpatterns = [
    #TEMPLATES
    path('admin-settings', views.index, name='index'),
    path('get-admin-content-rows', views.getAdminContentRows, name='getContentRows'),
    path('get-admin-content-rows-add', views.getAdminContentRowAdd, name='getContentRowsAdd'),
    #DATA
    


    #SUBMIT
    path('post-content-rows', views.postContentRows, name='postContentRows'),

    
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)