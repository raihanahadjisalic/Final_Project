#

# app.py
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from connectdb import spcall_list, spcall
import psycopg2  # pip install psycopg2
import psycopg2.extras
import flask

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('homepage.html')


@app.route('/donate')
def donate():
    return render_template('donate.html')

"""
@app.route('/index')
def Index():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    s = "SELECT * FROM donor_details"
    cur.execute(s)  # Execute the SQL
    list_users = cur.fetchall()
    return render_template('index.html', list_users=list_users)
"""

@app.route('/adminadd')
def adminadd():
    return render_template('adminAdd.html')


@app.route('/donor', methods=['GET'])
def display_donor():

    donor = spcall_list("list_of_donors", ())[0][0] 

    return jsonify(donor)


@app.route('/donor', methods=['POST'])
def add_donor():

    params = request.get_json()
    fname = params["donor_fname"]
    lname = params["donor_lname"]
    blood_type = params["donor_blood_type"]
    email = params["donor_email"]
    date = params["donor_donate_date"]

    donor = spcall("encode_donor_information", (fname, lname, blood_type, email, date), True)[0][0]

    return jsonify(donor)


@app.route('/donor', methods=['PUT'])
def update_donor():

    params = request.get_json()
    id = params["donor_id"]
    fname = params["donor_fname"]
    lname = params["donor_lname"]
    blood_type = params["donor_blood_type"]
    email = params["donor_email"]
    date = params["donor_donate_date"]

    donor = spcall("edit_donor_information", (id, fname, lname, blood_type, email, date), True)[0][0]

    return jsonify(donor)

@app.route('/donor/<int:id>', methods=['DELETE'])
def delete_donor(id):

    donor = spcall("delete_donor_information", (id,), True)[0][0]
        
    return jsonify(donor)

@app.route('/donor/<int:id>', methods=['GET'])
def search_donor(id):

    donor = spcall("search_donor_information", (id,))[0][0] 

    return jsonify(donor)

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers', 'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp

if __name__ == '__main__':
    app.debug = True
    port = 8000
    app.run(host='0.0.0.0', port = port)

#curl -i -H "Content-Type: application/json" -X GET http://localhost:8000/donor
#curl -i -H "Content-Type: application/json" -X GET http://localhost:8000/donor/1
#curl -i -H "Content-Type: application/json" -d '{"donor_fname":"Jaane","donor_lname":"Doe","donor_blood_type":"O+","donor_email":"doejane@gmail.com", "donor_donate_date":"2022-02-14"}' -X POST http://localhost:8000/donor
#curl -i -H "Content-Type: application/json" -d '{"donor_id":"12","donor_fname":"Jane","donor_lname":"Doe","donor_blood_type":"O+","donor_email":"doejane@gmail.com", "donor_donate_date":"2022-02-14"}' -X PUT http://localhost:8000/donor
#curl -i -H "Content-Type: application/json" -X DELETE http://localhost:8000/donor/12