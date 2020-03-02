import json
import requests

from pst.models import Tweet
import re


def clean_text(tweet_text:str) -> str:
    return re.sub(r'http\S+', '', tweet_text)


def get_tweet_toxicity(tweet_text: str) -> dict:
    api_key = 'AIzaSyAda6yV-wOVJiAW07cC_Ntf4lKa69R3CmA'
    text = tweet_text
    url = ('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze' + '?key=' + api_key)
    data_dict = {
        'comment': {'text': text},
        'languages': ['en'],
        'requestedAttributes': {
            'TOXICITY': {},
            'SEVERE_TOXICITY': {},
            'IDENTITY_ATTACK': {},
            'SEXUALLY_EXPLICIT': {},
            'FLIRTATION': {}
        }
    }
    response = requests.post(url=url, data=json.dumps(data_dict))
    if response.status_code == 200:
        response_dict = json.loads(response.content)
        attributes = ['TOXICITY', 'IDENTITY_ATTACK', 'SEXUALLY_EXPLICIT', 'FLIRTATION']
        if response_dict:
            scores = [response_dict.get('attributeScores').get(a).get('summaryScore').get('value') for a in attributes]
        return dict(zip(attributes, scores))
    else:
        print("Error - Response code {}".format(response.status_code))


def update_tweet_toxicity(db_tweet: Tweet, t_scores: dict):
    if t_scores:
        db_tweet.toxicity = t_scores['TOXICITY']
        db_tweet.identity_attack = t_scores['IDENTITY_ATTACK']
        db_tweet.flirtation = t_scores['FLIRTATION']
        db_tweet.sexually_explicit = t_scores['SEXUALLY_EXPLICIT']
        db_tweet.save()


def get_and_update_toxicity(db_tweet: Tweet):
    db_tweet.clean_text = clean_text(db_tweet.text)
    db_tweet.save()
    scores = get_tweet_toxicity(db_tweet.clean_text)
    update_tweet_toxicity(db_tweet, scores)


