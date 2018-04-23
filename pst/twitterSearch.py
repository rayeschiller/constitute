from TwitterSearch import *
from .models import Tweet

def getTweets():
	try:
		tso = TwitterSearchOrder()

		tso.set_keywords(["bitch", "hillaryclinton"])
		tso.set_language("en")
		tso.set_count(10)
		tso.set_include_entities(False)

		ts = TwitterSearch(
            consumer_key = 'JPIQgfrt5gTI90PgC2DNoLf44',
            consumer_secret = 'wt1ciclku2cftRrv1WrNY3sidoSbRQ3xSP74fKO1dafT1pVHzn',
            access_token = '15718225-77FWg39DfjuZIMRv4aqfuiEd3tM9TbmBHIFenF2tQ',
            access_token_secret = 'qx9uoD5yzsUWeBgzVqIzChO7rruAvNjhomKmqua9nsfpl'
            )

		for tweet in ts.search_tweets_iterable(tso):
			tweet = Tweet(text = tweet['text'], username = tweet['user']['screen_name'], isRetweet=False, date=tweet['created_at'], location="new york")
			print("Test")
			tweet.save()
		return ts.search_tweets_iterable(tso)

	except TwitterSearchException as e:
		print(e)

if __name__ == "__main__":
    getTweets()