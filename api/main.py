import time 
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time(), 'string':"This is the data"}

@app.route('/home')
def home_page():
    return {"here": "yuyan"}