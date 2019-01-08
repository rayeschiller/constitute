from .twitterSearch import getTweets
from .models import Tweet, TwitterUser
from textblob import TextBlob 
import re 

def processTweet(tweet):
    userId = getUserId(tweet)
    tweetId = getTweetId(tweet)

    if userExists(userId) and not tweetExists(tweetId):
        incrementTweetCountForUser(userId)
        saveNewTweet(tweet)
    elif not userExists(tweet):
        saveNewUser(tweet)
        saveNewTweet(tweet)


def saveNewUser(tweet):
    try:
        user = TwitterUser(user_id = tweet['user']['id'], username=getUsername(tweet), tweet_count = 1, user_full_name = getUserFullName(tweet), user_icon = getUserIcon(tweet), followers_count = getFollowers(tweet))
        user.save()
        print('User Saved with ID ' + str(user.user_id))
    except Exception as e:
        print(e)
        print('User not saved')

def incrementTweetCountForUser(userId):
    twitterUser = TwitterUser.objects.get(user_id = userId)
    twitterUser.tweet_count += 1
    twitterUser.save()
    print("Twitter user has been incremented to " + str(twitterUser.tweet_count))

def saveNewTweet(tweet):
    try: 
        twitterUser = TwitterUser.objects.get(user_id = getUserId(tweet))
        tweet = Tweet(text = getText(tweet), twitterUser = twitterUser, is_retweet=getIsRetweet(tweet), 
        date=getDate(tweet), location=getLocation(tweet), sentiment=getSentiment(tweet), tweet_id=getTweetId(tweet))
        tweet.save()
        print('tweet saved')
    except Exception as e:
        print(e)
        print('tweet not saved')
  
def userExists(userId):
    userCount = TwitterUser.objects.filter(user_id=userId).count()
    return False if userCount == 0 else True
   
def tweetExists(tweetId):
    tweetCount = Tweet.objects.filter(tweet_id = tweetId).count()
    return False if tweetCount == 0 else True

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
    tweettext = ""
    if 'retweeted_status' in tweet:
        tweettext = tweet['retweeted_status']['full_text']
    elif 'full_text' in tweet:
        tweettext = tweet['full_text']
    else:
        print('text is cannot be found')
    print("Tweet text saved is " + tweettext)
    return tweettext


def getUserFullName(tweet):
    try:
        return tweet['user']['name']
    except:
        return "fail"

if __name__ == "__main__":
   processTweet()