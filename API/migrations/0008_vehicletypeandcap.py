# Generated by Django 4.0.7 on 2023-05-19 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0007_alter_pctppricing_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicletypeandcap',
            fields=[
                ('code', models.CharField(db_column='Code', max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=100, unique=True)),
            ],
            options={
                'db_table': '@VEHICLETYPEANDCAP',
                'managed': False,
            },
        ),
    ]
