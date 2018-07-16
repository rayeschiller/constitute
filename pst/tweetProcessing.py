from .twitterSearch import getTweets
from .models import Tweet
import random 
def processTweets():
    tweets = getTweets()
    try:
        for tweet in tweets:   
            tweet = Tweet(text = getText(tweet), username = tweet['user']['screen_name'], isRetweet=tweet['retweeted'], date=tweet['created_at'], location=getLocation(tweet), sentiment=getSentiment(), userIcon=getUserIcon(tweet), followers_count=getFollowers(tweet), tweet_id=getTweetId(tweet), user_full_name=getUserFullName(tweet))
            tweet.save()
            print('tweet saved')
            return tweets
    except Exception as e:
            print(e)
            print('tweet not saved')
            return tweets
if __name__ == "__main__":
    processTweets()

def getIsRetweet(tweet):
    return tweet['retweeted_status'] != None

def getTweetId(tweet):
    return tweet['id_str']

def getFollowers(tweet):
    return tweet['user']['followers_count']

def getLocation(tweet):
    location = ''
    if tweet['place'] != None:
        location = tweet['place']['full_name']
#     elif tweet.has_key('quoted_status'):
#         try:
#             location = tweet['quoted_status']['place']['full_name']
#         except: 
#             pass
#     elif tweet.has_key('retweeted_status'):
#         try:
#             location = tweet['retweeted_status']['place']['full_name']
#         except:
#             pass
           
#     try:
#         if tweet['location'] is not None:
#             print(tweet['location'])
#     except:
#         print('location empty')
    return location

            
def getUserIcon(tweet):
    return tweet['user']['profile_image_url_https']

# will be updated to get sentiment from API
def getSentiment():
    return random.randint(0, 1)


def getText(tweet):
    # if tweet.has_key('extended_tweet'):
    #     tweettext = tweet['extended_tweet']['full_text']
    #     print('extended tweet')
    # elif tweet.has_key('retweeted_status'):
    #     try:
    #         tweettext = tweet['retweeted_status']['extended_tweet']['full_text']
    #     except:
    #         tweettext = tweet['retweeted_status']['text']
    #         print('retweeted_status')
    #     else:
    #         tweettext = tweet['text']
    #         print('regular tweet')
    return tweet['text']


def getUserFullName(tweet):
    return tweet['user']['name']

