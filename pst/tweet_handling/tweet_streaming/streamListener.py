import tweepy
from pst.tweet_handling.tweetProcessing import processTweet

class StreamListener(tweepy.StreamListener): 
    def on_status(self, status):
        if status.retweeted:
           return
        # return status.text
        processTweet(status._json)
        # print(status.text)
        # print(status.created_at)
        
    def on_error(self, status_code):
        if status_code == 420:
            return False 
    
   