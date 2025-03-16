import os
import sys
from dotenv import load_dotenv

if __name__ == '__main__':
    # Load environment variables from .env file
    load_dotenv()
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'thoughty.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django. Are you sure it is installed and available on your PYTHONPATH?") from exc
    execute_from_command_line(sys.argv)