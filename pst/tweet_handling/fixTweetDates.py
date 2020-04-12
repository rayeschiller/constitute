import tweepy
from pst.config import CONFIG
from pst.models import Tweet


def update_tweet_dates():
    consumer_key = CONFIG['CONSUMER_KEY']
    consumer_secret = CONFIG['CONSUMER_SECRET']
    access_token = CONFIG['ACCESS_TOKEN']
    access_token_secret = CONFIG['ACCESS_TOKEN_SECRET']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)

    recent_tweets = Tweet.objects.filter(created_at__isnull=True).order_by('-date')[:100]
    for r in recent_tweets:
        try:
            tweet = api.get_status(r.tweet_id)
            created_at = tweet.created_at
            r.created_at = created_at
            r.save()
        except tweepy.error.TweepError as e:
            print("Tweepy error: {}".format(e))
