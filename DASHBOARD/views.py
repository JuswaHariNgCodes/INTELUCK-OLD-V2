from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, permission_required

from OUSR.models import Profile
# Create your views here.


# def index(request):
#     return HttpResponse('Hello Dawg!')
@login_required(login_url='/login')
def index(request):
    return render(request,'dashboard/index.html')