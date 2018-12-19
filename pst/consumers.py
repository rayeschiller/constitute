from channels.generic.websocket import WebsocketConsumer
import json
from .twitterStreaming import streamTweets

class TweetConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        print("connection opened")
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        # self.accept("subprotocol")
        streamTweets()
        # self.send(text_data=json.dumps({
        #     'message': tweetText
        # }))
        print("Sent message")

    def receive(self, text_data=None, bytes_data=None):
        print("message received")
        print(text_data)
        # Called with either text_data or bytes_data for each frame
        # You can call:
        # self.send(text_data="Hello world!")
        # Want to force-close the connection? Call:
        # self.close()
        
    def disconnect(self, close_code):
        # Called when the socket closes
        print("connection closed")
        pass
