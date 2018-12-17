from django.db import models

# Create your models here.
class Tweet(models.Model):
	text = models.CharField(max_length=255)
	username = models.CharField(max_length=255)
	user_full_name = models.CharField(max_length=255, null=True)
	isRetweet = models.BooleanField()
	location = models.CharField(max_length=255)
	date = models.DateTimeField(auto_now=True)
	sentiment = models.CharField(max_length=255, null=True)
	userIcon = models.CharField(max_length=255, null=True)
	followers_count = models.IntegerField(null=True)
	tweet_id = models.CharField(max_length=255, null=True)

	def _str_(self):
		return self.text

class Politician(models.Model):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	username = models.CharField(max_length=255)

	def _str_(self):
		return self.first_name + self.last_name

class SexistWord(models.Model):
	word = models.CharField(max_length=255)

	def _str_(self):
		return self.word




	
