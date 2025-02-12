from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__) 
    CORS(app)  # Enable CORS
    
    from app.routes import main_routes  # Import routes
    app.register_blueprint(main_routes)  # Register routes    
    return app