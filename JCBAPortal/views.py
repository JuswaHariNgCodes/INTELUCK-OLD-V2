import json
from django.http import JsonResponse
from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework.response import Response


#models
from django.contrib.auth.models import User

import requests
# Create your views here.

# def index(request):
#     return HttpResponse('Hello Dawg!')

#DATA
def getModules(request):
        user_modules=request.GET.get('modules')
        print (request.GET.get('userid'))
        print (request.GET.get('modules'))
        return HttpResponse({
                       user_modules
                })

#SUBMIT
def processLogout(request):
     base_url = request.session['base_dir']
     print(request.session['base_dir'])
     print('---------------------------------------------------------')
     logout(request)
     return HttpResponseRedirect(base_url + 'login/')
