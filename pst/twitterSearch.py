from TwitterSearch import TwitterSearchOrder, TwitterSearchException, TwitterSearch
from .config import CONFIG
import logging
from .models import Politician
import os

def getTweets(politician_id, searchOnlySexistWords):
	try:

		politician = Politician.objects.get(id=politician_id)
		politician_names = [politician.first_name + " " + politician.last_name, politician.last_name, politician.username]
	
		tso = TwitterSearchOrder()			
		searchTerms = []

		if searchOnlySexistWords:
			sexistWords = CONFIG['SEXISTWORDS']
			for word in sexistWords:
				for politician_name in politician_names:
					searchTerms.append(word + ' ' + politician_name)
		elif searchOnlySexistWords is False:
			searchTerms = politician_names

		tso.set_keywords(searchTerms, or_operator=True)
		tso.set_language("en")
		tso.set_include_entities(False)
		querystr = tso.create_search_url()
		tso.set_search_url(querystr + "&tweet_mode=extended")
		ts = TwitterSearch(
            consumer_key = CONFIG['CONSUMER_KEY'],
            consumer_secret = CONFIG['CONSUMER_SECRET'],
            access_token = CONFIG['ACCESS_TOKEN'],
            access_token_secret = CONFIG['ACCESS_TOKEN_SECRET']
        )
		
		print("**Processing tweets for " + str(politician.first_name + " " + politician.last_name) + "**")
		if searchOnlySexistWords:
			tweets = ts.search_tweets_iterable(tso)
			return tweets
		else:
			# will limit to 100 if not only searching sexist words
			tweets = ts.search_tweets(tso)
			return tweets['content']['statuses']
		
	except TwitterSearchException as e:
		logging.exception("Unable to get new tweets because of"  + str(e))