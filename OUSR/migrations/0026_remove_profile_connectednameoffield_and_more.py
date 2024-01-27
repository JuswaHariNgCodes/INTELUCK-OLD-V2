# Generated by Django 4.0.7 on 2022-10-14 02:17

import OUSR.models
import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('OUSR', '0025_remove_profile_rdr1_remove_profile_rdr2_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='connectedNameOfField',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='dataListFieldToSearch',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='dataListID',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='dataListTable',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='diapi',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='dnone',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='fieldId',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='format',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='masterdata',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='modal',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='position',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='postable',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='selectoptions',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='type',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='visible',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='width',
        ),
        migrations.AddField(
            model_name='profile',
            name='rdr1',
            field=models.TextField(null=True, verbose_name='Modules'),
        ),
        migrations.AddField(
            model_name='profile',
            name='rdr2',
            field=models.TextField(null=True, verbose_name='Modules'),
        ),
        migrations.AddField(
            model_name='profile',
            name='sapb1_employee_id',
            field=models.PositiveIntegerField(null=True, verbose_name='SAP B1 Employee ID'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_createdate',
            field=models.DateField(default=datetime.datetime(2022, 10, 14, 2, 17, 47, 391302, tzinfo=utc), null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_database',
            field=models.CharField(max_length=100, null=True, verbose_name='Database'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_email',
            field=models.CharField(max_length=100, null=True, verbose_name='Email'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_locked',
            field=models.CharField(default=0, max_length=1, verbose_name='Locked'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_modules',
            field=models.TextField(null=True, verbose_name='Modules'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_profilepic',
            field=models.ImageField(default='user-profile-pic/default.jpg', null=True, upload_to=OUSR.models.image_path),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_superuser',
            field=models.CharField(default=0, max_length=1, verbose_name='Superuser'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_updatedate',
            field=models.DateField(default=datetime.datetime(2022, 10, 14, 2, 17, 47, 391302, tzinfo=utc), null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_username',
            field=models.CharField(max_length=100, null=True, verbose_name='Username'),
        ),
        migrations.CreateModel(
            name='rdritemtype',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=100, null=True, verbose_name='position')),
                ('width', models.CharField(max_length=100, null=True, verbose_name='width')),
                ('fieldId', models.CharField(max_length=100, null=True, verbose_name='fieldId')),
                ('name', models.CharField(max_length=100, null=True, verbose_name='name')),
                ('diapi', models.CharField(max_length=100, null=True, verbose_name='diapi')),
                ('masterdata', models.CharField(max_length=100, null=True, verbose_name='masterdata')),
                ('modal', models.CharField(max_length=100, null=True, verbose_name='modal')),
                ('type', models.CharField(max_length=100, null=True, verbose_name='type')),
                ('selectoptions', models.BooleanField(null=True, verbose_name='selectoptions')),
                ('format', models.CharField(max_length=100, null=True, verbose_name='format')),
                ('dataListTable', models.CharField(max_length=100, null=True, verbose_name='dataListTable')),
                ('dataListID', models.CharField(max_length=100, null=True, verbose_name='dataListID')),
                ('dataListFieldToSearch', models.CharField(max_length=100, null=True, verbose_name='dataListFieldToSearch')),
                ('connectedNameOfField', models.CharField(max_length=100, null=True, verbose_name='connectedNameOfField')),
                ('postable', models.BooleanField(null=True, verbose_name='postable')),
                ('visible', models.BooleanField(null=True, verbose_name='visible')),
                ('dnone', models.BooleanField(null=True, verbose_name='dnone')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='OUSR.profile')),
            ],
        ),
    ]
