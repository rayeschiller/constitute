from django.db import models

# Create your models here.
class Tweet(models.Model):
	tweet_text = models.CharField(max_length=255)
	username = models.CharField(max_length=255)
	
