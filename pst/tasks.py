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
    tweets = getTweets()
    for tweet in tweets:
        processTweet(tweet)
    # print(tweets[0])
    print("tweet processed")