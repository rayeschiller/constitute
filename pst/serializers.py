from rest_framework import serializers
from .models import Tweet, SexistWord, TwitterUser

class TweetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Tweet
		fields = ("pk", "text", "username", "is_retweet", "location", "date", "sentiment", "tweet_id")

class SexistWordSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = SexistWord
		fields = ("word",)

class TwitterUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = TwitterUser
		fields = ("pk", "username", "tweet_count")