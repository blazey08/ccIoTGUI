from asyncore import file_wrapper
from fileinput import filename
import os
from unicodedata import category
from flask_cors import CORS
import re
from flask import Flask, request, jsonify
import boto3
import json

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.abspath("."),"images")

category = ["child","teenager","adult","elderly","male", "female","happy","sad","eyewear","facialhair","smile"]

@app.route('/')
def get_current_time():
    return {"title": "CCIOT Application", "home": "here"}

# Handles file upload
@app.route('/upload', methods = ["POST"], strict_slashes = False)
def upload_page():

    if request.method == "POST":
        
        # Get image
        image = request.files['file']
        image.save(os.path.join(UPLOAD_FOLDER, image.filename))    

        # Get tags
        tags = request.values.get('tags').split(',')
        assignedTags = []
        for c in category:
            if tags[category.index(c)]:
                assignedTags.append(c)

        print(assignedTags)

        # Uploading to S3
        # s3 = boto3.client("s3")
        # metadata = "topics=['Fire']"
        # s3.upload_file("images/fire.jpg","cciot-fastgame-proj-ads","fire.jpg")


    return {"Ack":"Data for {} successfully received".format(image.filename)}