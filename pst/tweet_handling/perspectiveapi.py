import json
import requests

api_key = 'AIzaSyCzcFM0rN3smd9wYqda6k73NT_QU7XtJ3Y'
url = ('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze' +'?key=' + api_key)
text = "Live in Maine? WhatEVER u do in Nov, vote THUG ASS BITCH @SenatorCollins OUT! https://t.co/sumWM91FSe"
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
response_dict = json.loads(response.content)
print(json.dumps(response_dict, indent=2))

# def get_toxicity_for_tweet()