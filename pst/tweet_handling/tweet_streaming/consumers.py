from channels.generic.websocket import WebsocketConsumer
import json


class TweetConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        print("connection opened")
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # tweet = streamTweets()
        print(self)
        self.send(text_data=json.dumps({
            'message': "tweet"
        }))
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
