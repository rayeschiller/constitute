import tweepy 
from pst.streamListener import StreamListener
from pst.config import CONFIG

def streamTweets():
    consumer_key = CONFIG['CONSUMER_KEY'],
    consumer_secret = CONFIG['CONSUMER_SECRET'],
    access_token = CONFIG['ACCESS_TOKEN'],
    access_token_secret = CONFIG['ACCESS_TOKEN_SECRET']

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    stream_listener = StreamListener()
    myStream = tweepy.Stream(auth = api.auth, listener=stream_listener)

    myStream.filter(track = ['hillary clinton', 'bitch'])

if __name__ == "__main__":
    streamTweets()