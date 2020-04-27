import tweepy
from pst.config import CONFIG
from pst.models import Tweet

from datetime import datetime

from django.utils import timezone
def update_tweet_dates():
    consumer_key = CONFIG['CONSUMER_KEY']
    consumer_secret = CONFIG['CONSUMER_SECRET']
    access_token = CONFIG['ACCESS_TOKEN']
    access_token_secret = CONFIG['ACCESS_TOKEN_SECRET']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)

    recent_tweets = Tweet.objects.filter(created_at__isnull=True).order_by('-date')[:200]
    for r in recent_tweets:
        try:
            tweet = api.get_status(r.tweet_id)
            timezone.now()
            dt = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S +0000 %Y')
            dt.replace(tzinfo=timezone.utc)
            r.created_at = dt
            r.save()
        except tweepy.error.TweepError as e:
            print("Tweepy error: {}".format(e))
