from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class TweetConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        # self.accept("subprotocol")
        print("connection opened")

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        self.send(text_data="Hello world!")
        print("message received")
        # Want to force-close the connection? Call:
        # self.close()
        
    def disconnect(self, close_code):
        # Called when the socket closes
        print("connection closed")
