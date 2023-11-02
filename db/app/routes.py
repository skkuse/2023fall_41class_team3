from flask import render_template, request, redirect, url_for, flash, jsonify
from app import app, db
from app.models import User
@app.route('/')
def index():
    return "Welcome to the homepage!"

@app.route('/users')
def users():
    all_users = User.query.all()
    return jsonify(users=[user.serialize for user in all_users])

@app.route('/user/<int:id>')
def user_detail(id):
    user = User.query.get_or_404(id)
    return jsonify(user=user.serialize)

@app.route('/user/add', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or not 'username' in data or not 'email' in data:
        return jsonify(message="Invalid data"), 400
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message='User added successfully!')

@app.route('/user/edit/<int:id>', methods=['POST'])
def edit_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return jsonify(message="Invalid data"), 400
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    db.session.commit()
    return jsonify(message='User updated successfully!')

@app.route('/user/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify(message='User deleted successfully!')
