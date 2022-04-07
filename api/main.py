from asyncore import file_wrapper
from fileinput import filename
import os
from flask_cors import CORS
import re
from flask import Flask, request, jsonify
import boto3
import json

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.abspath("."),"images")

@app.route('/')
def get_current_time():
    return {"title": "CCIOT Application", "home": "here"}

# Handles file upload
@app.route('/upload', methods = ["POST"], strict_slashes = False)
def upload_page():
    # img = request.files['file']
    # tags = img.headers
    # print(tags)
    # img.save(os.path.join(UPLOAD_FOLDER, img.filename))    

    data = request.form['tag']

    print(data)

    # s3 = boto3.client("s3")
    # metadata = "topics=['Fire']"
    # s3.upload_file("images/fire.jpg","cciot-fastgame-proj-ads","fire.jpg")

    # response = jsonify({'some': 'data'})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return {"Ack":"Message"}