from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from pst.tasks import test, fetchTweets
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'siteadmin.settings')

app = Celery('siteadmin')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    print('cleery started')

    # Calls test('hello') every 10 seconds (uncomment to make sure celery is working)
    # sender.add_periodic_task(2.0, test.s("hello"), name='add every 10')
   
    # Executes every morning at 7:30 a.m. 
    sender.add_periodic_task(
        crontab(hour=7, minute=30),
        fetchTweets.s(),
    )

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))