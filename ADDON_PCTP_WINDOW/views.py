import json
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db import connections
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pyunpack import Archive
import win32com
from win32com.client import Dispatch
#models
from django.contrib.auth.models import User
from OUSR.models import Profile 
from pathlib import Path
import requests
import pandas 
import time
import datetime
# Importing numpy package
import numpy as np
# Create your views here.
# GLOBAL VARIABLES
def index(request):
        return HttpResponse ('haha')


def getLatest200POD(request):
        return HttpResponse ('haha')
# mainTableSAP = 'ORDR'
# cardType = 'C'

# item_code_list = []
# pod_booking_number_list = []
# billing_booking_number_list = []
# tp_booking_number_list = []
# pricing_booking_number_list = []

# client_tag_code_list = []
# trucker_tag_code_list = []

# vehicle_type_code_list = []
# vehicle_type_name_list = []

# date_format = "%m/%d/%Y"
# # date_format = "%Y-%m-%d"


# def read_sql_query(sql_path: Path) ->str:
# 	return Path(sql_path).read_text()


# cursor = connections['MPC_TEST_3'].cursor()
# # PCTP DELIVERY STATUS
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_vehicle_type_and_capacity.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultVehicleTypeAndCapacityJson = result


# # PCTP DELIVERY STATUS
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_delivery_status.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultDeliveryStatusJson = result

# # PCTP TRIP TYPE
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_trip_type.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultTripTypeJson = result

# # PCTP POD STATUS
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_pod_status.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultPodStatusJson = result



# print(queryResultPodStatusJson)
# # PCTP BILLING STATUS
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_billing_status.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultBillingStatusJson = result


# # PCTP TYPE OF ACCESSORIAL
# query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_type_of_accessorial.sql')
# cursor.execute(query)
# columns = [x[0] for x in cursor.description]
# values = cursor.fetchall()
# result = []
# i2 = 0
# valuesLength = len(values)

# for row in values:
#         result.append(dict(zip(columns,row)))
#         i2+=1
# if i2 == valuesLength:
#         queryResultTypeOfAccessorialJson = result






# cursor.close()


# @login_required(login_url='/login')
# # TEMPLATES
# def index(request):
#         if request.session['user_modules'] is not None:
#                 request.session['module_name'] = 'PCTP Window'

#                 user_modules = request.session['user_modules']
#                 user_details = Profile.objects.get(user_id=request.session['user_id'])
#                 print(request.session['user_id'])
#                 print(request.session['CompanyDB'])
#                 print(request.session['base_dir'])
#                 print(request.session.get('base_dir'))

#                 params = {
#                                 'database': request.session['CompanyDB']
#                         }
               
#                 pctpPod = requests.get(request.session['base_dir'] + 'api/pctp-latest-200',params=params)

#                 cursor = connections[request.session['CompanyDB']].cursor()


#                 # PCTP POD ROWS
#                 # query = read_sql_query('ADDON_PCTP_WINDOW/SQL Scripts/pctp_pod_window.sql')
#                 # cursor.execute(query)
#                 # columns = [x[0] for x in cursor.description]
#                 # values = cursor.fetchall()
#                 # result = []
#                 # i2 = 0
#                 # valuesLength = len(values)

#                 # for row in values:
#                 #         result.append(dict(zip(columns,row)))
#                 #         i2+=1
#                 # if i2 == valuesLength:
#                 #         queryResultPODJson = result



               
                
#                 # if pctpPod.status_code == 200:
#                 pctpPodJson = pctpPod._content
#                 # .decode('utf8')
#                 # vehicleTypeJson = vehicleType._content.decode('utf8')
#                 # .replace("'", '"')
#                 # print(pctpPodJson)

#                 # USE THIS IF YOU WILL USE THE POD API CALL
#                 queryResultPODJson = pctpPodJson.decode('utf8').replace("'", '"')
#                 # 'queryResultPODJson':  json.loads(pctpPodJson),

#                 # .json()
#                 # print(json.loads(pctpPodJson))
#                 print('------------------------------------------')
#                 print(queryResultVehicleTypeAndCapacityJson)
#                 print('------------------------------------------')
#                 # print(type(json.loads(pctpPodJson)))
#                 print(type(queryResultVehicleTypeAndCapacityJson))
                
#                 print('--------------------------------------------------')
#                 print(queryResultPodStatusJson)
#                 data = {
#                         'queryResultPODJson': '',
#                         'queryResultVehicleTypeAndCapacityJson': queryResultVehicleTypeAndCapacityJson,
#                         'queryResultDeliveryStatusJson':queryResultDeliveryStatusJson,
#                         'queryResultTripTypeJson':queryResultTripTypeJson,
#                         'queryResultPodStatusJson':queryResultPodStatusJson,
#                         'queryResultBillingStatusJson':queryResultBillingStatusJson,
#                         'queryResultTypeOfAccessorialJson':queryResultTypeOfAccessorialJson
#                 }

#                 if 'addon-pctpwindow' in user_modules:
#                         return render(request,'addon-pctp-window/index.html',data)
#                 else:
#                         return HttpResponse({
#                         'Module not assigned to you!'
#                         })


               
                    
                

# def getLatest200POD(request):
#         params = {
#                                 'database': request.session['CompanyDB'],
#                                 'valueToFind': request.GET.get('valueToFind'),
#                                 'fromBookingDate': request.GET.get('fromBookingDate'),
#                                 'toBookingDate': request.GET.get('toBookingDate'),
#                                 'fromDeliveryDate': request.GET.get('fromDeliveryDate'),
#                                 'toDeliveryDate': request.GET.get('toDeliveryDate'),
#                                 'ClienTag': request.GET.get('ClienTag'),
#                                 'TruckerTag': request.GET.get('TruckerTag'),
#                                 'PODStatus': request.GET.get('PODStatus'),
#                                 'PTFNo': request.GET.get('PTFNo')
#                         }
#         pctpPod = requests.get(request.session['base_dir'] + 'api/pctp-latest-200',params=params)
#         if pctpPod.status_code == 200:      
#                 pctpPodJson = pctpPod._content
                

                
#                 data={
#                         'queryResultPODJson':  json.loads(pctpPodJson),
#                         'queryResultVehicleTypeAndCapacityJson': queryResultVehicleTypeAndCapacityJson,
#                         'queryResultDeliveryStatusJson':queryResultDeliveryStatusJson,
#                         'queryResultTripTypeJson':queryResultTripTypeJson,
#                         'queryResultPodStatusJson':queryResultPodStatusJson,
#                         'queryResultBillingStatusJson':queryResultBillingStatusJson,
#                         'queryResultTypeOfAccessorialJson':queryResultTypeOfAccessorialJson
#                 }     

#                 return render(request,'addon-pctp-window/partials/addon-pctp-window-contents-row-lines-POD.html',data)
# SUBMIT
