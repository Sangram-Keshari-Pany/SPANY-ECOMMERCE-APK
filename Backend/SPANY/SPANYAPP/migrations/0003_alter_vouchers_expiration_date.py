# Generated by Django 5.0 on 2025-02-19 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SPANYAPP", "0002_vouchers"),
    ]

    operations = [
        migrations.AlterField(
            model_name="vouchers",
            name="expiration_date",
            field=models.DateField(),
        ),
    ]
