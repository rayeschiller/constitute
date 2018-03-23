from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet
from .twitterSearch import getTweets

# Create your views here.
def index(request):
	tweets = getTweets()
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': tweets,
	}	
	for tweet in tweets:
		tweet = Tweet(text = tweet['text'], username = tweet['user']['screen_name'], isRetweet=False, date=tweet['created_at'], location="new york")
		tweet.save()
	return HttpResponse(template.render(context,request))

