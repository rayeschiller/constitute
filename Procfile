release: python manage.py migrate
web: newrelic-admin gunicorn siteadmin.wsgi --log-file -
worker: celery worker --app=siteadmin --beat