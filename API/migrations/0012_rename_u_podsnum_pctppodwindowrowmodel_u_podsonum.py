# Generated by Django 4.0.7 on 2023-05-24 14:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0011_rename_disabletablerow_pctppodwindowrowmodel_disabledtablerow_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pctppodwindowrowmodel',
            old_name='U_PODSNum',
            new_name='U_PODSONum',
        ),
    ]
