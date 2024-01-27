import json
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db import connections
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pyunpack import Archive
import win32com
from win32com.client import Dispatch
from . import crpi as cr
#models
from django.contrib.auth.models import User
from OUSR.models import Profile 
import requests
# Create your views here.
# GLOBAL VARIABLES
mainTableSAP = 'ORDR'
cardType = 'C'

# def index(request):
#     return HttpResponse('Hello Dawg!')



@login_required(login_url='/login')

#CRYSTAL
def extract(request):
	#with app.open_resource('./reports/SalesHistory.RPT') as f:
	
		# r = cr.connect("C:\\Users\\Joshua Arman Galvez\\Desktop\\INTELUCK\\crystal.rpt")
		# params = cr.get_params(r)
                app = Dispatch('CrystalRunTime.Application')
                return HttpResponse(app)
	
	

#TEMPLATES
def index(request):
        if request.session['user_modules'] is not None:
                user_modules = request.session['user_modules']
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                print(request.session['user_id'])
                print(request.session['CompanyDB'])
                rdr2 = json.loads(user_details.rdr2)

                cursor = connections[request.session['CompanyDB']].cursor()

                # GET NEXT DOCUMENT NUMBER    
                query = "SELECT MAX(DocNum) + 1 FROM " + mainTableSAP
                cursor.execute(query)
                nextDocNum = cursor.fetchone()[0]
                print(nextDocNum)
                print('--------------------------------------------------')
                # GET BUSINESS PARTNER LIST
                query = "SELECT TOP 1 * FROM [OCRD] WHERE CardType = %s"
                cursor.execute(query,[cardType])
                businessPartnerList = cursor.fetchall()
                print('--------------------------------------------------')
                # GET LIST OF PAYMENT TERMS
                query = "SELECT TOP 1 * FROM OCTG"
                cursor.execute(query)
                paymentTermsList = cursor.fetchall()
                print('--------------------------------------------------')

                # GET LIST OF STATES
                query = "SELECT TOP 1 * FROM OCST"
                cursor.execute(query)
                stateList = cursor.fetchall()
                print('--------------------------------------------------')

                # GET LIST OF COUNTRIES
                query = "SELECT TOP 1 * FROM OCRY"
                cursor.execute(query)
                countryList = cursor.fetchall()
                print('--------------------------------------------------')

                # GET LIST OF SHIPPING TYPE
                query = "SELECT TOP 1 * FROM OSHP"
                cursor.execute(query)
                shippingTypeList = cursor.fetchall()
                print('--------------------------------------------------')

                # GET LIST OF SALES EMPLOYEE
                query = "SELECT TOP 1 * FROM OSLP"
                cursor.execute(query)
                salesEmployeeList = cursor.fetchall()
                print('--------------------------------------------------')

                # GET LIST OF ITEMS
                query = "SELECT TOP 1 * FROM OITM WHERE SellItem = 'Y1'"
                cursor.execute(query)
                itemList = cursor.fetchall()
                print('--------------------------------------------------')

               
                cursor.close()

               
                if 'ordr' in user_modules:
                        rdr2=Profile.rdr2
                        data={
                                'rdr2':rdr2,
                                'nextDocNum':nextDocNum,
                                'businessPartnerList':businessPartnerList,
                                'paymentTermsList':paymentTermsList,
                                'stateList':stateList,
                                'countryList':countryList,
                                'shippingTypeList':shippingTypeList,
                                'salesEmployeeList':salesEmployeeList,
                                'itemList':itemList
                        }

                        return render(request,'ordr/index.html',data)
                else:
                        return HttpResponse({
                        'Module not assigned to you!'
                        })
