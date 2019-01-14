from rest_framework import serializers
from .models import *

class TweetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Tweet
		fields = ("pk", "text", "is_retweet", "location", "date", "sentiment", "tweet_id", "twitterUser", "politician")

class SexistWordSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = SexistWord
		fields = ("word",)

class TwitterUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = TwitterUser
		fields = ("pk", "username", "user_id", "tweet_count", "followers_count")

class PoliticianSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Politician
		fields = ("pk", "first_name", "last_name", "username", "alternativeName", "district", "office_level", "political_party", "gender")