from .twitterSearch import getTweets
from .models import Tweet
from textblob import TextBlob 
import re 

def processTweet(tweet):
    try: 
        tweet = Tweet(text = getText(tweet), username = getUsername(tweet), isRetweet=getIsRetweet(tweet), 
        date=getDate(tweet), location=getLocation(tweet), sentiment=getSentiment(tweet), 
        userIcon=getUserIcon(tweet), followers_count=getFollowers(tweet), tweet_id=getTweetId(tweet), 
        user_full_name=getUserFullName(tweet))
        tweet.save()
        print('tweet saved')
        return tweet
    except Exception as e:
        print(e)
        print('tweet not saved')
        return tweet

def getDate(tweet):
    return tweet['created_at']

def getUsername(tweet):
    return tweet['user']['screen_name']

def getIsRetweet(tweet):
    return 'retweeted_status' in tweet 

def getTweetId(tweet):
    return tweet['id_str']

def getFollowers(tweet):
    return tweet['user']['followers_count'] 

def getLocation(tweet):
    location = ''
    if tweet['place'] is not None:
        location = tweet['place']['full_name']
        print(tweet['place']['full_name'])
    # elif tweet['quoted_status']['place']['full_name'] is not None:
    #     location = tweet['quoted_status']['place']['full_name']
    # elif tweet['retweeted_status']['place']['full_name'] is not None:
    #     location = tweet['retweeted_status']['place']['full_name']
    # else:
    #     location = ''
    return location

            
def getUserIcon(tweet):
    return tweet['user']['profile_image_url_https'] 

def clean_tweet(tweet):
    '''
    Utility function to clean the text in a tweet by removing 
    links and special characters using regex.
    '''
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())


def getSentiment(tweet):
    analysis = TextBlob(clean_tweet(tweet['text']))
    return analysis.sentiment.polarity


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
   processTweet()