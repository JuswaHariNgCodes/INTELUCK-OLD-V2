import json
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connections
from django.contrib.auth.decorators import login_required, permission_required
#models
from django.contrib.auth.models import User
from OUSR.models import Profile 
from pathlib import Path
import requests
# Create your views here.


# def index(request):
#     return HttpResponse('Hello Dawg!')
def read_sql_query(sql_path: Path) ->str:
	return Path(sql_path).read_text()


@login_required(login_url='/login')

#TEMPLATES
def index(request):
        if request.session['user_modules'] is not None:
                user_modules = request.session['user_modules']
                print(user_modules)
                cursor = connections[request.session['CompanyDB']].cursor()
               
                # print(request.session['base_dir'])
                # PCTP EMPLOYEE LIST
                query = read_sql_query('OUSR/SQL Scripts/ousr_employees.sql')
                cursor.execute(query)
                columns = [x[0] for x in cursor.description]
                values = cursor.fetchall()
                result = []
                i2 = 0
                valuesLength = len(values)

                for row in values:
                        result.append(dict(zip(columns,row)))
                        i2+=1
                if i2 == valuesLength:
                        queryResultEmployeeListJson = result


                data = {
                        'queryResultEmployeeListJson': queryResultEmployeeListJson,
                }
                print(queryResultEmployeeListJson)
                cursor.close()
                if 'ousr' in user_modules:
                        return render(request,'ousr/index.html',data)
                else:
                        return HttpResponse({
                        'Module not assigned to you!'
                        })



def getEmployeeMasterData(request):
        url = 'https://' + request.session['Server'] + ':50000/b1s/v1/EmployeesInfo'
        sessionId = request.session['SessionId']
        headers = {
                 "Cookie": "B1SESSION=" + sessionId + "; ROUTEID",
        }
        response = requests.get(url, headers=headers,verify=False)
        
        convertedDict = json.loads(response.text)
        table = ''
       
        print(convertedDict['value'][0])

        

        dataList = convertedDict['value']
        print(len(dataList))
        cursor = connections[request.session['CompanyDB']].cursor()
        # GET BUSINESS PARTNER LIST
        query = "SELECT EmpId,LastName, FirstName,MiddleName,Email,JobTitle FROM [OHEM]"
        cursor.execute(query)
        employeeList = cursor.fetchall()
        print('--------------------------------------------------')
        print(type(employeeList[0]))
        cursor.close()
        for tup in employeeList:
                list1 = list(tup)
                print(list1)
                EmployeeID = str(list1[0])
                LastName = list1[1]
                FirstName = list1[2]
                MiddleName = list1[3] if list1[3] is not None else ''
                Email = list1[4] if list1[4] is not None else ''
                JobTitle = str( list1[5] ) if list1[5] is not None else ''

                table += '<tr> <td>#</td><td class="item-1">'+  EmployeeID + '</td><td class="item-2">'+  LastName + '</td> <td class="item-3">'+  FirstName + '</td><td class="item-4">'+  MiddleName   + '</td><td class="item-5">' +  Email  + '</td><td class="item-6">' +  JobTitle  + '</td></tr>'
    
    
        return HttpResponse({
                table
        })

def getUserMasterData(request):
        users = User.objects.all()
       
        cursor = connections['default'].cursor()
        cursor.execute(
                "SELECT "
                "T0.id,"
                "T0.username,"
                "T2.email, "
                "T1.sapb1_employee_id,"
                "T2.lastName + ', ' + T2.firstName AS empname "
                "FROM [auth_user] T0 "
                "INNER JOIN [OUSR_profile] T1 ON T0.id = T1.user_id "
                "INNER JOIN [" + request.session['CompanyDB'] + "].[dbo].[OHEM] T2 ON T1.sapb1_employee_id = T2.empId "
               
                
                )
        data = cursor.fetchall()
        table = ''
        # <th>#</th>
        # <th>User ID</th>
        # <th>Username</th>
        # <th>Email</th>
        # <th>Emp ID</th>
        # <th>Emp Name</th>

        for x in data:
                print(x)
                table += '<tr>'
                table += '<td>#</td><td class="item-1">'+  str(x[0]) + '</td><td class="item-2">'+ str(x[1]) + '</td> <td class="item-3">'+  str(x[2] )+ '</td><td class="item-4">'+  str(x[3] )  + '</td><td class="item-5">' +  str(x[4])  + '</td>'
      
        table += '/tr>'
       
        return HttpResponse({
               table
        })

