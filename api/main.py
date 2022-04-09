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

category = ["Child","Teenager","Adult","Elderly","Male", "Female","Happy","Sad","Eyewear","Facial Hair","Smile"]

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
        #print(image.filename) 

        # Get tags
        tags = request.values.get('tags').split(',')
        assignedTags = []
        for c in category:
            if tags[category.index(c)] == 'true':
                assignedTags.append(c)

        metadata = str(assignedTags)[1:-1]
        metadata = metadata.replace("'","")
        #print(metadata)

        # Uploading to S3
        s3 = boto3.client("s3")
        s3.upload_file("images/"+image.filename,"cciot-fastgame-proj-ads",image.filename,ExtraArgs={"Metadata":{"topics":metadata}})


    return {"Ack":"Data for {} successfully received".format(image.filename)}