import pandas as pd
import numpy as  np
import pickle
import joblib

import json

from flask import Flask, render_template, url_for, request

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World'

if __name__ == '__main__':
    app.run(debug=True)