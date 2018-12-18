# mysite/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from django.urls import include, path, re_path
from channels.auth import AuthMiddlewareStack
from pst.consumers import TweetConsumer


application = ProtocolTypeRouter({
    # (http->django views is added by default)
     "websocket": AuthMiddlewareStack(
        URLRouter([
             path('stream_tweets/', TweetConsumer),
        ])
    ),
})