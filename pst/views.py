from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet, SexistWord
from .twitterSearch import getTweets
from .tweetProcessing import processTweets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TweetSerializer, SexistWordSerializer

# Create your views here.
def printTweets(request):

	tweets = processTweets()

	try:
		for tweet in tweets:
-			tweet = Tweet(text = tweet['text'], username = tweet['user']['screen_name'], isRetweet=False, date=tweet['created_at'], location="new york")	+			tweet = Tweet(text = tweet['text'], username = tweet['user']['screen_name'], isRetweet=tweet['retweeted'], date=tweet['created_at'], location=tweet['coordinates'])
	except:
		pass

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