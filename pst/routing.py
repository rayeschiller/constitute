# mysite/routing.py
from channels.routing import ProtocolTypeRouter
from . import consumers

application = ProtocolTypeRouter({
    # (http->django views is added by default)
})

# channel_routing = [
#     route('websocket.connect', consumers.ws_connect),
#     route('websocket.receive', consumers.ws_receive),
#     route('websocket.disconnect', consumers.ws_disconnect)
# ]