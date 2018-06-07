from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet, SexistWord
from .twitterSearch import getTweets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TweetSerializer, SexistWordSerializer

# Create your views here.
def getTweets(request):
	tweets = getTweets()
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': tweets,
	}	
	print("here")
	try:
		for tweet in tweets:
			tweet = Tweet(text = tweet['text'], username = tweet['user']['screen_name'], isRetweet=False, date=tweet['created_at'], location="new york")
			tweet.save()
	except:
		pass
	return HttpResponse(template.render(context,request))

@api_view(['GET'])
def fetch_tweets(request):
	#fetch all tweet objects
	tweets = Tweet.objects.all()
	#serialize the tweets
	serializer = TweetSerializer(tweets, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def fetch_sexist_words(request):
	words = SexistWord.objects.all()
	serializer = SexistWordSerializer(words, many=True)
	return Response(serializer.data)