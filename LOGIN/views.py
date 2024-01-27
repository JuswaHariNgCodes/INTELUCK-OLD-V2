import json
from django.http import JsonResponse
from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required, permission_required
from rest_framework.response import Response
from django.forms.models import model_to_dict
from importlib import import_module 
from pathlib import Path

#models
from django.contrib.auth.models import User
from OUSR.models import Profile

import requests
# Create your views here.

# def index(request):
#     return HttpResponse('Hello Dawg!')

baseurl = 'http://127.0.0.1:8070/'
#TEMPLATES
def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(baseurl + 'dashboard/')
      
    else:
        cursor = connections['SBO-COMMON'].cursor()
        cursor.execute("SELECT * FROM [SRGC]")
        data = cursor.fetchall()
        return render(request,'login/index.html',{'data': data})
    

#SUBMIT
def processLogin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    database,company = request.POST.get('selDatabase').split('%')
   
    user = authenticate(username=username,password=password)
    if user is not None:
        request.session['username'] = username
        request.session['CompanyName'] = company
        #SAPB1 CONFIG
        request.session['DbServerType'] = 10
        request.session['Server'] = 'JUSWA'
        request.session['UseTrusted'] = False
        request.session['DBusername'] = 'sa'
        request.session['DBpassword'] = 'SAPB1Admin'
        request.session['CompanyDB'] = database
        request.session['SapB1Username'] = 'manager'
        request.session['password'] = 'sapb1'
        request.session['LicenseServer'] = 'JUSWA:30000'

        #SAP B1 SERVICE LAYER LOGIN
        #http prefix
        http = 'https://'
        #Host name
        host = request.session['Server']
        #Port
        port = '50000'

        #Login credentials
        payload = {

            "CompanyDB" : database,
            "UserName" : request.session['SapB1Username'],
            "Password" : request.session['password']

        }
        #payload = '{ "UserName" : "manager", "Password" : "sapb1","CompanyDB" : "Inteluck_Train" }'
        jsonPayload = json.dumps(payload)
        url = http + host + ":" + port + "/b1s/v1/Login"
        requestUrl = requests.post(url, data=jsonPayload, verify=False)
        print(requestUrl.text)

        convertedDict = json.loads(requestUrl.text)

        print("After conversion: ", convertedDict)
        print(type(convertedDict))
        print('SAPB1 Service Layer Session ID: ' + convertedDict["SessionId"])
        
        request.session['SessionId'] = convertedDict["SessionId"]

        # SET DATE FORMAT 
        url = 'https://' + request.session['Server'] + ':50000/b1s/v1/CompanyService_GetAdminInfo'
        sessionId = request.session['SessionId']
        headers = {
                        "Cookie": "B1SESSION=" + sessionId + "; ROUTEID",
        }
        adminDetailsResponse = requests.post(url, headers=headers,verify=False)
        convertedDictAdmin = json.loads(adminDetailsResponse.text)

        # "TimeTemplate": "tt_24H",
        # "DateTemplate": "dt_MMDDCCYY",
        # "DateSeparator": ".",

        request.session['TimeTemplate'] = convertedDictAdmin["DateTemplate"]
        request.session['DateTemplate'] = convertedDictAdmin["DateTemplate"]
        request.session['DateSeparator'] = convertedDictAdmin["DateSeparator"]

        request.session['TotalsAccuracy'] = convertedDictAdmin["TotalsAccuracy"]
        request.session['AccuracyofQuantities'] = convertedDictAdmin["AccuracyofQuantities"]
        request.session['PriceAccuracy'] = convertedDictAdmin["PriceAccuracy"]
        request.session['RateAccuracy'] = convertedDictAdmin["RateAccuracy"]
        request.session['PercentageAccuracy'] = convertedDictAdmin["PercentageAccuracy"]
        request.session['MeasuringAccuracy'] = convertedDictAdmin["MeasuringAccuracy"]
        request.session['QueryAccuracy'] = convertedDictAdmin["QueryAccuracy"]
        print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        print(convertedDictAdmin["DateTemplate"])

        print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        # match convertedDictAdmin["DateTemplate"]:
        #     case "None":
        #         print("You can become a web developer.")

        #     case "None":
        #         print("You can become a Data Scientist")

        #     case "None":
        #         print("You can become a backend developer")
            
        #     case "None":
        #         print("You can become a Blockchain developer")

        #     case "None":
        #         print("You can become a mobile app developer")

        #     case "dt_MMDDCCYY":
        #         request.session['DateFormat'] = 'dd.mm.yyyy'

        #     case "None":
        #         print("You can become a mobile app developer")

        #     case _:
        #         print("The language doesn't matter, what matters is solving problems.")


        # GET USER DETAILS IN USER DATA BASE AND SAP B1 OHEM
        user_id = User.objects.only('id',).get(username=username)
        user_details = Profile.objects.get(user_id=user_id)
        sapb1_empid = user_details.sapb1_employee_id
        cursor = connections[database].cursor()
        cursor.execute("SELECT firstName,lastName FROM [OHEM] WHERE empID = %s", [sapb1_empid])
        dataSAPB1Data = cursor.fetchall()

        firstName = ''
        lastname = ''
        for value in dataSAPB1Data:
            print(f'first name: {value[0]}')
            print(f'last name: {value[1]}')
            firstName = value[0]
            lastname = value[1]

      
       
        request.session['user_id'] = user_details.user_id
        request.session['sapb1_employee_id'] = user_details.sapb1_employee_id
        request.session['firstName'] = firstName
        request.session['lastName'] = lastname
        request.session['user_modules'] = user_details.user_modules
        request.session['user_profilepic'] = str(user_details.user_profilepic)

        # Build paths inside the project like this: BASE_DIR / 'subdir'.
        request.session['base_dir'] = 'http://127.0.0.1:8070/'
        
        print(user_details.sapb1_employee_id)
        print(user_details)
        print(user_details.user_modules)
        # ACTUAL USER LOGIN
        requestResult = json.dumps(requestUrl.text)
        login(request, user)


        cursor.close()
        data = {
            'type': 'Success',
            'message': 'Successfully logged in!',
            'content': requestResult
        }
        return JsonResponse(data, content_type="application/json")


    else:
        data = {
            'type': 'Error',
            'message': 'Failure!',
        }
        return JsonResponse(data)
    
def processLogout(request):
        logout(request)



