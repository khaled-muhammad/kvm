import os
import json
import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin once
if not firebase_admin._apps:
    service_account_info = json.loads(os.environ.get('FIREBASE_SERVICE_ACCOUNT'))
    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)

def verify_firebase_token(token):
    """
    Verifies the Firebase token.
    Returns the decoded token (a dict) if successful, otherwise None.
    """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token  # Contains uid and other claims
    except Exception as e:
        print(f"Firebase token verification failed: {e}")
        return None
