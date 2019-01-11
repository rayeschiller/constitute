from django.db import models
from django.db.models import Count
# Create your models here.
class Tweet(models.Model):
	text = models.TextField()
	twitterUser = models.ForeignKey(
		'TwitterUser',
		on_delete=models.CASCADE,
		related_name='twitterUser',
		default=0
	)
	# associatedPolitician = models.ForeignKey(
	# 	'Politician',
	# 	on_delete=models.CASCADE, 
	# 	related_name='politician',
	# 	default="",
	# 	null=True
	# )
	is_retweet = models.BooleanField()
	location = models.CharField(max_length=255)
	date = models.DateTimeField(auto_now=True)
	sentiment = models.CharField(max_length=255, null=True)
	tweet_id = models.CharField(max_length=255, null=True, unique=True)

	def _str_(self):
		return self.text

class Politician(models.Model):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	username = models.CharField(max_length=255)

	def __str__(self):
		return self.first_name + self.last_name

class SexistWord(models.Model):
	word = models.CharField(max_length=255)

	def __str__(self):
		return self.word

class TwitterUser(models.Model):
	user_id = models.CharField(max_length=255, unique=True)
	username = models.CharField(max_length=255)
	tweet_count = models.IntegerField(default=0)
	user_full_name = models.CharField(max_length=255, null=True)
	user_icon = models.CharField(max_length=255, null=True)
	followers_count = models.IntegerField(null=True)
	# tweetCount = Tweet.objects.annotate(num_tweets = Count('twitterUser'))

	def __str__(self):
		return self.user_id + self.username 
	
