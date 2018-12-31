from TwitterSearch import *
from .models import Tweet

def getTweets():

	try:
		tso = TwitterSearchOrder()

		tso.set_keywords(["senwarren", "bitch"])
		tso.set_language("en")
		tso.set_include_entities(False)
		querystr = tso.create_search_url()
		tso.set_search_url(querystr + "&tweet_mode=extended")

		ts = TwitterSearch(
            consumer_key = 'JPIQgfrt5gTI90PgC2DNoLf44',
            consumer_secret = 'wt1ciclku2cftRrv1WrNY3sidoSbRQ3xSP74fKO1dafT1pVHzn',
            access_token = '15718225-77FWg39DfjuZIMRv4aqfuiEd3tM9TbmBHIFenF2tQ',
            access_token_secret = 'qx9uoD5yzsUWeBgzVqIzChO7rruAvNjhomKmqua9nsfpl'
            )

		return ts.search_tweets_iterable(tso)

	except TwitterSearchException as e:
		print(e)

if __name__ == "__main__":
    getTweets()