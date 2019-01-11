from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tweet, SexistWord, TwitterUser
from .twitterSearch import getTweets
from .tweetProcessing import processTweet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, filters
from .serializers import *
from .twitterStreaming import streamTweets
import json

# Create your views here.
def print_tweets(request):
	tweets = getTweets()
	# print(tweets)
	for tweet in tweets:
		processTweet(tweet)
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': tweets,
	}	
	return HttpResponse(template.render(context,request))

class TweetViewSet(viewsets.ModelViewSet):
	serializer_class = TweetSerializer
	queryset = Tweet.objects.order_by("-date")
	filter_backends = (DjangoFilterBackend,filters.SearchFilter,)
	filter_fields = ('twitterUser', 'date', 'location', 'sentiment')
	search_fields = ('twitterUser', 'date', 'location', 'sentiment')
	
class SexistWordViewSet(viewsets.ModelViewSet):
	serializer_class = SexistWordSerializer
	queryset = SexistWord.objects.all()

class TwitterUserViewSet(viewsets.ModelViewSet):
	serializer_class = TwitterUserSerializer
	queryset = TwitterUser.objects.all()

def streaming(request):
    return render(request, 'pst/streaming.html', {
})