def getUDFsHeader(request):
        print('--------------------------------------------------')
        print('START UDF DETAILS -------------------')
        print('--------------------------------------------------')
        cursor = connections[request.session['CompanyDB']].cursor()
      
        # GET HEADER UDFs DETAILS
        query = "SET NOCOUNT ON; EXEC PORTAL_USP_UDF_HEADER @Table = %s"
        cursor.execute(query,[mainTableSAP])
        keys = [x[0] for x in cursor.description]
        udfDetails = cursor.fetchall()
        result = []
        i2 = 0
        udfDetailsLength = len(udfDetails)

        for row in udfDetails:
                result.append(dict(zip(keys,row)))
                i2+=1

        if i2 == udfDetailsLength:
                udfDetailsJSON = result
        
        
        # GET HEADER UDFs DETAILS VALID VALUES
        query = "SET NOCOUNT ON; EXEC PORTAL_USP_UDF_HEADER_VALID_VALUES @TableID = %s"
        cursor.execute(query,[mainTableSAP])
        keys = [x[0] for x in cursor.description]
        udfDetailsValidValues = cursor.fetchall()
        result = []
        i2 = 0
        udfDetailsValidValuesLength = len(udfDetailsValidValues)

        

        for row in udfDetailsValidValues:
                result.append(dict(zip(keys,row)))
                i2+=1

        if i2 == udfDetailsValidValuesLength:
                udfDetailsValidValuesJSON = result
                print(udfDetailsValidValuesJSON)
        cursor.close()
        data = {
                'udfDetailsJSON':  udfDetailsJSON,
                'udfDetailsValidValuesJSON': udfDetailsValidValuesJSON
        }
        print('--------------------------------------------------')
        print('END UDF DETAILS -------------------')
        print('--------------------------------------------------')
        return render(request,'ordr/partials/ORDR-template-udf-header.html',data)
        

def getContentRows(request):
                cursor = connections[request.session['CompanyDB']].cursor()
                cursor.execute("SELECT T0.Code, T0.Name, T0.Rate "
                                "FROM [OVTG] T0 "
                                "LEFT JOIN [OADM] T1 ON T0.Code = T1.DfSVatItem "
                                "WHERE T0.Category = 'O' and Inactive = 'N' "
                                "Order By "
                                "CASE "
                                "WHEN T0.Code = T1.DfSVatItem  THEN '1' "
                                "ELSE T0.Name "
                                "END ASC ")
                taxOptions = cursor.fetchall()

                user_details = Profile.objects.get(user_id=request.session['user_id'])
                docType = request.GET.get('docType')
                rdr1 = json.loads(user_details.rdr1)
                rdr2 = json.loads(user_details.rdr2)
                contentRows = rdr1

                cursor.close()

                if docType == '0':
                        contentRows = rdr2
                else:
                        contentRows = rdr1       
                data = {
                        'docType':  docType,
                        'contentRows':  contentRows,
                        'taxOptions': taxOptions,
                        
                }
               
                return render(request,'ordr/partials/ORDR-template-contents-row-lines.html',data)

def getContentRowsAdd(request):
                cursor = connections[request.session['CompanyDB']].cursor()
                cursor.execute("SELECT T0.Code, T0.Name, T0.Rate "
                                "FROM [OVTG] T0 "
                                "LEFT JOIN [OADM] T1 ON T0.Code = T1.DfSVatItem "
                                "WHERE T0.Category = 'O' and Inactive = 'N' "
                                "Order By "
                                "CASE "
                                "WHEN T0.Code = T1.DfSVatItem  THEN '1' "
                                "ELSE T0.Name "
                                "END ASC ")
                taxOptions = cursor.fetchall()

                user_details = Profile.objects.get(user_id=request.session['user_id'])
                docType = request.GET.get('docType')
                lastRowNo = request.GET.get('lastRowNo')
                print(lastRowNo)
                rdr1 = json.loads(user_details.rdr1)
                rdr2 = json.loads(user_details.rdr2)
                contentRows = rdr1

                cursor.close()

                if docType == '0':
                        contentRows = rdr2
                else:
                        contentRows = rdr1       
                data = {
                        'docType':  docType,
                        'contentRows':  contentRows,
                        'taxOptions': taxOptions,
                        'lastRowNo': lastRowNo
                        
                }
                print(contentRows)
                print('************************************')
                return render(request,'ordr/partials/ORDR-template-contents-row-lines-add.html',data)

def getFormSettingsRows(request):
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                docType = request.GET.get('docType')
                rdr1 = json.loads(user_details.rdr1)
                rdr2 = json.loads(user_details.rdr2)
                contentRows = rdr1
                if docType == '0':
                        contentRows = rdr2
                else:
                        contentRows = rdr1       
                data = {
                        'docType':  docType,
                        'contentRows':  contentRows,
                        
                }
                print('-----------------------------------------------')
                print(contentRows)
                print(docType)
                return render(request,'ordr/modals/partials/form-settings-lines.html',data)

