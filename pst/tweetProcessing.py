from .models import Tweet, TwitterUser, Politician
from textblob import TextBlob 
from textblob.sentiments import NaiveBayesAnalyzer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from django.db.models import Count
import re 
import logging
import time

def processTweet(politician_id, tweet):
    userId = getUserId(tweet)
    tweetId = getTweetId(tweet) 
    if userExists(userId) and tweetExists(tweetId) is False:
        saveNewTweet(tweet, politician_id)
        incrementTweetCountForUser(userId)
    elif userExists(userId) is False and tweetExists(tweetId) is False:
        saveNewUser(tweet)
        saveNewTweet(tweet, politician_id)
    else:
        print("Tweet " + str(tweetId) + " and User " + str(userId) + " already exists")


def saveNewUser(tweet):
    try:
        user = TwitterUser(user_id = getUserId(tweet), username=getUsername(tweet), 
        tweet_count = 1, user_full_name = getUserFullName(tweet), user_icon = getUserIcon(tweet), 
        followers_count = getFollowers(tweet))
        user.save()
        print('New user Saved with ID ' + str(user.user_id))
    except Exception as e:
        print('User not saved with error ' + str(e))

def incrementTweetCountForUser(userId):
    try:
        twitterUser = TwitterUser.objects.get(user_id = userId)
        count = Tweet.objects.filter(twitterUser = twitterUser).count()
        twitterUser.tweet_count = count
        twitterUser.save()
        print("Twitter count for user id " + str(userId) + " is incremented to " + str(count))
    except Exception as e:
        print("User " + str(userId) + "count not incremented with error " + str(e))

def saveNewTweet(tweet, politician_id):
    try: 
        twitterUser = TwitterUser.objects.get(user_id = getUserId(tweet))
        politician = Politician.objects.get(id=politician_id)
        tweetToSave = Tweet(text = getText(tweet), twitterUser = twitterUser, is_retweet=getIsRetweet(tweet), 
        date=getDate(tweet), location=getLocation(tweet), sentiment=getSentiment(tweet), tweet_id=getTweetId(tweet), 
        politician=politician)
        tweetToSave.save()
        print("Tweet " + str(tweetToSave.tweet_id) + " successfully saved")
    except Exception as e:
        print('Tweet ' + str(tweetToSave.tweet_id) + ' not saved with error ' + str(e))
  
def userExists(userId):
    userCount = TwitterUser.objects.filter(user_id=userId).count()
    return False if userCount == 0 else True
   
def tweetExists(tweetId):
    tweetCount = Tweet.objects.filter(tweet_id = tweetId).count()
    return False if tweetCount == 0 else True

def getUserId(tweet):
    return tweet['user']['id']

def getDate(tweet):
    convertedDate = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
    return convertedDate

def getUsername(tweet):
    return tweet['user']['screen_name']

def getIsRetweet(tweet):
    return 'retweeted_status' in tweet 

def getTweetId(tweet):
    return tweet['id']

def getFollowers(tweet):
    return tweet['user']['followers_count'] 

def getLocation(tweet):
    location = ''
    if tweet['place'] is not None:
        location = tweet['place']['full_name']
    return location
            
def getUserIcon(tweet):
    return tweet['user']['profile_image_url_https'] 

def clean_tweet(tweet, isVaderTweet):
    '''
    Utility function to clean the text in a tweet by removing links and special characters using regex.
    '''
    if not isVaderTweet:
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
    if isVaderTweet:
        return ' '.join(re.sub("(@)", " ", tweet).split())

def getSentiment(tweet):
    analyser = SentimentIntensityAnalyzer()
    vaderAnalysis = analyser.polarity_scores(clean_tweet(getText(tweet), isVaderTweet=True))
    print(vaderAnalysis['compound'])
    return vaderAnalysis['compound']

def getSentimentSubjectivity(tweet): 
    analysis = TextBlob(clean_tweet(getText(tweet), isVaderTweet=False))
    return analysis.subjectivity 

def getText(tweet):
    tweettext = ""
    if 'retweeted_status' in tweet:
        tweettext = tweet['retweeted_status']['full_text']
    elif 'full_text' in tweet:
        tweettext = tweet['full_text']
    else:
        print('Tweet text cannot be found')
    # print("Tweet text saved is " + tweettext)
    return tweettext


def getUserFullName(tweet):
    try:
        return tweet['user']['name']
    except:
        return "Username Error"

