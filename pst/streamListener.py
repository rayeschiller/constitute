import tweepy
from .tweetProcessing import processTweet

class StreamListener(tweepy.StreamListener): 
    def on_status(self, status):
        processTweet(status)
        print(status.text)
        print(status.created_at)

    def on_error(self, status_code):
        if status_code == 420:
            return False 
        