from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Tweet, SexistWord, TwitterUser
from .twitterSearch import getTweets
from .tweetProcessing import processTweet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import TweetSerializer, SexistWordSerializer, TwitterUserSerializer
from .twitterStreaming import streamTweets
from django.utils.safestring import mark_safe
import json

# Create your views here.
def print_tweets(request):
	tweets = getTweets()
	for tweet in tweets:
		processTweet(tweet)
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': tweets,
	}	
	return HttpResponse(template.render(context,request))

class TweetViewSet(viewsets.ModelViewSet):
	serializer_class = TweetSerializer
	# queryset = Tweet.objects.all()
	queryset = Tweet.objects.order_by("-date")
	
class SexistWordViewSet(viewsets.ModelViewSet):
	serializer_class = SexistWordSerializer
	queryset = SexistWord.objects.all()

class TwitterUserViewSet(viewsets.ModelViewSet):
	serializer_class = TwitterUserSerializer
	queryset = TwitterUser.objects.all()

def streaming(request):
    return render(request, 'pst/streaming.html', {
})
