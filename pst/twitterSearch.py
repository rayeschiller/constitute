from TwitterSearch import *
from .config import CONFIG

def getTweets():

	try:
		tso = TwitterSearchOrder()

		politicians = CONFIG["POLITICIANS"]
		sexistWords = CONFIG["SEXISTWORDS"]
		searchTerms = []
		for word in sexistWords:
			for politician in politicians:
				searchTerms.append(word + ' ' + politician)
		tso.set_keywords(searchTerms, or_operator=True)
		tso.set_language("en")
		tso.set_include_entities(False)
		querystr = tso.create_search_url()
		tso.set_search_url(querystr + "&tweet_mode=extended")

		ts = TwitterSearch(
            consumer_key = CONFIG["CONSUMER_KEY"],
            consumer_secret = CONFIG["CONSUMER_SECRET"],
            access_token = CONFIG["ACCESS_TOKEN"],
            access_token_secret = CONFIG["ACCESS_TOKEN_SECRET"]
        )
		return ts.search_tweets_iterable(tso)

	except TwitterSearchException as e:
		print("Twitter Search Exception " + str(e))

if __name__ == "__main__":
    getTweets()