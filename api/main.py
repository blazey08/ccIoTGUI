from difflib import restore
import os, re, boto3, json
from boto3.dynamodb.conditions import Key
from unicodedata import category
from flask_cors import CORS
from flask import Flask, redirect, request, jsonify, url_for


app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.abspath("."),"images")

category = ["Child","Teenager","Adult","Elderly","Male", "Female","Happy","Sad","Eyeglasses","Sunglasses","FacialHair","Smile"]

@app.route('/', methods = ["POST"])
def login():

    if request.method == "POST":
        resType = request.get_json(silent=True).get('bType')

        if resType == "metrics":
            print("Going to metrics page...")
            return redirect(url_for('display_metrics'))

        elif resType == "upload":
            print("Going to upload page...")
            return redirect(url_for("upload_page"))

    return {"title": "CCIOT Application"}

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

@app.route('/metrics', methods = ["GET"])
def display_metrics():

    if request.method == "GET":
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('viewerCount_byAds')
        response = table.scan()['Items']
    
        return {"data": response}

    return "Hello world"
