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
import requests
import pandas 
import time
import datetime
# Importing numpy package
import numpy as np
# Create your views here.
# GLOBAL VARIABLES
mainTableSAP = 'ORDR'
cardType = 'C'

item_code_list = []
pod_booking_number_list = []
billing_booking_number_list = []
tp_booking_number_list = []
pricing_booking_number_list = []

client_tag_code_list = []
trucker_tag_code_list = []

vehicle_type_code_list = []
vehicle_type_name_list = []

date_format = "%m/%d/%Y"
# date_format = "%Y-%m-%d"




@login_required(login_url='/login')
# TEMPLATES
def index(request):
        if request.session['user_modules'] is not None:
                request.session['module_name'] = 'PCTP Uploader'

                user_modules = request.session['user_modules']
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                print(request.session['user_id'])
                print(request.session['CompanyDB'])

                


                if 'addon-pctpuploader1' in user_modules:
                        data={
                        }

                        return render(request,'addon-pctp-uploader-1/index.html',data)
                else:
                        return HttpResponse({
                        'Module not assigned to you!'
                        })
# SUBMIT
@csrf_exempt
def postUploadCSV(request):

        cursor = connections[request.session['CompanyDB']].cursor()

        # GET ITEM MASTER DATA
        query = "SELECT ItemCode FROM [OITM]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                item_code_list.append(row[0])
        print('--------------------------------------------------')

        # GET POD DATA
        query = "SELECT U_BookingNumber FROM [@PCTP_POD]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                pod_booking_number_list.append(row[0])
        print('--------------------------------------------------')

        # GET BILLING DATA
        query = "SELECT U_BookingId FROM [@PCTP_BILLING]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                billing_booking_number_list.append(row[0])
        print('--------------------------------------------------')

        # GET TP DATA
        query = "SELECT U_BookingId FROM [@PCTP_TP]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                tp_booking_number_list.append(row[0])
        print('--------------------------------------------------')

        # GET PRICING DATA
        query = "SELECT U_BookingId FROM [@PCTP_PRICING]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                pricing_booking_number_list.append(row[0])
        print('--------------------------------------------------')

        # GET BUSINESS PARTNER
        query = "SELECT CardCode FROM [OCRD]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                client_tag_code_list.append(row[0])
        print('--------------------------------------------------')

        # GET VEHICLE TYPE    
        query = "SELECT * FROM [@VEHICLETYPEANDCAP]"
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        result = cursor.fetchall()
        for row in result:
                vehicle_type_code_list.append(row[0])
                vehicle_type_name_list.append(row[1])
        print('--------------------------------------------------')
        
        cursor.close()
        print(request)
        print(len(item_code_list))
        print(len(pod_booking_number_list))
        requiredValues = 0
        invalidValues = 0
        invalidDate = 0

        existingValues = 0
        existingValuesPOD = 0
        existingValuesBilling = 0
        existingValuesTP = 0
        existingValuesPricing = 0

        notUniqueValues = 0
        postableItem = 0
        postablePOD = 0

        ready = 0
        failed = 0
        count = 0

        csv_file = request.FILES["csvFile"]

        df = pandas.read_csv(csv_file,skiprows=1, encoding = 'iso-8859-1')
       
        pandas.set_option('display.colheader_justify', 'center')
      
        df.rename(columns = {'Unnamed: 0':''}, inplace = True)
        df2=df.drop(df.columns[0], axis=1)
        
        df2.fillna(value='', inplace=True)
        
        df2.index = np.arange(1, len(df) + 1)

        duplicate = df2[df2.duplicated('Booking Number')]
        duplicate = duplicate[duplicate['Booking Number'].str.len() > 0]

        # not included in count
        cols = ['Error Message','Upload Status']

        count = str(df.notna().sum().sum())
        print(count)
        print(type(count))
        print('***********')
        print(df2)
        for ind in df2.index:
                requiredValuesPerRow = 0
                invalidValuesPerRow = 0
                invalidDatePerRow = 0

                existingValuesPerRow = 0
                existingValuesPODPerRow = 0
                existingValuesBillingPerRow = 0
                existingValuesTPPerRow = 0
                existingValuesPricingPerRow = 0

                notUniqueValuesPerRow = 0
                # DATE CONVERSION 
             


                # REQUIRED FIELDS
                if(df2['Booking Number'][ind] == ''):
                       requiredValuesPerRow += 1
                       df2.at[ind,'Booking Number']=df2['Booking Number'][ind] + ' - RequiredValue'
                       requiredValues += 1
                if(df2['SAP Client Code'][ind] == ''):
                       requiredValuesPerRow += 1
                       df2.at[ind,'SAP Client Code']=df2['SAP Client Code'][ind] + ' - RequiredValue'
                       requiredValues += 1
                if(df2['SAP Vendor Code'][ind] == ''):
                       requiredValuesPerRow += 1
                       df2.at[ind,'SAP Vendor Code']=df2['SAP Vendor Code'][ind] + ' - RequiredValue'
                       requiredValues += 1

                # INVALID VALUE FIELDS
                if(df2['SAP Client Code'][ind] not in client_tag_code_list):
                        invalidValuesPerRow += 1
                        df2.at[ind,'SAP Client Code']=df2['SAP Client Code'][ind] + ' - InvalidValue'
                        invalidValues += 1
                if(df2['SAP Vendor Code'][ind] not in client_tag_code_list):
                        invalidValuesPerRow += 1
                        df2.at[ind,'SAP Vendor Code']=df2['SAP Vendor Code'][ind] + ' - InvalidValue'
                        invalidValues += 1

                if(df2['Vehicle Type & Capacity'][ind] not in vehicle_type_name_list):
                        invalidValuesPerRow += 1
                        df2.at[ind,'Vehicle Type & Capacity']=df2['Vehicle Type & Capacity'][ind] + ' - InvalidValue'
                        invalidValues += 1
                else:
                        code = vehicle_type_name_list.index(df2['Vehicle Type & Capacity'][ind])
                        df2.at[ind,'Vehicle Type & Capacity']= vehicle_type_code_list[code]

                # ALREADY EXISTING ITEM
                # ALREADY EXISTING POD
                # ALREADY EXISTING BILLING
                # ALREADY EXISTING TP
                # ALREADY EXISTING PRICING
                if(df2['Booking Number'][ind] in item_code_list):
                        existingValuesPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind]
                        existingValues += 1


                if(df2['Booking Number'][ind] in pod_booking_number_list):
                        existingValuesPODPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind]
                        existingValuesPOD += 1

                if(df2['Booking Number'][ind] in billing_booking_number_list):
                        existingValuesBillingPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind]
                        existingValuesBilling += 1
                
                if(df2['Booking Number'][ind] in tp_booking_number_list):
                        existingValuesTPPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind]
                        existingValuesTP += 1
                
                if(df2['Booking Number'][ind] in pricing_booking_number_list):
                        existingValuesPricingPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind]
                        existingValuesPricing += 1

                # BOOKING NUMBER DUPLICATE IN CSV FILE
                
                if(df2['Booking Number'][ind] in duplicate['Booking Number'].values):
                        notUniqueValuesPerRow += 1
                        df2.at[ind,'Booking Number']=df2['Booking Number'][ind] + ' - NotUnique'
                        notUniqueValues += 1

                # DATE VALIDATION
                try:
                        dateObject = datetime.datetime.strptime(df2['Booking Date'][ind], date_format)
                        current_date_time = dateObject.strftime("%Y-%m-%d")
                        df2.at[ind,'Booking Date']=current_date_time
                except ValueError:
                        invalidDatePerRow += 1
                        df2.at[ind,'Booking Date']=df2['Booking Date'][ind] + ' - InvalidDate'
                        invalidDate +=1


                if(df2['Delivery Completion Date (PER DTR)'][ind] != ''):
                        try:
                                dateObject = datetime.datetime.strptime(df2['Delivery Completion Date (PER DTR)'][ind], date_format)
                                current_date_time = dateObject.strftime("%Y-%m-%d")
                                df2.at[ind,'Delivery Completion Date (PER DTR)']=current_date_time
                        except ValueError:
                                invalidDatePerRow += 1
                                df2.at[ind,'Delivery Completion Date (PER DTR)']=df2['Delivery Completion Date (PER DTR)'][ind] + ' - InvalidDate'
                                invalidDate +=1


                        

                # STATUS
                if(requiredValuesPerRow > 0):
                        df2.at[ind,'Upload Status']='FAILED!'
                        df2.at[ind,'Error Message']=str(requiredValuesPerRow) + ' - RequiredValue'
                if(invalidValuesPerRow > 0):
                        df2.at[ind,'Upload Status']='FAILED!'
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' ' + str(invalidValuesPerRow) + ' - InvalidValue' 
                if(invalidDatePerRow > 0):    
                        df2.at[ind,'Upload Status']='FAILED!'
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' ' + str(invalidDatePerRow) + ' - InvalidDate' 
                if(existingValuesPerRow > 0):    
                        
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' ItemExistingValue'  
                if(existingValuesPODPerRow > 0):    
                        
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' PODExistingValue'  
                if(existingValuesBillingPerRow > 0):    
                        
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' BillingExistingValue'
                if(existingValuesTPPerRow > 0):    
                        
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' TPExistingValue'
                if(existingValuesPricingPerRow > 0):    
                        
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' PricingExistingValue'
                if(notUniqueValuesPerRow > 0):    
                        df2.at[ind,'Upload Status']='FAILED!'
                        df2.at[ind,'Error Message']=df2.at[ind,'Error Message'] + ' ' + str(notUniqueValuesPerRow) + ' - NotUniqueValue'  
                 
                        
                if(requiredValuesPerRow == 0 and invalidValuesPerRow == 0 and notUniqueValuesPerRow == 0  and invalidDatePerRow == 0):
                        if(requiredValuesPerRow == 0 and invalidValuesPerRow == 0 and existingValuesPerRow == 0 and existingValuesPODPerRow == 0 and notUniqueValuesPerRow == 0  and invalidDatePerRow == 0):
                                df2.at[ind,'Upload Status']='READY!'
                                ready += 1
                                postableItem += 1
                                postablePOD += 1
                        elif(requiredValuesPerRow == 0 
                                and invalidValuesPerRow == 0 
                                and existingValuesPerRow > 0 
                                and existingValuesPODPerRow > 0 
                                and existingValuesBillingPerRow > 0 
                                and existingValuesTPPerRow > 0 
                                and existingValuesPricingPerRow > 0 
                                and notUniqueValuesPerRow == 0  
                                and invalidDatePerRow == 0):
                                        df2.at[ind,'Upload Status']='POSTED!'
                        else:
                                df2.at[ind,'Upload Status']='READY!'
                else:
                        failed += 1
        
       
        html = df2.to_html()
        data={
                'message':'success',
                'requiredValues':requiredValues,
                'invalidValues':invalidValues,
                'invalidDate':invalidDate,

                'existingValues':existingValues,
                'existingValuesPOD':existingValuesPOD,
                'existingValuesBilling':existingValuesBilling,
                'existingValuesTP':existingValuesTP,
                'existingValuesPricing':existingValuesPricing,

                'notUniqueValues':notUniqueValues,

                'postableItem':postableItem,
                'postablePOD':postablePOD,

                'ready':ready,
                'failed':failed,
                'count':count,

                'html':json.dumps(html),
        }

        return JsonResponse(data)