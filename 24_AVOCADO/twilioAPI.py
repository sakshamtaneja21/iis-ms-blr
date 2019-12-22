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
	account_sid = 'ur id'
	auth_token = 'ur id'
	client = Client(account_sid, auth_token)

	call = client.calls.create(
	                        url='http://demo.twilio.com/docs/voice.xml',
	                        to='ur number',
	                        from_='number from twilio'
	                    )

	print(call.sid)
	return 'Phone number called sid = ' + call.sid
if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000
