# Generated by Django 3.0.5 on 2020-12-28 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0004_auto_20201228_1218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='content',
            field=models.FileField(upload_to=''),
        ),
    ]