def getUserProfile(request):
        selectedUser = request.GET.get('selectedUser')
        cursor = connections['default'].cursor()
        cursor.execute(
                "SELECT "
                "T0.id,"
                "T0.username,"
                "T2.email,"
                "T1.sapb1_employee_id,"
                "T1.user_modules,"
                "T1.user_locked,"     
                "T1.user_superuser," 
                "T1.user_profilepic,"
                "T2.lastName + ', ' + T2.firstName AS empname "
                "FROM [auth_user] T0 "
                "INNER JOIN [OUSR_profile] T1 ON T0.id = T1.user_id "
                "INNER JOIN [" + request.session['CompanyDB'] + "].[dbo].[OHEM] T2 ON T1.sapb1_employee_id = T2.empId "
                "WHERE T0.id = " + selectedUser + " "
                
                )

        result = cursor.fetchall()
        for x in result:
                user_id = str(x[0])
                user_username = str(x[1])
                user_email = str(x[2])
                sapb1_employee_id = str(x[3])
                user_modules = str(x[4])
                user_locked = str(x[5])
                user_superuser = str(x[6])
                user_profilepic = str(x[7])
                user_empname = str(x[8])


        data = {
            'user_id':  user_id,
            'user_username': user_username,
            'user_email': user_email,
            'sapb1_employee_id': sapb1_employee_id,
            'user_modules': user_modules,
            'user_superuser': user_superuser,
            'user_locked': user_locked,
            'user_profilepic': user_profilepic,
            'user_empname': user_empname,
        }
        return JsonResponse(data, content_type="application/json")
      
