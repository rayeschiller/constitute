from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .twitterSearch import getTweets
from .tweetProcessing import processTweet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, filters
from .serializers import *
from .twitterStreaming import streamTweets
import json
from django.db.models import Count
import csv

# Create your views here.
def print_tweets(request):
	politician_ids = Politician.objects.values_list('id', flat=True)

	mock_tweets = getTweets(politician_ids[0])
	# politician_id = politician_ids[1]
	for politician_id in politician_ids:
		tweets = getTweets(politician_id)
		for tweet in tweets:
			processTweet(politician_id, tweet)
	template = loader.get_template('pst/index.html')
	context = {
		'tweets': mock_tweets,
	}	
	return HttpResponse(template.render(context,request))

def load_politicians(request):
	data = csv.DictReader(open("./resources/politicians.csv"))
	for row in data:
		try: 
			Politician.objects.create(first_name=row['FirstName'], 
			last_name=row['LastName'], 
			username=row['Username'],
			alternativeName = row['AlternativeName'],
			district = row['District'],
			office_level = row['OfficeLevel'],
			political_party = row['PoliticalParty'],
			city = row['City'],
			state = row['State'])
			print('Politicians successfully saved')
		except Exception as e:
			print("Politician did not save " + str(e)) 
	return HttpResponse("hello")

class TweetViewSet(viewsets.ModelViewSet):
	serializer_class = TweetSerializer
	queryset = Tweet.objects.order_by("-date")
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('twitterUser', 'politician', 'date', 'location', 'sentiment')
	# search_fields = ('twitterUser', 'date', 'location', 'sentiment')
	
class SexistWordViewSet(viewsets.ModelViewSet):
	serializer_class = SexistWordSerializer
	queryset = SexistWord.objects.all()

class PoliticianViewSet(viewsets.ModelViewSet):
	serializer_class = PoliticianSerializer
	queryset = Politician.objects.all()

class TwitterUserViewSet(viewsets.ModelViewSet):
	serializer_class = TwitterUserSerializer
	queryset = TwitterUser.objects.all()
	filter_backends = (DjangoFilterBackend,)
	filter_fields = ('tweet_count', 'username', 'user_id', 'followers_count')

def streaming(request):
    return render(request, 'pst/streaming.html', {
})
