# Generated by Django 2.1.4 on 2020-04-12 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pst', '0014_auto_20200301_0436'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='created_at',
            field=models.CharField(max_length=255, null=True),
        ),
    ]