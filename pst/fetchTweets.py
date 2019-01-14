from .models import Politician
from .twitterSearch import getTweets
from .tweetProcessing import processTweet

def fetchTweets(politician_ids, searchOnlySexistWords):
    for politician_id in politician_ids:
        tweets = getTweets(politician_id, searchOnlySexistWords)
        newCounter = 0
        alreadyExistsCounter = 0
        for tweet in tweets:
            isTweetNew = processTweet(politician_id, tweet)
            if isTweetNew:
                newCounter += 1 
            else:
                alreadyExistsCounter += 1
        print("Processed " + str(alreadyExistsCounter) + " already existing tweets")
        print("Processed " + str(newCounter) + " new tweets")