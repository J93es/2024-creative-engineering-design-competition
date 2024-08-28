import requests
import websockets
import asyncio

getUri = 'https://cedc.webserialmonitor.com/api/admin/'
headers = {'cedc-auth': 'dhkim0517@naver.com:awsome-tiger-dhkim'}
print(requests.get(getUri, headers=headers).json())


soketUri = "wss://cedc.webserialmonitor.com/api/ws-subscribe/"
async def onMessage():
    async with websockets.connect(soketUri, extra_headers=headers) as websocket:

        while True:
            msg = await websocket.recv()
            print(msg)

asyncio.get_event_loop().run_until_complete(onMessage())

