from .models import Politician
from .twitterSearch import getTweets
from .tweetProcessing import processTweet

def fetchTweets(politician_ids, searchOnlySexistWords):
    for politician_id in politician_ids:
        tweets = getTweets(politician_id, searchOnlySexistWords)
        counter = 0
        for tweet in tweets:
            processTweet(politician_id, tweet)
            counter += 1
        print("Processed " + str(counter) + " tweets")