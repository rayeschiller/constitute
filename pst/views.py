from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet
from .twitterSearch import getTweets
from rest_framework.decorators import api_view
from rest_framework.response import Response

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

@api_view(['get'])
def fetch_tweets(request):
	#fetch all tweet objects
	tweets = Tweet.objects.all()
	#serialize the tweets
	test()
	serializer = TweetSerializer(tweets, many=True)
	return Response(serializer.data)