# Generated by Django 4.0.7 on 2023-06-20 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0015_deliverystatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pctppodwindowrowmodel',
            name='DisableTableRow',
            field=models.CharField(max_length=2),
        ),
    ]
