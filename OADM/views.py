import json
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connections
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, permission_required
#models
from django.contrib.auth.models import User
from OUSR.models import Profile 

import requests
# Create your views here.


# def index(request):
#     return HttpResponse('Hello Dawg!')

@login_required(login_url='/login')
#TEMPLATES
def index(request):
        if request.session['user_modules'] is not None:
                user_modules = request.session['user_modules']
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                print(request.session['user_id'])
                print(request.session['CompanyDB'])
                rdr2 = json.loads(user_details.rdr2)
                
                if 'oadm' in user_modules:
                        rdr2=Profile.rdr2
                        data={
                               'rdr2': rdr2
                        }
                      



                        return render(request,'oadm/index.html',data)
                else:
                        return HttpResponse({
                        'Module not assigned to you!'
                        })


def getAdminContentRows(request):
                module = request.GET.get('module')
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                docType = request.GET.get('docType')
                data = ''

                # Array of JSON Objects
                products = [{"name": "HDD", "brand": "Samsung", "price": "$100"},
                        {"name": "Monitor", "brand": "Dell", "price": "$120"},
                        {"name": "Mouse", "brand": "Logitech", "price": "$10"}]

                # Print the original data
                print(type(products))
                print("The original JSON data:\n{0}".format(products))
                # Sort the JSON data based on the value of the brand key
                

                # Print the sorted JSON data
                print("The sorted JSON data based on the value of the brand:\n{0}".format(products))


                # match module:

                #         case "moduleTabORDR":
                #                 print("Sales Order Form Settings loaded")
                #                 rdr1 = json.loads(user_details.rdr1)
                #                 rdr2 = json.loads(user_details.rdr2)
                                
                #                 contentRows = rdr1.sort(key=lambda x: float(x["position"]))
                #                 if docType == '0':
                #                         rdr2.sort(key=lambda x: float(x["position"]))
                #                         contentRows = rdr2
                #                 else:
                #                         rdr1.sort(key=lambda x: float(x["position"]))
                #                         contentRows = rdr1     

                                        
                #                 data = {
                #                         'docType':  docType,
                #                         'contentRows':  contentRows
                                        
                #                 }
               
                return render(request,'oadm/partials/OADM-template-contents-row-lines.html',data)

def getAdminContentRowAdd(request):
                lastRowNo = request.GET.get('lastRowNo')
                data = {
                        'lastRowNo': lastRowNo
                        
                }
                return render(request,'oadm/partials/OADM-template-contents-row-lines-add.html',data)


# SUBMIT
@csrf_exempt
def postContentRows(request):
                user_details = Profile.objects.get(user_id=request.session['user_id'])
                activeTab = request.POST.get('activeTab')
                activeSubTab = request.POST.get('activeSubTab')
                docType = request.POST.get('docType')
                contentRows = request.POST.get('contentRows')

                print('------------------------------------------------------------------------')
                print(activeTab)
                print(activeSubTab)
                print(docType)
                print(contentRows)
                print('------------------------------------------------------------------------')
                if activeTab == 'salesTab':
                        if activeSubTab == 'ordr':
                                if docType == '0':
                                        user_details.rdr2 = contentRows
                                
                                else:
                                        user_details.rdr1 = contentRows
                                
                                user_details.save()
               
               
                

               
                data = {
                        'docType':  docType,
                        'contentRows':  contentRows,
                        
                }
                return JsonResponse(data, content_type="application/json")