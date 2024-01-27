from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework import generics, status, viewsets
from django.db import connections
from django.contrib.auth.decorators import login_required, permission_required
from pathlib import Path
from .models import PctpPod,PctpBilling,PctpPricing,PctpTp,Vehicletypeandcap,PctpPodWindowRowModel

from .serializer import PctpPodSerializer,PctpBillingSerializer,PctpTpSerializer,PctpPricingSerializer,PctpPodWindowModelSerializer
from .serializer import PctpWindowPODViewSerializer
from .serializer import VehicleTypeAndCapSerialzer

import json
import win32com.client
import time
from django.core.mail import send_mail
import pandas as pd
# import orjson
import requests
import datetime
# Create your views here.
date_format = "%m/%d/%Y"

@login_required(login_url='/login')

# POST PCTP
@api_view(['POST','PUT'])
def postPctpTables(request):
        start = time.time()

        ######################################################################################################################################################################
        # THIS IS OLD DI API WAY TO POST ITEMS, SUCH A RELIC.
        # otArrRowsPOD
        # otArrRowsBilling
        # speaker = win32com.client.Dispatch("SAPI.SpVoice")
        # speaker.Speak("BENI!")
        print('**************************')
        # oCompany = win32com.client.gencache.EnsureDispatch('SAPbobsCOM.Company')
        # print(oCompany)
        # oCompany.Server = request.session['Server']
        # oCompany.DbServerType = request.session['DbServerType'] # Im using MSSQL2012 so if you using other version you can search on sap documentation (MSSQL2019 is 15)
        # oCompany.CompanyDB = request.session['CompanyDB']
        # oCompany.UserName = request.session['SapB1Username']
        # oCompany.Password = request.session['password']
        # oCompany.UseTrusted = request.session['UseTrusted']

        # lRetCode = oCompany.Connect()
        # lRetCode2 = oCompany.Disconnect()
        print('**************************')
        # print(lRetCode)
        # print(lRetCode2)
        # print(oCompany.GetLastErrorDescription())
        print('**************************')
        # if lRetCode !=0:

        #     print(oCompany.GetLastErrorDescription())

        # else:

            # print("Connected to SAP")
            # oItm = oCompany.GetBusinessObject(4)
            # print(oItm)
            
            # oCompany.Disconnect()
        ######################################################################################################################################################################



        payload = json.load(request)
        item_rows = payload.get('otArrRowsItem')
        pod_rows =  payload.get('otArrRowsPOD')
        billing_rows = payload.get('otArrRowsBilling')
        tp_rows = payload.get('otArrRowsTP')
        pricing_rows = payload.get('otArrRowsPricing')

        pod_list_count = len(pod_rows)
        billing_list_count = len(billing_rows)
        tp_list_count = len(tp_rows)
        pricing_list_count = len(pricing_rows)


        pod_rows_list_dict = []  
        billing_rows_list_dict = []  
        tp_rows_list_dict = []  
        pricing_rows_list_dict = []  

        for x in pod_rows:
            pod_rows_list_dict.append(json.loads(x))
            print(pod_list_count)
            print(len(pod_rows_list_dict))
            if(pod_list_count == len(pod_rows_list_dict)):
                print(pod_rows_list_dict)
                serializerPOD = PctpPodSerializer(data=pod_rows_list_dict,many=True)
                # print(serializerPOD)
                if serializerPOD.is_valid():
                    serializerPOD.save()
                    # return Response(serializerPOD.data)    



        for x in billing_rows:
            billing_rows_list_dict.append(json.loads(x))
            if(billing_list_count == len(billing_rows_list_dict)):
                serializerBilling = PctpBillingSerializer(data=billing_rows_list_dict,many=True)
                # print(serializerBilling)
                if serializerBilling.is_valid():
                    serializerBilling.save()
                    # return Response(serializerBilling.data)



        for x in tp_rows:
            tp_rows_list_dict.append(json.loads(x))
            if(tp_list_count == len(tp_rows_list_dict)): 
                serializerTP = PctpTpSerializer(data=tp_rows_list_dict,many=True)
                # print(serializerTP)
                if serializerTP.is_valid():
                    serializerTP.save()
                    # return Response(serializerTP.data)



        for x in pricing_rows:
            pricing_rows_list_dict.append(json.loads(x))
            if(pricing_list_count == len(pricing_rows_list_dict)): 
                serializerPricing = PctpPricingSerializer(data=pricing_rows_list_dict,many=True)
                # print(serializerPricing)
                if serializerPricing.is_valid():
                    serializerPricing.save()
                    # return Response(serializerPricing.data)


        print(item_rows)
        print(type(item_rows))
        print('OH TALAGA')
        batch_header = """--batch_36522ad7-fc75-4b56-8c71-56071383e77c\n"""
        batch_footer = """--batch_36522ad7-fc75-4b56-8c71-56071383e77c--\n"""
        changeset_header= """--changeset_36522ad7-fc75-4b56-8c71-56071383e77c\n"""
        changeset_footer= """--changeset_36522ad7-fc75-4b56-8c71-56071383e77c--\n"""
        content_header = """Content-Type: application/http\nContent-Transfer-Encoding:binary\n\nPOST /b1s/v1/Items\nContent-Type: application/json\n"""
        index = 0
        data = ''
        data += batch_header
        
        for x in item_rows:
            if(index == 0):
                data += content_header
                data += '\n'
                data += x
                data += '\n'
            else:
                data += '\n'
                data += changeset_header
                data += '\n'
                data += content_header
                data += '\n'
                data += x
                data += '\n'
                data += changeset_footer
                data += '\n'

            

            index += 1
        
        


        data += batch_footer
        print(data)    

        #########################################################################################
        # GOOD OLD DI API CODE HERE FOR OITM   
        # data=json.loads(x)
        # print(index,x)
        
        # print(x)
        # print(type(x))
            # oItm.ItemCode = data['itemcode']
            # oItm.ItemName = data['itemname']
            # oItm.ItemsGroupCode = data['itemsgroupcode']
            # oItm.InventoryItem = data['inventoryitem']
            # retval = oItm.Add()

        #########################################################################################


        #SAP B1 SERVICE LAYER BATCH POST ITEM
        #http prefix
        http = 'https://'
        #Host name
        host = request.session['Server']
        #Port
        port = '50000'

        
        # fin = open("API/sample.txt", "rt")
        # #read file contents to string
        # # print(fin)
        # data = fin.read()

        # print(data)
        print('**********************')
        #Login credentials
        payload = {

            ''

        }
        headers = {
                    "Content-Type":"multipart/mixed;boundary=batch_36522ad7-fc75-4b56-8c71-56071383e77c",
                    "Cookie": "B1SESSION=" + request.session['SessionId'] + "; ROUTEID",
        }

        
        url = http + host + ":" + port + "/b1s/v1/$batch"
        requestUrl = requests.post(url, headers=headers, data=data, verify=False)
        print(requestUrl.text)



        # diAPIDisconnect = oCompany.Disconnect()  
        # print(diAPIDisconnect)
        end = time.time()
        print(end - start)
        return Response(serializerPOD.errors)  
             

