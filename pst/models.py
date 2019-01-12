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
	politician = models.ForeignKey(
		'Politician',
		on_delete=models.CASCADE, 
		related_name='politician',
		default="",
		null=True
	)
	is_retweet = models.BooleanField()
	location = models.CharField(max_length=255)
	date = models.DateTimeField(auto_now=True)
	sentiment = models.CharField(max_length=255, null=True)
	tweet_id = models.CharField(max_length=255, null=True, unique=True)

	def _str_(self):
		return self.text

class Politician(models.Model):
	FEDERAL = 'Federal'
	STATE = 'State'
	LOCAL = 'Local'
	OFFICE_LEVEL_CHOICES = (
		(FEDERAL, 'Federal'),
		(STATE, 'State'),
		(LOCAL, 'Local'),
	)
	DEMOCRAT = 'Democrat'
	REPUBLICAN = 'Republican'
	POLITICAL_PARTY_CHOICES = (
		(DEMOCRAT, 'Democrat'),
		(REPUBLICAN, 'Republican')
	)
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	username = models.CharField(max_length=255, unique=True)
	alternativeName = models.CharField(max_length=255, null=True)
	district = models.CharField(max_length=255, null=True)
	office_level = models.CharField(max_length=255, choices=OFFICE_LEVEL_CHOICES, null=True)
	political_party = models.CharField(max_length=255, choices=POLITICAL_PARTY_CHOICES, null=True)
	city = models.CharField(max_length=255, null=True)
	state = models.CharField(max_length=255, null=True)

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

	def __str__(self):
		return self.user_id + self.username 
