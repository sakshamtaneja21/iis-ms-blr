from requests import get
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

def main():
	lat=input("Enter the lat")
	lo=input("Enter the long")
	ps=data()
	hos=data()
	amb=data()
	policeStation(lat,lo,ps)
	other(lat,lo,"hospital",hos)
	other(lat,lo,"Ambulance",amb)
	ps.printVal()
	hos.printVal()
	amb.printVal()
	
if __name__ == '__main__':
	main()