# GET PCTP WINDOW

def read_sql_query(sql_path: Path) ->str:
	return Path(sql_path).read_text()

# class APIView_PCTP_Window(APIView):
#     def get(self,request):
@api_view(['GET','PUT'])
def APIView_PCTP_Window_POD(request):
    if request.method == 'GET':
        print(request.GET.get('valueToFind'))
        print('valueToFind')
        print(request.GET.get('fromBookingDate'))
        print('fromBookingDate')
        print(request.GET.get('toBookingDate'))
        print('toBookingDate')
        print(request.GET.get('fromDeliveryDate'))
        print('fromDeliveryDate')
        print(request.GET.get('toDeliveryDate'))
        print('toDeliveryDate')
        print(request.GET.get('ClientTag'))
        print('ClientTag')
        print(request.GET.get('TruckerTag'))
        print('TruckerTag')
        print(request.GET.get('DeliveryStatus'))
        print('DeliveryStatus')
        print(request.GET.get('PODStatus'))
        print('PODStatus')
        print(request.GET.get('PTFNo'))
        print('PTFNo')
        print(request.GET.get('activeTab'))
        print('activeTab')

        start = time.time()
        # GET POD DATA LATEST 200
        database = ''
        # request.session['SapB1Username']
        print('*********************')
        print(request.session.get('CompanyDB'))
        if(request.session.get('CompanyDB') is None):
            database = request.GET['database']
        else:
            database = request.session['CompanyDB']


        cursor = connections[database].cursor()

        # PCTP WINDOW ROW
        selected_u_bookingnumber = 'TEST274'
        fin = open("API/SQL Scripts/pctp_pod_window-improved.sql", "rt")
        #read file contents to string
        # print(fin)
        data = fin.read()
        
        #replace all occurrences of the required string
        parameters = "WHERE pod.U_BookingNumber IS NOT NULL"


        bookingNumber = request.GET.get('valueToFind')
        fromBookingDate = request.GET.get('fromBookingDate') 
        toBookingDate = request.GET.get('toBookingDate')
        fromDeliveryDate = request.GET.get('fromDeliveryDate') 
        toDeliveryDate = request.GET.get('toDeliveryDate')

        clientTag = request.GET.get('ClientTag')
        truckerTag = request.GET.get('TruckerTag')

        deliveryStatus = request.GET.get('DeliveryStatus')
        podStatus = request.GET.get('PODStatus')
        ptfNo = request.GET.get('PTFNo')
        activeTab = request.GET.get('activeTab')
        print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        print(clientTag)
        if(bookingNumber != 'novalue' ):
            parameters += " AND pod.U_BookingNumber = " + "'" + bookingNumber + "'"


        if(fromBookingDate != '' and toBookingDate != ''):
            parameters += " AND pod.U_BookingDate BETWEEN " + "'" + fromBookingDate + "'" + " AND " + "'" + toBookingDate + "'"

        
        if(fromDeliveryDate != '' and toDeliveryDate != ''):
            parameters += " AND pod.U_DeliveryDateDTR BETWEEN " + "'" + fromDeliveryDate + "'" + " AND " + "'" + toDeliveryDate + "'"


        if(clientTag is not None):
            parameters += " AND pod.U_SAPClient = " + "'" + clientTag + "'"


        if(truckerTag != 'novalue'):
            parameters += " AND pod.U_SAPTrucker = " + "'" + truckerTag + "'"

        
        if(deliveryStatus is not None):
            parameters += " AND pod.U_DeliveryStatus = " + "'" + deliveryStatus + "'"


        if(podStatus != 'novalue'):
            parameters += " AND pod.U_PODStatusDetail = " + "'" + podStatus + "'"


        if(ptfNo != 'novalue'):
            parameters += " AND pod.U_PTFNo = " + "'" + ptfNo + "'" + ""
        



        
        data = data.replace('-- @ParameterHere', parameters)
        print(data)
        # query = read_sql_query(data)
        cursor.execute(data)
        columns = [x[0] for x in cursor.description]
        values = cursor.fetchall()
        result = []
        i2 = 0
        valuesLength = len(values)



        for row in values:
                result.append(dict(zip(columns,row)))
                i2+=1
        if i2 == valuesLength:
                queryResultPODJson = result



        print('Cursor here')
        # print(queryResultPODJson)
        print(type(queryResultPODJson[0]))
        print(queryResultPODJson[0])
        print('--------------')
       
        # PANDA READ SQL BUT NOT DEPLOYED
        sql_query = pd.read_sql_query(data, connections[database])
       
        df2 = sql_query.to_json(orient = 'records',date_format='iso')
        df3 = json.dumps(df2)
        # print(df3) 
        # print(type(df2)) 
        df4 = json.loads(df2)
        # print(type(df4))
        
        print('Panda here')
        print(sql_query)
        print(type(sql_query))
        print('--------------')
        print('Panda SQL to JSON here')
        # print(df4)
        print(type(df4[0]))
        print(df4[0])
        # queryResultPODJson = df3
        print("NOT HERE")
        # print(queryResultPODJson) 
        cursor.close()
        print('twice ba')

       


        serializer = PctpPodWindowModelSerializer(df4, many=True)
        
        end = time.time()
        print(end - start)
        return Response(serializer.data)
    

