# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task, task

@shared_task
def test(arg):
    print(arg)

@shared_task
def fetchTweets():
    from .twitterSearch import getTweets
    from .tweetProcessing import processTweet
    from .models import Politician
    politician_ids = Politician.objects.values_list('id', flat=True)
    for politician_id in politician_ids:
	    tweets = getTweets(politician_id)	
	    print("politician id is " + str(politician_id))
	    for tweet in tweets:
		    processTweet(politician_id, tweet)