release: python manage.py migrate
web: gunicorn siteadmin.wsgi --log-file -
worker: celery worker --app=siteadmin
