from .twitterSearch import getTweets
from .models import Tweet, TwitterUser
from textblob import TextBlob 
import re 

def processTweet(tweet):
    userCount = TwitterUser.objects.filter(user_id = getUserId(tweet)).count()
    if userCount == 0: 
        try:
            user = TwitterUser(user_id = tweet['user']['id'], username=getUsername(tweet), tweet_count = 1, user_full_name = getUserFullName(tweet), user_icon = getUserIcon(tweet), followers_count = getFollowers(tweet))
            user.save()
            print('user saved!!')
        except Exception as e:
            print(e)
            print('User not saved')
    
    try: 
        twitterUser = TwitterUser.objects.get(user_id = getUserId(tweet))
        tweet = Tweet(text = getText(tweet), twitterUser = twitterUser, is_retweet=getIsRetweet(tweet), 
        date=getDate(tweet), location=getLocation(tweet), sentiment=getSentiment(tweet), tweet_id=getTweetId(tweet))
        tweet.save()
        print('tweet saved')
    except Exception as e:
        print(e)
        print('tweet not saved')
    #  elif userCount > 0:
    #     twitterUser = TwitterUser.objects.get(user_id = getUserId(tweet))
    #     print(twitterUser.tweet_count)
    #     twitterUser.tweet_count += 1
    #     twitterUser.save()


def getUserId(tweet):
    return tweet['user']['id']

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
    analysis = TextBlob(clean_tweet(tweet['full_text']))
    return analysis.sentiment.polarity


def getText(tweet):
    if 'full_text' in tweet:
        print(tweet['full_text'])
        tweettext = tweet['full_text']
    # elif 'retweeted_status' in tweet:
    #     try:
    #         tweettext = tweet['retweeted_status']['extended_tweet']['full_text']
    #     except:
    #         tweettext = tweet['retweeted_status']['text']
    else:
        tweettext = "test"
        print('regular tweet')
    return tweettext


def getUserFullName(tweet):
    try:
        return tweet['user']['name']
    except:
        return "fail"

if __name__ == "__main__":
   processTweet()