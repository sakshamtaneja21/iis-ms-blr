import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
import joblib
import requests
import json
import io
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, url_for, request
import azure
from azure.storage.blob import BlockBlobService
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import accuracy_score, mean_squared_error

block_blob_service = BlockBlobService(account_name='initiable', account_key='+L3U+dbj/0xQz3fKKB7JLRyHPD2YZ8ojOwbe3rC13M9DjIwZBGaaa6AB0AGPgpDOj3uI0xG+pVjmGUAdhOPJEg==')
containers = block_blob_service.list_containers()
container_name = 'hackathon'

print("\nList blobs in the container")
generator = block_blob_service.list_blobs(container_name)
for blob in generator:
    print("\t Blob name: " + blob.name)

for c in containers:
    print(c.name)

app = Flask(__name__)
cors = CORS(app)

# file_name = 'stock_infosys.csv'

# from io import StringIO
# blobstring = block_blob_service.get_blob_to_text(container_name, blob_name=file_name).content
# df = pd.read_csv(StringIO(blobstring))

@app.route('/')

def index():
    return 'Hello World'

data_details = {}

@app.route('/get_data_details', methods=['POST'])

def get_data_details():
    url = request.json['csvurl']
    print(url)
    data = requests.get(url).content
    df = pd.read_csv(io.StringIO(data.decode('utf-8')))
    data_details['columns'] = list(df.columns)
    try:
        data_details['date_column'] = list(df[df.select_dtypes(['object']).columns].apply(pd.to_datetime))
    except Exception:
        data_details['date_column'] = []
    data_details['column_types'] = list(df.dtypes.astype(str))

    print(data_details)
    return json.dumps(data_details)

@app.route('/univariate_analysis', methods=['POST'])

def univariate_analysis():
    url = request.json['csvurl']
    print(url)
    data = requests.get(url).content
    df = pd.read_csv(io.StringIO(data.decode('utf-8')))

    blob_url = []

    if request.json['type'] == 'date':
        try:
            col_name = request.json['col_name']
            df.index = pd.to_datetime(df[col_name])
            df[['Close', 'Open', 'High', 'Low']].plot(figsize=(25, 15))
            plt.savefig('./plots/univariate_timeseries.png', bbox_inches='tight')
            block_blob_service.create_blob_from_path(container_name, 'univariate_timeseries.png', './plots/univariate_timeseries.png')
            blob_url.append(block_blob_service.make_blob_url(container_name, 'univariate_timeseries.png', 'https'))
        except Exception:
            pass

    df.hist(figsize=(20, 10))
    plt.savefig('./plots/univariate.png', bbox_inches='tight')
    block_blob_service.create_blob_from_path(container_name, 'univariate.png', './plots/univariate.png')
    blob_url.append(block_blob_service.make_blob_url(container_name, 'univariate.png', 'https'))
    df_dict = df.describe().to_dict()
    df_dict['image_urls'] = blob_url
    return json.dumps(df_dict)


@app.route('/scale_transform', methods=['POST'])

def scale_transform():
    url = request.json['csvurl']
    features = request.json['features']

    print(features)
    # cat_columns = request.json['']
    X_features = [i[1:] for i in features if i.startswith('x')]
    y_features = [i[1:] for i in features if i.startswith('y')]

    print("Features 1 " + str(features))

    for i, v in enumerate(features):
        if v.startswith('x'):
            features[i] = v[1:]

        if v.startswith('y'):
            features[i] = v[1:]

    print("Features 2 " + str(features))

    features = dict(zip(features[::2], features[1::2]))

    scaling_features = [k for k,v in features.items() if v == 'numerical']
    encoding_features = [k for k,v in features.items() if v == 'categorical']

    scaler = StandardScaler()
    encoder = LabelEncoder()

    print(url)
    print("Features 3" + str(features))

    print(X_features)
    print(y_features)

    data = requests.get(url).content
    df = pd.read_csv(io.StringIO(data.decode('utf-8')))

    print("Scaling: " + str(scaling_features))
    print("Encoding: " + str(encoding_features))

    df[scaling_features] = scaler.fit_transform(df[scaling_features])

    for col in encoding_features:
        df[col] = encoder.fit_transform(df[col])

    X = df[X_features].values
    y = df[y_features].values   

    print(X.shape)
    print(y.shape)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    np.savetxt("./train/X_train.csv", X_train, delimiter=",")
    np.savetxt("./train/y_train.csv", y_train, delimiter=",")
    np.savetxt("./train/X_test.csv", X_test, delimiter=",")
    np.savetxt("./train/y_test.csv", y_test, delimiter=",")

    return json.dumps({"scaling": "complete"})

@app.route('/train', methods=['POST'])

def train():

    X_train = pd.read_csv('./train/X_train.csv').values
    y_train = pd.read_csv('./train/y_train.csv').values.ravel()
    X_test = pd.read_csv('./train/X_test.csv').values
    y_test = pd.read_csv('./train/y_test.csv').values.ravel()

    accuracy = {}

    if request.json['type'] == 'classification':
        clf = RandomForestClassifier(n_estimators=100)
        clf.fit(X_train, y_train)
        y_pred = clf.predict(X_test)
        accuracy['score'] = accuracy_score(y_pred, y_test)
        pickle.dump(clf, open('./model/classifier.pkl', 'wb'))

    else:
        regressor = RandomForestRegressor(n_estimators=100)
        regressor.fit(X_train, y_train)
        y_pred = regressor.predict(X_test)
        accuracy['mse'] = mean_squared_error(y_pred, y_test)
        pickle.dumps(regressor, open('./model/regressor.pkl', 'wb'))

    return json.dumps(accuracy)

@app.route('/predict', methods=['POST'])

def predict():
    model = pickle.load(open('./model/classifier.pkl', 'rb'))

    params = request.json
    print(list(params.values()))
    params = list(params.values())
    params = [int(i) for i in params]
    print(model.predict(np.array([params])))
    result = model.predict(np.array([params]))[0]

    return json.dumps({'prediction': str(result)})


if __name__ == '__main__':
    app.run(debug=True, port=4000)