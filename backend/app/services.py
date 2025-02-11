from app.utils import format_response
 
def get_contact_info():
    """Returns dummy contact information."""
    contact_info = {
        "name": "Support Team",
        "email": "support@propertysmart.com",
        "phone": "+65 1234 5678"
    }
    return format_response(success=True, message="Contact details fetched", data=contact_info)