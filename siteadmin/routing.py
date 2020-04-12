# mysite/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from channels.auth import AuthMiddlewareStack
from pst.tweet_handling.tweet_streaming.consumers import TweetConsumer


application = ProtocolTypeRouter({
    # (http->django views is added by default)
     "websocket": AuthMiddlewareStack(
        URLRouter([
             url(r'^stream', TweetConsumer),
        ])
    ),
})