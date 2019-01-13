release: python manage.py migrate
web: newrelic-admin run-program gunicorn siteadmin.wsgi --log-file -
worker: celery worker --app=siteadmin --beat
