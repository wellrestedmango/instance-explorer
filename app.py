import flask
from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import redirect
import requests
import json
import pandas as pd


app = Flask(__name__)
@app.route("/", methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        instance = request.form['instance']
        api_string = f'https://{instance}/api/v1/timelines/public'
        timeline = requests.get(api_string)
        dict_timeline = json.loads(timeline.text)
        dict_timeline_normalized = pd.json_normalize(dict_timeline)
        #for key in dict_timeline_normalized:
        #    print(type(key), key)
        #breakpoint()
        #return redirect('/')
        return render_template('instance_viewer.html', data = dict_timeline_normalized )
    
    else:
        return render_template('index.html')
    
        


if __name__ == "__main__":
    app.run(debug=True)