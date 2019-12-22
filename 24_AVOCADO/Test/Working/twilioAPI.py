from flask import Flask, request #import main Flask class and request object
import requests
from twilio.rest import Client
app = Flask(__name__)
@app.route('/')
def hello_world(): 
    return '<h1>Hello World</h1>'

@app.route('/query-example')
def query_example():
    # Download the helper library from https://www.twilio.com/docs/python/install
	# Your Account Sid and Auth Token from twilio.com/console
	# DANGER! This is insecure. See http://twil.io/secure
	account_sid = 'ACd926b871f131815e479f2d86021e5860'
	auth_token = 'af756f426564ce580aa070f06cd92776'
	client = Client(account_sid, auth_token)

	call = client.calls.create(
	                        url='http://demo.twilio.com/docs/voice.xml',
	                        to='+918920032466',
	                        from_='+12029159429'
	                    )

	print(call.sid)
	return 'Phone number called sid = ' + call.sid
if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000
