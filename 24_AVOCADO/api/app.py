from flask import Flask, request #import main Flask class and request object
import requests
app = Flask(__name__) #create the Flask app
@app.route('/')
def hello_world(): 
    return '<h1>Hello World</h1>'

@app.route('/query-example')
def query_example():
    location = request.args.get('location')
    r = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location+",+Bangalore,+CA&key=key")
    data = r.json()
    d = data["results"][0]["geometry"]["location"]

    # print(d["lat"])
    # print(d["lng"])
    print (d)
    api = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=police station&location="+str(d["lat"])+","+str(d["lng"])+"&radius=1000&key=key"
    # r = requests.get(api)
    r = requests.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=police station&location="+str(d['lat'])+","+str(d['lng'])+"&radius=1000&key=AIzaSyCyFR5nUdc-N4GV_mvPR4tYYT0_mkml8zs")
    policeStations = []
    data = r.json()
    listPolice = data["results"]
    for i in range(0, len(listPolice)):
        policeStations.append(listPolice[i]["name"])
    return '''The nearby police stations are: {}'''.format(policeStations)
if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000
