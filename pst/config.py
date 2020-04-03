import os
CONFIG = {
    "CONSUMER_KEY": os.environ.get('CONSUMER_KEY'),
    "CONSUMER_SECRET": os.environ.get('CONSUMER_SECRET'),
    "ACCESS_TOKEN": os.environ.get('ACCESS_TOKEN'),
    "ACCESS_TOKEN_SECRET": os.environ.get('ACCESS_TOKEN_SECRET'),
    "SEXISTWORDS": ['whore', 'skank', 'rape', 'bitch', 'slut'],
}