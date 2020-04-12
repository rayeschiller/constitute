from rest_framework import serializers
from .models import *
from django.core.serializers.json import DjangoJSONEncoder


class TweetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tweet
        fields = ("pk", "text", "clean_text", "is_retweet", "location",
                  "date", "created_at", "tweet_id", "politician", "toxicity",
                  "sexually_explicit", "flirtation", "identity_attack")


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
        fields = (
        "pk", "first_name", "last_name", "username", "tweet_count", "alternativeName", "district", "office_level",
        "image_url", "political_party", "gender")
