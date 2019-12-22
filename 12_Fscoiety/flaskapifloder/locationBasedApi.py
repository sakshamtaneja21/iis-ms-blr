# https://help.parsehub.com/hc/en-us/articles/217751808-API-Tutorial-How-to-get-run-data-using-Python-Flask
# https://www.geeksforgeeks.org/get-post-requests-using-python/
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from requests import get
import json
app=Flask(__name__)

api=Api(app)

def policeStation(lat, lo,police):
	url="https://atlas.mapmyindia.com/api/places/nearby/json?keywords=police$station&refLocation="+str(lat)+","+str(lo)
	r=get(url, headers={"Authorization":"bearer 26cc0519-6ca0-4b6e-b0f3-98b8d7d07912"})
	a=r.json()['suggestedLocations']
	police.distance=(a[0]['distance'])/1000
	police.landNo=a[0]['landlineNo']
	police.mobNo=a[0]['mobileNo']
	police.placeName=a[0]['placeName']
	police.placeAddress=a[0]['placeAddress']
	police.eMail=a[0]['email']

def other(lat, lo, sha, obj):
	url="https://atlas.mapmyindia.com/api/places/nearby/json?keywords="+sha+"&refLocation="+str(lat)+","+str(lo)
	r=get(url, headers={"Authorization":"bearer 26cc0519-6ca0-4b6e-b0f3-98b8d7d07912"})
	a=r.json()['suggestedLocations']
	obj.distance=(a[0]['distance'])/1000
	obj.landNo=a[0]['landlineNo']
	obj.mobNo=a[0]['mobileNo']
	obj.placeName=a[0]['placeName']
	obj.placeAddress=a[0]['placeAddress']
	obj.eMail=a[0]['email']


class data:
	def __init__(self):
		self.distance=0
		self.landNo=None
		self.mobNo=None
		self.placeName=None
		self.placeAddress=None
		self.eMail=None
	def printVal(self):
		print("Place Name:",self.placeName)

class locationData(Resource):
	def  get(self,lat, lo):
		ps=data()
		hos=data()
		amb=data()
		policeStation(lat,lo,ps)
		other(lat,lo,"hospital",hos)
		other(lat,lo,"Ambulance",amb)
		ps.printVal()
		hos.printVal()
		amb.printVal()
		pStatio=ps.__dict__
		hosP=hos.__dict__
		amB=amb.__dict__
		finalAns={"policeStation":pStatio,"hospital":hosP,"ambulance":amB}


		

		return jsonify(finalAns)
	# def post(self):
	# 	data=request.get_json()
	# 	return jsonify({'data':'data'}), 201

# class Square(Resource):
# 	def get(self, num):
# 		return jsonify({'sq':num**2})

# api.add_resource(Hello,'/')
api.add_resource(locationData,'/locationService/<float:lat>/<float:lo>')

if __name__=='__main__':
	app.run(debug=True)