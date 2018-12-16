from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet, SexistWord
from .twitterSearch import getTweets
from .tweetProcessing import processTweet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TweetSerializer, SexistWordSerializer
from .twitterStreaming import streamTweets

# Create your views here.
def printTweets(request):
	tweets = getTweets()
	for tweet in tweets:
		processTweet(tweet)
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': tweets,
	}	
	return HttpResponse(template.render(context,request))

@api_view(['GET'])
def fetch_tweets(request):
	#fetch all tweet objects in desc order
	tweets = Tweet.objects.order_by("-date")
	#serialize the tweets
	serializer = TweetSerializer(tweets, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def fetch_sexist_words(request):
	words = SexistWord.objects.all()
	serializer = SexistWordSerializer(words, many=True)
	return Response(serializer.data)

def twitterStream(request):
	streamTweets()

