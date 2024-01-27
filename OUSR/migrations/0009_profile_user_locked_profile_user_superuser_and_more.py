# Generated by Django 4.0.7 on 2022-10-09 01:23

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('OUSR', '0008_remove_profile_user_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='user_locked',
            field=models.CharField(default=1, max_length=1, verbose_name='Locked'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='user_superuser',
            field=models.CharField(default=0, max_length=1, verbose_name='Superuser'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='modules',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='modules',
            name='user_createdate',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 1, 22, 34, 658869, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='modules',
            name='user_modules',
            field=models.CharField(max_length=20, verbose_name='Modules'),
        ),
        migrations.AlterField(
            model_name='modules',
            name='user_updatedate',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 1, 22, 34, 658869, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user_createdate',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 1, 22, 34, 658869, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user_updatedate',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 1, 22, 34, 658869, tzinfo=utc), null=True),
        ),
    ]
