# Generated by Django 5.0 on 2025-03-15 17:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SPANYAPP", "0014_order_shipping_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[
                    ("Pending", "Pending"),
                    ("Confirmed", "Confirmed"),
                    ("Shipped", "Shipped"),
                    ("In Transit", "In Transit"),
                    ("Out for Delivery", "Out for Delivery"),
                    ("Delivered", "Delivered"),
                    ("Cancelled", "Cancelled"),
                ],
                default="Pending",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="review",
            name="rating",
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.CreateModel(
            name="ShippingUpdate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("Confirmed", "Confirmed"),
                            ("Shipped", "Shipped"),
                            ("In Transit", "In Transit"),
                            ("Out for Delivery", "Out for Delivery"),
                            ("Delivered", "Delivered"),
                            ("Cancelled", "Cancelled"),
                        ],
                        max_length=20,
                    ),
                ),
                ("location", models.CharField(blank=True, max_length=255, null=True)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="shipping_updates",
                        to="SPANYAPP.order",
                    ),
                ),
            ],
        ),
    ]
