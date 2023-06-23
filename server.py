from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({
        "dimension": "SID",
        "metrics": ["Page Visits", "Exits"],
        "dateFrom": "Date From"
    })

@app.route('/process-form', methods=['POST'])
def process_form():
    data = request.get_json()
    structure = {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'status': 'sucessful'
    }
    return jsonify(structure)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
