from rest_framework import serializers
from .models import Tweet, SexistWord

class TweetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Tweet
		fields = ("text", "username", "isRetweet", "location", "date")

class SexistWordSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = SexistWord
		fields = ("word",)
