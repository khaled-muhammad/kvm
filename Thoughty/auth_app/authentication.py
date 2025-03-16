from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from firebase_admin import auth
import logging
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

logger = logging.getLogger(__name__)

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        
        try:
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token.get('uid')
            if not uid:
                raise AuthenticationFailed("Invalid token: No UID found")
        except ValueError as e:
            logger.error(f"Invalid token format: {str(e)}")
            raise AuthenticationFailed("Invalid token format")
        except auth.ExpiredIdTokenError:
            logger.error("Expired token")
            raise AuthenticationFailed("Token expired")
        except auth.InvalidIdTokenError:
            logger.error("Invalid token")
            raise AuthenticationFailed("Invalid token")
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            raise AuthenticationFailed("Authentication failed")

        User = get_user_model()
        try:
            user = User.objects.get(firebase_uid=uid)
            if not user.is_active:
                logger.warning(f"Inactive user attempt: {uid}")
                raise AuthenticationFailed("User account disabled")
        except User.DoesNotExist:
            email = decoded_token.get('email', f"{uid}@firebaseuser.com")
            user = User.objects.create_user(
                username=uid,
                email=email,
                firebase_uid=uid,
                is_active=True
            )
            logger.info(f"New user created: {uid}")

        return (user, None)