from django.db import models

# Create your models here.
class Tweet(models.Model):
	text = models.CharField(max_length=255)
	username = models.CharField(max_length=255)
	isRetweet = models.BooleanField(initial=False)
	date = models.DateField()

class Politican(models.Model):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	username = mdoels.CharField(max_length=255)

class sexistWord(models.Model):
	word = models.CharField(max_length=255)
	



	
