import tweepy 
from .streamListener import StreamListener 

def streamTweets():
    consumer_key = 'JPIQgfrt5gTI90PgC2DNoLf44'
    consumer_secret = 'wt1ciclku2cftRrv1WrNY3sidoSbRQ3xSP74fKO1dafT1pVHzn'
    access_token = '15718225-77FWg39DfjuZIMRv4aqfuiEd3tM9TbmBHIFenF2tQ'
    access_token_secret = 'qx9uoD5yzsUWeBgzVqIzChO7rruAvNjhomKmqua9nsfpl'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    stream_listener = StreamListener()
    myStream = tweepy.Stream(auth = api.auth, listener=stream_listener)

    print("----test----")
    myStream.filter(track = ['hillary clinton', 'bitch'])


    return stream_listener.on_status()
if __name__ == "__main__":
    streamTweets()