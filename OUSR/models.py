from django.db import models
from datetime import datetime
import os, random
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.html import mark_safe
from django.core.validators import MaxValueValidator
# Create your models here.

now = timezone.now()

def image_path(instance, filename):
    basefilename = file_extension = os.path.splitext(filename)
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    randomstr = ''.join((random.choice(chars))  for x in range(10))
    _now = datetime.now()

    return 'profile_pic/{year}-{month}-{imageid}-{basename}-{randomstring}{ext}'.format(imageid=instance, basename=basefilename, randomstring=randomstr, ext=file_extension, year=_now.strftime('%Y'),month=_now.strftime('%m'),day=_now.strftime('%d'))

# class User(models.Model):
#     user_firstname = models.CharField(max_length=200, verbose_name='First Name')
#     user_lastname = models.CharField(max_length=200, verbose_name='Last Name')
#     user_username = models.CharField(unique=True, max_length=200, verbose_name='User Name')
#     user_id = models.PositiveIntegerField(primary_key=True, validators=[MaxValueValidator(9999999999)])
  

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_username = models.CharField(max_length=100, verbose_name='Username',null=True)
    sapb1_employee_id = models.PositiveIntegerField(verbose_name='SAP B1 Employee ID',null=True)
    user_createdate = models.DateField(null=True, default=now)
    user_updatedate = models.DateField(null=True, default=now)
    user_email = models.CharField(max_length=100, verbose_name='Email',null=True)
    user_profilepic = models.ImageField(upload_to=image_path, default='user-profile-pic/default.jpg',null=True)
    user_superuser = models.CharField(max_length=1, verbose_name='Superuser',default=0)
    user_locked = models.CharField(max_length=1, verbose_name='Locked',default=0)
    user_database = models.CharField(max_length=100, verbose_name='Database',null=True)
    user_modules = models.TextField(verbose_name='Modules',null=True)
    rdr1 = models.TextField(verbose_name='Modules',null=True)
    rdr2 = models.TextField(verbose_name='Modules',null=True)
    
    def image_tag(self):
        return mark_safe('<img src="OUSR/Media/%s" width="50" height="50" />'%(self.user_profilepic))

    def _str_(self):
        return self.user_username

# "position": "0", 
# "width": "300px", 
# "id": "ItemCode", 
# "name": "Item Code", 
# "diapi":"ItemCode", 
# "masterdata": "true",
# "modal": "modalItemList",
# "type": "input", 
# "selectoptions": "", 
# "format": "text", 
# "dataListTable": "OITM", 
# "dataListID": "ItemCode", 
# "dataListFieldToSearch": "ItemCode", 
# "connectedName": "ItemName", 
# "postable": "true",
# "visible" : "true", 
# "dnone": ""
class rdritemtype(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    position = models.CharField(max_length=100, verbose_name='position',null=True)
    width = models.CharField(max_length=100, verbose_name='width',null=True)
    fieldId = models.CharField(max_length=100, verbose_name='fieldId',null=True)
    name = models.CharField(max_length=100, verbose_name='name',null=True)
    diapi = models.CharField(max_length=100, verbose_name='diapi',null=True)
    masterdata = models.CharField(max_length=100, verbose_name='masterdata',null=True)
    modal = models.CharField(max_length=100, verbose_name='modal',null=True)
    type = models.CharField(max_length=100, verbose_name='type',null=True)
    selectoptions = models.BooleanField(verbose_name='selectoptions',null=True)
    format = models.CharField(max_length=100, verbose_name='format',null=True)
    dataListTable = models.CharField(max_length=100, verbose_name='dataListTable',null=True)
    dataListID = models.CharField(max_length=100, verbose_name='dataListID',null=True)
    dataListFieldToSearch = models.CharField(max_length=100, verbose_name='dataListFieldToSearch',null=True)
    connectedNameOfField = models.CharField(max_length=100, verbose_name='connectedNameOfField',null=True)
    postable = models.BooleanField(verbose_name='postable',null=True)
    visible = models.BooleanField( verbose_name='visible',null=True)
    dnone = models.BooleanField(verbose_name='dnone',null=True)

    