class APIView_Vehicle_Type_And_Capacity(APIView):
    def get(self,request):
        result = Vehicletypeandcap.objects.all().order_by('-Code')
        serializer = VehicleTypeAndCapSerialzer(result, many=True)
        return Response(serializer.data)


# @api_view(['GET','POST','PUT'])
# def getPctpPodLatest200(request):
#     if request.method == 'GET':
#         # .objects.filter(since=since).order_by('-id')[:10:-1]
#         # pctp_pod = PctpPod.objects.all().order_by('-code')[:200:1]
#         pctp_pod = PctpPod.objects.raw('EXEC USP_PCTP_POD_LATEST_200')
#         print(pctp_pod)
#         # serializer = PctpWindowPODViewSerializer(pctp_pod, many=True)
#         return Response(pctp_pod)
@api_view(['GET','POST','PUT'])   
def getPctpPod(request):
    if request.method == 'GET':
        # pctp_pod = PctpPod.objects.filter(code=11556) Team.
        pctp_pod = PctpPod.objects.all()[:400]
        serializer = PctpPodSerializer(pctp_pod, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data2 = json.load(request)
        todo = data2.get('payload')
        for x in todo:
            print(json.loads(x))
            serializer = PctpPodSerializer(data=json.loads(x))
            # print(serializer)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data)
        return Response(serializer.errors)
@api_view(['GET','POST','PUT'])   
def getPctpBilling(request):
    if request.method == 'GET':
        pctp_billing = PctpBilling.objects.filter(code=230)
        serializer = PctpBillingSerializer(pctp_billing, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data2 = json.load(request)
        todo = data2.get('payload')
        for x in todo:
            print(json.loads(x))
        for x in todo:
            
            serializer = PctpBillingSerializer(data=json.loads(x))
            # print(serializer)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data)
        return Response(serializer.errors)
@api_view(['GET','POST','PUT'])   
def getPctpTp(request):
    if request.method == 'GET':
        pctp_tp = PctpTp.objects.filter(code=230)
        serializer = PctpTpSerializer(pctp_tp, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data2 = json.load(request)
        todo = data2.get('payload')
        for x in todo:
            print(json.loads(x))
        for x in todo:
            
            serializer = PctpTpSerializer(data=json.loads(x))
            # print(serializer)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data)
        return Response(serializer.errors)
@api_view(['GET','POST','PUT'])   
def getPctpPricing(request):
    if request.method == 'GET':
        pctp_pricing = PctpPricing.objects.filter(code=230)
        serializer = PctpPricingSerializer(pctp_pricing, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data2 = json.load(request)
        todo = data2.get('payload')
        for x in todo:
            
            serializer = PctpPricingSerializer(data=json.loads(x))
            # print(serializer)
            if serializer.is_valid():
                serializer.save()
                # return Response(serializer.data)
        return Response(serializer.errors)



    # List all code snippets, or create a new snippet.
   
    

 