###############################################################################################################################################
# ----------- START DATA SECTION ----------------------------------------------
###############################################################################################################################################
# START BUSINESS PARTNER DETAILS
def getBusinessPartnerDetails(request):
                print('--------------------------------------------------')
                print('START BUSINESS PARTNER DETAILS -------------------')
                print('--------------------------------------------------')
                cardCode = request.GET.get('cardCode')
                print(cardCode)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
                # GET DETAILS OF BUSINESS PARTNER
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS @CardCode = %s"
                cursor.execute(query,[cardCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerDetails = cursor.fetchall()
                result = []
                
                for row in businessPartnerDetails:
                        result.append(dict(zip(keys,row)))
                businessPartnerDetailsJSON = json.dumps(result)
                print('--------------------------------------------------')

                # GET DETAILS OF BUSINESS PARTNER CONTACT PERSONS
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS_CONTACT_PERSON @CardCode = %s"
                cursor.execute(query,[cardCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerContactPersons = cursor.fetchall()
                result = []
                for row in businessPartnerContactPersons:
                        result.append(dict(zip(keys,row)))
                businessPartnerContactPersonsJSON = json.dumps(result)
                print(businessPartnerContactPersonsJSON)
                print('--------------------------------------------------')

                # GET DETAILS OF BUSINESS PARTNER ADDRESS SHIP TYPE
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_S @CardCode = %s"
                cursor.execute(query,[cardCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerAddressShipType = cursor.fetchall()
                result = []
                print(businessPartnerAddressShipType)
                print(len(businessPartnerAddressShipType))
                i = 0
                businessPartnerAddressShipTypeLength = len(businessPartnerAddressShipType)
                for row in businessPartnerAddressShipType:
                        result.append(dict(zip(keys,row)))
                        i+=1
                        print(i)
                if i == businessPartnerAddressShipTypeLength:
                        businessPartnerAddressShipTypeJSON = json.dumps(result)
                print('--------------------------------------------------')
               
                # GET DETAILS OF BUSINESS PARTNER ADDRESS BILL TYPE
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_B @CardCode = %s"
                cursor.execute(query,[cardCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerAddressBillType = cursor.fetchall()
                result = []
                print(businessPartnerAddressBillType)
                print(len(businessPartnerAddressShipType))
                i2 = 0
                businessPartnerAddressBillTypeLength = len(businessPartnerAddressBillType)

                for row in businessPartnerAddressBillType:
                        result.append(dict(zip(keys,row)))
                        i2+=1
                        print(i2)

                if i2 == businessPartnerAddressBillTypeLength:
                        businessPartnerAddressBillTypeJSON = json.dumps(result)
                print('--------------------------------------------------')
                cursor.close()
                data = {
                        'cardCode':cardCode,
                        'businessPartnerDetailsJSON':businessPartnerDetailsJSON,
                        'businessPartnerContactPersonsJSON':businessPartnerContactPersonsJSON,
                        'businessPartnerAddressShipTypeJSON':businessPartnerAddressShipTypeJSON,
                        'businessPartnerAddressBillTypeJSON':businessPartnerAddressBillTypeJSON,
                }               
                print('--------------------------------------------------')
                print('END BUSINESS PARTNER DETAILS ---------------------')
                print('--------------------------------------------------')
                return JsonResponse(data, content_type="application/json")

# END BUSINESS PARTNER DETAILS
# START SHIP ADDRESS DETAILS
def getBusinessPartnerDetailsAddressShipDetails(request):
                print('--------------------------------------------------')
                print('START BUSINESS PARTNER DETAILS SHIP ADDRESS DETAILS-------------------')
                print('--------------------------------------------------')
                cardCode = request.GET.get('cardCode')
                shipToCode = request.GET.get('shipToCode')
                print(cardCode)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
               
                # GET DETAILS OF BUSINESS PARTNER SHIP ADDRESS DETAILS
                query = "EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_S_DETAILS @CardCode = %s, @Address = %s"
                cursor.execute(query,[cardCode,shipToCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerAddressShipTypeDetails = cursor.fetchall()
                result = []

                i = 0
                businessPartnerAddressShipTypeDetailsLength = len(businessPartnerAddressShipTypeDetails)
                for row in businessPartnerAddressShipTypeDetails:
                        result.append(dict(zip(keys,row)))
                        i+=1
                
                if i == businessPartnerAddressShipTypeDetailsLength:
                        businessPartnerAddressShipTypeDetailsJSON = json.dumps(result)
                print(businessPartnerAddressShipTypeDetailsJSON)
                print('--------------------------------------------------')
                cursor.close()
                data = {
                        'cardCode':cardCode,
                        'businessPartnerAddressShipTypeDetailsJSON':businessPartnerAddressShipTypeDetailsJSON
                }               
                print('--------------------------------------------------')
                print('END BUSINESS PARTNER DETAILS SHIP ADDRESS DETAILS ---------------------')
                print('--------------------------------------------------')
                return JsonResponse(data, content_type="application/json")
# END SHIP ADDRESS DETAILS

# START BILL ADDRESS DETAILS
def getBusinessPartnerDetailsAddressBillDetails(request):
                print('--------------------------------------------------')
                print('START BUSINESS PARTNER DETAILS BILL ADDRESS DETAILS-------------------')
                print('--------------------------------------------------')
                cardCode = request.GET.get('cardCode')
                payToCode = request.GET.get('payToCode')
                print(cardCode)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
               
                # GET DETAILS OF BUSINESS PARTNER BILL ADDRESS DETAILS
                query = "EXEC PORTAL_USP_BUSINESS_PARTNER_DETAILS_ADDRESS_B_DETAILS @CardCode = %s, @Address = %s"
                cursor.execute(query,[cardCode,payToCode])
                keys = [x[0] for x in cursor.description]
                businessPartnerAddressBillTypeDetails = cursor.fetchall()
                result = []

                i = 0
                businessPartnerAddressBillTypeDetailsLength = len(businessPartnerAddressBillTypeDetails)
                for row in businessPartnerAddressBillTypeDetails:
                        result.append(dict(zip(keys,row)))
                        i+=1

                if i == businessPartnerAddressBillTypeDetailsLength:
                        businessPartnerAddressBillTypeDetailsJSON = json.dumps(result)
                print(businessPartnerAddressBillTypeDetailsJSON)
                print('--------------------------------------------------')
                cursor.close()
                data = {
                        'cardCode':cardCode,
                        'businessPartnerAddressBillTypeDetailsJSON':businessPartnerAddressBillTypeDetailsJSON
                }               
                print('--------------------------------------------------')
                print('END BUSINESS PARTNER DETAILS BILL ADDRESS DETAILS ---------------------')
                print('--------------------------------------------------')
                return JsonResponse(data, content_type="application/json")
# END BILL ADDRESS DETAILS


# START UDF DETAILS
def getUDFDetails(request):
                print('--------------------------------------------------')
                print('START UDF DETAILS-------------------')
                print('--------------------------------------------------')
                type = request.GET.get('type')
                table = request.GET.get('table')
                print(type,table)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
                # GET LIST OF RELATED TABLE
                if(type == 'UDT'):
                        query = ("SELECT * FROM [@"+  table + "]")
                        cursor.execute(query)
                        Details = cursor.fetchall()
                elif(type == 'UDO'):
                        query = ("SELECT * FROM [@"+  table + "]")
                        cursor.execute(query)
                        Details = cursor.fetchall()
                elif(type == 'SO'):
                        query = ("SELECT * FROM ["+  table + "]")
                        cursor.execute(query)
                        Details = cursor.fetchall()
            
                cursor.close()
                tableRows = {
                        'table':table,
                        'Details':Details
                        
                }               
                html = render_to_string('ordr/modals/Reusable-UDFModal/Modal_UDF.html', tableRows)

                data = {
                        'html' : html
                }
                print('--------------------------------------------------')
                print('END UDF DETAILS ---------------------')
                print('--------------------------------------------------')
                return JsonResponse(data , safe=False)

              


# END UDF DETAILS

                ######## END HEADER ###########

# START ITEMCODE DETAILS
def getItemDetails(request):
                print('--------------------------------------------------')
                print('START ITEM DETAILS-------------------')
                print('--------------------------------------------------')
                itemCode = request.GET.get('itemCode')
                cardCode = request.GET.get('cardCode')
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_ITEM_DETAILS @ItemCode = %s, @CardCode = %s"
                cursor.execute(query,[itemCode,cardCode])
                keys = [x[0] for x in cursor.description]
                itemDetails = cursor.fetchall()
                result = []

                i = 0
                itemDetailsLength = len(itemDetails)
                for row in itemDetails:
                        result.append(dict(zip(keys,row)))
                        i+=1

                if i == itemDetailsLength:
                        itemDetailsJSON = json.dumps(result)

                print(itemDetailsJSON)
                cursor.close()
                data = {

                        'itemDetailsJSON':itemDetailsJSON
                        
                }               
                print('--------------------------------------------------')
                print('END ITEM DETAILS-------------------')
                print('--------------------------------------------------')
                return JsonResponse(data, content_type="application/json")

# END ITEMCODE DETAILS
# START UOM DETAILS
def getUomDetails(request):
                print('--------------------------------------------------')
                print('START ITEM DETAILS UOM DETAILS-------------------')
                print('--------------------------------------------------')
                itemCode = request.GET.get('itemCode')
                print(itemCode)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
                # GET LIST OF UNIT OF MEASURE
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_ITEM_DETAILS_UOM @ItemCode = %s"
                cursor.execute(query,[itemCode])
                uomList = cursor.fetchall()
                print(uomList)
            
                cursor.close()
                tableRows = {

                        'uomList':uomList
                        
                }               
                html = render_to_string('ordr/modals/UnitOfMeasure/Modal_UnitOfMeasure.html', tableRows)

                data = {
                        'html' : html,
                }
                print('--------------------------------------------------')
                print('END ITEM DETAILS UOM DETAILS-------------------')
                print('--------------------------------------------------')
                return JsonResponse(data , safe=False)
                
# END UOM DETAILS
# START WAREHOUSE DETAILS
def getWarehouseDetails(request):
                print('--------------------------------------------------')
                print('START ITEM DETAILS WAREHOUSE DETAILS-------------------')
                print('--------------------------------------------------')
                itemCode = request.GET.get('itemCode')
                print(itemCode)
                print('--------------------------------------------------')
                cursor = connections[request.session['CompanyDB']].cursor()
                # GET LIST OF UNIT OF MEASURE
                query = "SET NOCOUNT ON; EXEC PORTAL_USP_ITEM_DETAILS_WAREHOUSE @ItemCode = %s"
                cursor.execute(query,[itemCode])
                warehouseList = cursor.fetchall()
                
                cursor.close()
                tableRows = {
                        'warehouseList':warehouseList
                        
                }    
                print(warehouseList)           
                html = render_to_string('ordr/modals/Warehouse/Modal_Warehouse.html', tableRows)

                data = {
                        
                        'html' : html,
                }
                print('--------------------------------------------------')
                print('END ITEM DETAILS WAREHOUSE DETAILS-------------------')
                print('--------------------------------------------------')
                return JsonResponse(data , safe=False)
               
# END BILL ADDRESS DETAILS
# END WAREHOUSE DETAILS
                ######## END CONTENT ROWS ###########
###############################################################################################################################################
# ----------- END DATA SECTION ----------------------------------------------
###############################################################################################################################################

#SUBMIT
@csrf_exempt
def postFormSettingsRows(request):
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                docType = request.POST.get('docType')
                contentRows = request.POST.get('jsonData')
                print('------------------------------------------------------------------------')
                print(docType)
                print(str(contentRows))
                table = ''
                if docType == '0':
                        user_details.rdr2 = str(contentRows).strip()
                       
                else:
                        user_details.rdr1 = str(contentRows).strip()
                
                user_details.save()
               
               
                

               
                data = {
                        'docType':  docType,
                        'contentRows':  contentRows,
                        
                }
                return JsonResponse(data, content_type="application/json")


@api_view(['GET'])
def getDocument(request):
        document = {'CardCode':'JohnCena'}
        return Response(document)