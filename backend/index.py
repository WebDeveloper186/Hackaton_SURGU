import hashlib
import os
import json
from uuid import uuid4
import flask_cors
from flask import (Flask, jsonify, request, redirect)
from werkzeug.utils import secure_filename
from flask_api import status
from peewee import \
    (Model, SqliteDatabase,
     CharField, IntegerField,
     DateTimeField, BooleanField)

STATIC_PATH = "/static"

app = Flask(__name__, static_url_path=STATIC_PATH)
flask_cors.CORS(app)
db = SqliteDatabase('backend/base.db')


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField()
    password = CharField()


class Orders(BaseModel):
    book_id = IntegerField()
    book_name = CharField()
    user_id = IntegerField()
    user_name = CharField()
    status = IntegerField()


class Books(BaseModel):
    author = CharField()
    name = CharField()
    _type = CharField()
    image = CharField()
    flag = IntegerField()


class Auth(BaseModel):
    u_id = IntegerField()
    fingerpint = CharField()
    token = CharField()
    ip = CharField()


db.create_tables([User, Books, Orders, Auth])


def auth_user(username, password, fingerprint, ip):
    query = User.select().where(User.username == username)
    for c in query:
        data = c.password
        u_id = c.id
    if hashlib.sha256(password.encode('utf-8')).hexdigest() == data:
        token = uuid4()
        a = Auth(u_id=u_id, fingerpint=fingerprint, token=token, ip=ip)
        a.save()
        db.commit()
        return json.dumps({"auth": True, "token": token.__str__()})
    else:
        return json.dumps({"auth": False})


def check_token(token, hash, ip):
    global data, data_ip
    query = Auth.select().where(Auth.token == token)
    for c in query:
        data = c.fingerpint
        data_ip = c.ip
    if data == hash and data_ip == ip:
        return json.dumps({"auth": True})
    else:
        return delete_auth(token)


def delete_auth(token):
    result = Auth.get(token=token).delete_instance()
    db.commit()
    return '', status.HTTP_204_NO_CONTENT


def add_data(username, passwrod):
    a = User(username=username, password=passwrod)
    a.save()
    db.commit()
    return '', status.HTTP_201_CREATED


def add_order(username, address, time, services, price):
    a = Order(username=username, address=address, time=time, services=services, price=price)
    a.save()
    db.commit()
    return '', status.HTTP_201_CREATED


def get_order_data(username):
    query = Order.select().where(Order.username == username).dicts()
    return jsonify({'rows': list(query)})


def change_order(id, username, address, time, services, price):
    data = Order.get(id)
    data.id = id
    data.username = username
    data.address = address
    data.time = time
    data.services = services
    data.price = price
    data.save()
    db.commit()
    return '', status.HTTP_200_OK


def delete_order(id):
    result = Order.get(id=id).delete_instance()
    db.commit()
    return '', status.HTTP_204_NO_CONTENT


def get_orders():
    query = Order.select().dicts()
    return jsonify({'rows': list(query)})


def get_sessions():
    query = Auth.select().dicts()
    return jsonify({'rows': list(query)})


def get_users():
    query = User.select().dicts()
    return jsonify({'rows': list(query)})


@app.route('/api/auth', methods=['GET', 'PUT', 'POST'])
def auth():
    if request.method == 'GET':
        if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
            ip = request.environ['REMOTE_ADDR']
        else:
            ip = request.environ['HTTP_X_FORWARDED_FOR']
        if request.args.get('token', type=str) is not None and \
                request.args.get('hash', type=str) is not None:
            return check_token(request.args.get('token', type=str), request.args.get('hash', type=str), ip)
        elif request.args.get('delete_token', type=str) is not None:
            return delete_auth(request.args.get('delete_token', type=str))
    elif request.method == 'PUT':
        content = request.json
        username = content['username']
        password = content['password']
        fingerprint = content['user_data']
        if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
            ip = request.environ['REMOTE_ADDR']
        else:
            ip = request.environ['HTTP_X_FORWARDED_FOR']
        return auth_user(username, password, fingerprint, ip)
    elif request.method == 'POST':
        content = request.json
        username = content['username']
        password = content['password']
        return add_data(username, hashlib.sha256(password.encode('utf-8')).hexdigest())


@app.route('/api/orders', methods=['GET', 'POST', 'PUT', 'DELETE'])
def order():
    if request.method == 'GET':
        if request.args.get('username', type=str) is not None:
            return get_order_data(request.args.get('username', type=str))
    elif request.method == 'POST':
        content = request.json
        username = content['username']
        address = content['address']
        time = content['time']
        services = content['services']
        price = content['price']
        return add_order(username, address, time, services, int(price))
    elif request.method == 'PUT':
        content = request.json
        id = content['id']
        username = content['username']
        address = content['address']
        time = content['time']
        services = content['services']
        price = content['price']
        return change_order(id, username, address, time, services, price)
    elif request.method == 'DELETE':
        content = request.json
        id = content['id']
        return delete_order(id)


@app.route('/api/getData', methods=['GET'])
def get_db_data():
    if request.args.get('orders', type=str) is not None:
        return get_orders()
    elif request.args.get('sessions', type=str) is not None:
        return get_sessions()
    elif request.args.get('users', type=str) is not None:
        return get_users()


@app.route('/api/getBooks', methods=['GET', 'POST'])
def get_books():
    query = Books.select().dicts()
    return jsonify({'rows': list(query)})


if __name__ == "__main__":
    app.config['JSON_AS_ASCII'] = False
    app.debug = True
    app.run()
