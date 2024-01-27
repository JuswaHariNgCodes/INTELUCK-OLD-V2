from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'LOGIN'
urlpatterns = [
    #TEMPLATES
    path('', views.index, name='index'),


    #SUBMIT
    path('post-login', views.processLogin, name='processLogin'),
    path('post-logout', views.processLogout, name='processLogout'),
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)