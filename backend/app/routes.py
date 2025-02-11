from flask import Blueprint, jsonify
from app.services import get_contact_info
 
main_routes = Blueprint("main_routes", __name__)  # Define blueprint
 
@main_routes.route("/")
def home():
    return "Backend is running!"
 
@main_routes.route("/api/test", methods=["GET"])
def test():
    return jsonify({"message": "Hello from Flask backend!"})
 
@main_routes.route("/api/contact", methods=["GET"])
def contact():
    """Returns contact details using the service function"""
    return jsonify(get_contact_info())