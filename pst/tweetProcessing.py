from .twitterSearch import getTweets
from .models import Tweet
import random 
def processTweets():
    tweets = getTweets()
    try:
        for tweet in tweets:   
            tweet = Tweet(text = getText(tweet), username = tweet['user']['screen_name'], isRetweet=getIsRetweet(tweet), date=tweet['created_at'], location=getLocation(tweet), sentiment=getSentiment(), userIcon=getUserIcon(tweet), followers_count=getFollowers(tweet), tweet_id=getTweetId(tweet), user_full_name=getUserFullName(tweet))
            tweet.save()
            print('tweet saved')
        return tweets
    except Exception as e:
            print(e)
            print('tweet not saved')
            return tweets

def getIsRetweet(tweet):
    return 'retweeted_status' in tweet 

def getTweetId(tweet):
    return tweet['id_str']

def getFollowers(tweet):
    return tweet['user']['followers_count'] 

def getLocation(tweet):
    location = ''
    if 'place' in tweet:
        location = tweet['place']['full_name']
        print(tweet['place']['full_name'])
    elif 'quoted_status' in tweet:
        try:
            location = tweet['quoted_status']['place']['full_name']
        except:     
            location = tweet['retweeted_status']['place']['full_name']
    return location

            
def getUserIcon(tweet):
    return tweet['user']['profile_image_url_https'] 

# will be updated to get sentiment from API
def getSentiment():
    return random.randint(0, 1)

def getText(tweet):
    if 'extended_tweet' in tweet:
        tweettext = tweet['extended_tweet']['full_text']
    elif 'retweeted_status' in tweet:
        try:
            tweettext = tweet['retweeted_status']['extended_tweet']['full_text']
        except:
            tweettext = tweet['retweeted_status']['text']
    else:
        tweettext = tweet['text']
        print('regular tweet')
    return tweettext


def getUserFullName(tweet):
    try:
        return tweet['user']['name']
    except:
        return "fail"

if __name__ == "__main__":
    processTweets()