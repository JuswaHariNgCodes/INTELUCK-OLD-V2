# Generated by Django 4.0.7 on 2023-05-30 14:50

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('OUSR', '0042_alter_profile_user_createdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_createdate',
            field=models.DateField(default=datetime.datetime(2023, 5, 30, 14, 50, 23, 452910, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user_updatedate',
            field=models.DateField(default=datetime.datetime(2023, 5, 30, 14, 50, 23, 452910, tzinfo=utc), null=True),
        ),
    ]
