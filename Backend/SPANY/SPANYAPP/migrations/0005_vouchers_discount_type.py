# Generated by Django 5.0 on 2025-02-19 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "SPANYAPP",
            "0004_vouchers_offer_description_vouchers_sub_description_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="vouchers",
            name="discount_type",
            field=models.CharField(
                choices=[("percentage", "Percentage"), ("flat", "Flat")],
                default=1,
                max_length=10,
            ),
            preserve_default=False,
        ),
    ]
