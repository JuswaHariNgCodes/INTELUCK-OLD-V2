# Generated by Django 4.0.7 on 2023-05-09 09:44

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('OUSR', '0027_alter_profile_user_createdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_createdate',
            field=models.DateField(default=datetime.datetime(2023, 5, 9, 9, 44, 7, 169369, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user_updatedate',
            field=models.DateField(default=datetime.datetime(2023, 5, 9, 9, 44, 7, 169369, tzinfo=utc), null=True),
        ),
    ]
