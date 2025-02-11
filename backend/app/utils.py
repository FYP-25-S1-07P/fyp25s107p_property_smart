import re
 
def validate_email(email):
    """Checks if an email address is valid."""
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(pattern, email) is not None

def format_response(success, message, data=None):
    """Standardizes API responses."""
    return {
        "success": success,
        "message": message,
        "data": data
    }