#SUBMIT
def submitUser(request):
        rdr1 = '[{"position": "0", "width": "300px", "id": "ItemCode", "name": "Item Code", "diapi":"ItemCode", "masterdata": "true", "modal": "modalItemList", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "OITM", "dataListID": "ItemCode", "dataListFieldToSearch": "ItemCode", "connectedName": "ItemName", "postable": "true", "visible" : "true", "dnone": ""},   {"position": "1", "width": "400px", "id": "Dscription", "name": "Item Description", "diapi":"", "masterdata": "true", "modal": "modalItemList", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "OITM",  "dataListID": "ItemCode", "dataListFieldToSearch": "ItemName", "connectedName": "ItemName", "postable": "false", "visible" : "true", "dnone": ""},    {"position": "2", "width": "200px", "id": "Quantity", "name": "Quantity", "diapi":"Quantity", "masterdata": "false", "modal": "", "type": "input", "selectoptions": "", "format": "QtyDec", "dataListTable": "", "dataListID": "", "dataListFieldToSearch": "", "connectedName": "", "postable": "true", "visible" : "true", "dnone": ""},        {"position": "3", "width": "200px", "id": "UomCode", "name": "UoM Code", "diapi":"", "masterdata": "true", "modal": "modalUnitOfMeasureList", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "OUOM", "dataListID": "UomCode", "dataListFieldToSearch": "UomCode", "connectedName": "", "postable": "true", "visible" : "true", "dnone": ""},  {"position": "4", "width": "200px", "id": "UomEntry", "name": "UoM Entry", "diapi":"UoMEntry", "masterdata": "", "modal": "", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "", "dataListID": "", "dataListFieldToSearch": "", "connectedName": "", "postable": "true", "visible" : "true", "dnone": "dnone"},    {"position": "5", "width": "200px", "id": "WhsCode", "name": "Whse", "diapi":"WhsCode", "masterdata": "true", "modal": "modalWarehouseList", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "OWHS", "dataListID": "WhsCode", "dataListFieldToSearch": "WhsCode", "connectedName": "WhsName", "postable": "true", "visible" : "true", "dnone": ""},      {"position": "6", "width": "300px", "id": "WhsName", "name": "Whse Name", "diapi":"", "masterdata": "true", "modal": "modalWarehouseList", "type": "input", "selectoptions": "", "format": "text", "dataListTable": "OWHS", "dataListID": "WhsCode", "dataListFieldToSearch": "WhsName", "connectedName": "WhsName", "postable": "false", "visible" : "true", "dnone": ""},      {"position": "7", "width": "200px", "id": "Price", "name": "Price After Discount", "diapi":"Price", "masterdata": "false", "modal": "", "type": "input", "selectoptions": "", "format": "PriceDec", "dataListTable": "", "dataListID": "", "dataListFieldToSearch": "", "connectedName": "", "postable": "true", "visible" : "true", "dnone": ""},     {"position": "8", "width": "200px", "id": "DiscPrcnt", "name": "Discount %", "diapi":"DiscountPercent", "masterdata": "false", "modal": "", "type": "input", "selectoptions": "", "format": "PercentDec", "dataListTable": "", "dataListID": "", "dataListFieldToSearch": "", "connectedName": "", "postable": "true", "visible" : "true", "dnone": ""},   {"position": "9", "width": "200px", "id": "TaxCode", "name": "Tax Code", "diapi":"VatGroup", "masterdata": "true", "modal": "", "type": "select", "selectoptions": "get-taxcode", "format": "text", "dataListTable": "", "dataListID": "", "dataListFieldToSearch": "", "connectedName": "", "postable": "true", "visible" : "true", "dnone": ""}]'

        convertedDict = dict(request.POST.items())
        a = list(request.POST.items())  # list of key-value tuples
        c = request.POST.values()  # list of values only

        username = request.POST.get('username')
        emp_id = request.POST.get('emp_id')
        password = request.POST.get('password')
        database=request.session['CompanyDB']
        modules = convertedDict["modules"].split(',')
        useravatar = request.POST.get('useravatar')
        print(useravatar)
        superuser = 1 if request.POST.get('superuser') == 'on' else 0
        locked = 1 if request.POST.get('locked') == 'on' else 0
        file = 'user-profile-pictures/default.jpg'
        image=request.FILES.get('image_path')
        fss = FileSystemStorage()
        if image is not None:
                file = fss.save('user-profile-pictures/' + image.name, image)
                
                
        # array
        print(superuser,locked)
        print(image)
        print(password)
        print(convertedDict)
        print('----------------------------------------')
       
        submittype = request.POST.get('submitType')
        print(submittype)
        try:
                if submittype == '1' or submittype == '2':
                        print('adding')
                        user = User.objects.create_user(
                                                username=username,
                                                password=password,
                                        )
                        
                        createduser = User.objects.get(username=username)
                        createduserid = createduser.pk

                        userprofile = Profile.objects.create(
                                                user_id=createduserid,
                                                sapb1_employee_id=emp_id,
                                                user_superuser=superuser,
                                                user_locked=locked,
                                                user_database=database,
                                                user_modules=modules,
                                                user_profilepic = useravatar,
                                                rdr1 = rdr1
                                        )
                        if user.pk is not None and userprofile.pk is not None:
                                data = {
                                        'type': 'Success',
                                        'message': 'Successfully Created User: ' + username + ' !',
                                        'content': username,
                                        'submittype': submittype
                                }
                                return JsonResponse(data, content_type="application/json")  
                        elif user.pk is not None and userprofile.pk is None:   
                                data = {
                                        'type': 'Error',
                                        'message': 'Successfully Created User: ' + username + ', but Failure to create Profile',
                                        'content': username
                                }
                                return JsonResponse(data, content_type="application/json")    
                        else:
                                data = {
                                        'type': 'Error',
                                        'message': 'Failed to Create User!',
                                        'content': username
                                }
                                return JsonResponse(data, content_type="application/json")     
                                
                elif submittype == '3':
                        print('updating')
                        user = User.objects.get(username=username)
                        if password != '********':
                                user.set_password(password)
                        user.save()
                
                        createduserid = user.pk

                        userprofile = Profile.objects.get(user_id=createduserid)
                        userprofile.sapb1_employee_id = emp_id
                        userprofile.user_modules=modules
                        userprofile.user_profilepic = useravatar
                        
                        # if image is not None:
                                # file = fss.save('user-profile-pictures/' + image.name, image)
                                
                        
                        userprofile.save()

                        data = {
                                'type': 'Success',
                                'message': 'Successfully Updated User: ' + username + ' !',
                                'content': username,
                                'submittype': submittype,
                        }
                        return JsonResponse(data, content_type="application/json")     

        except Exception as e:
                print(e)
                data = {
                        'type': 'Error',
                        'message': e,
                        'content': username
                }
                return JsonResponse(data, content_type="application/json")        
        