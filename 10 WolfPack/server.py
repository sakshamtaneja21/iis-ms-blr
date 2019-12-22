from flask import Flask, render_template,url_for, jsonify, send_from_directory, request
import re
from bs4 import BeautifulSoup
import requests
rooms = 15
app = Flask(__name__)
@app.route('/scrape/<string:topic>/')
def scraper(topic):
    topic=topic.split(" ")
    for i in topic:
        if i not in ["of","at","from","to"]:
            i=i.capitalize()
        else:
            i=i
    topic="_".join(topic)
    link="https://en.wikipedia.org/wiki/"
    link+=topic
    req=requests.get(link)
    bs=BeautifulSoup(req.content,"html.parser")
    s=bs.find_all("p")
    string=" "
    for i in s:
        if len(string)<300:
            string+=i.getText()
    string=re.sub(r"\[[0-9]*\]"," ",string)
    return string 
@app.route("/check-in")
def book_room():
    global rooms
    if rooms != 0:
        rooms=int(rooms)
        rooms -= 1
        p="One room has been occupied!! Updated avaibility is "+str(rooms)
    else:
        print ("Sorry no rooms are available")
        return str("Sorry no rooms are available")
    return (p)

@app.route("/check-out")
def release_room():
    global rooms
    rooms=int(rooms)
    rooms += 1
    p="One room has been vacated!! Updated avaibility is "+str(rooms)
    return (p)

@app.route('/set_rooms', methods = ['POST'])
def set_rooms():
    global rooms
    if request.method == "POST":   
        rooms = request.form['set_rooms']
    return str(rooms)
@app.route('/meaning/<string:topic>/')
def vocab(topic):
    topic=topic.split(" ")
    for i in topic:
        i=i.lower()
    topic="_".join(topic)
    link="https://en.wiktionary.org/wiki/"
    link+=topic
    request=requests.get(link)
    bs=BeautifulSoup(request.content,"html.parser")
    s=bs.find_all("ol")
    string=" "
    for i in s:
        if len(string)<600:
            string+=i.getText()+"\n"
    string=re.sub(r"\[[0-9]*\]"," ",string)
    return string
if __name__ == "__main__":
    app.run(host="192.168.100.3",port="80")


