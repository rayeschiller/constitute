# Generated by Django 2.1.4 on 2019-01-12 19:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pst', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='politician',
            name='city',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='politician',
            name='state',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tweet',
            name='politician',
            field=models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='politician', to='pst.Politician'),
        ),
    ]
