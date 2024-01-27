"""JCBAPortal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView
from . import views 
from LOGIN import views as views2
import debug_toolbar
urlpatterns = [
    #TEMPLATES
    path('admin/', admin.site.urls),
    path('login/', include('LOGIN.urls')),
    path('accounts/login/', include('LOGIN.urls')),
    path('dashboard/', include('DASHBOARD.urls')),
    path('', RedirectView.as_view(url='dashboard/')),

    #API
    path('api/', include('API.urls')),

    #ADMINISTRATION
    path('ousr/', include('OUSR.urls')),
    path('oadm/', include('OADM.urls')),

    #SALES
    path('ordr/', include('ORDR.urls')),
    

    #ADD ONS
    path('addon-pctp-uploader/', include('ADDON_PCTP_UPLOADER_1.urls')),
    path('addon-pctp-window/', include('ADDON_PCTP_WINDOW.urls')),


    #DATA
    path('get_user_modules', views.getModules, name='getModules'),

    #SUBMIT
    path('logout', views.processLogout, name='processLogout'),


    # DEBUG
    path('__debug__/', include(debug_toolbar.urls))

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
