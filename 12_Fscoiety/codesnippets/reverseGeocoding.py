
from requests import get
lat=input("Enter the lat")
lo=input("Enter the lo")
url="http://apis.mapmyindia.com/advancedmaps/v1/1yrdaocz7jcdya1pizrjzu4a8kt3shls/rev_geocode?lat="+str(lat)+"&lng="+str(lo)
r=get(url)
a=r.json()['results']
locality=a[0]['locality']
pincode=a[0]['pincode']
print("locality and pincode",locality," ",pincode)