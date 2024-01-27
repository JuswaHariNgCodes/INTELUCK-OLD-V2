# Generated by Django 4.0.7 on 2023-05-30 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0014_alter_pctppodwindowrowmodel_u_actualdaterec_intitial_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryStatus',
            fields=[
                ('Code', models.CharField(db_column='Code', max_length=50, primary_key=True, serialize=False)),
                ('Name', models.CharField(db_column='Name', max_length=100, unique=True)),
            ],
            options={
                'db_table': '@DELIVERYSTATUS',
                'managed': False,
            },
        ),
    ]
