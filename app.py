import flask
from flask import Flask
from flask import render_template
from flask import url_for
from flask import request
from flask import redirect
import requests
import json



app = Flask(__name__)
@app.route("/", methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        instance = request.form['instance']
        api_string = f'https://{instance}/api/v1/timelines/public'
        timeline = requests.get(api_string)
        dict_timeline = json.loads(timeline.text)
        breakpoint()
        print(dict_timeline)
        return redirect('/')
    
    else:
        return render_template('index.html')
    
        


if __name__ == "__main__":
    app.run(debug=True)