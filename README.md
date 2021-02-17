Constitute is a django web app and REST API to view data on harassment & sexism towards female politicians on Twitter. Uses Django, React.js, D3.js, Heroku, and Postgres.

In order to have everything working locally, you need the following processes:
Install python requirements with ```pip install -r requirements.txt```
Install node requirements with ```npm install```
1. Virtualenv -> source myenv/bin/activate
2. Django server -> python manage.py runserver
3. React server - > npm start
4. Redis -> Redis-server
5. Celery -> celery -A siteadmin worker -l info -B

Heroku local port: 5000
Django server port: 8000
React js port: 3000

API: http://constitute.tech/tweets
Homepage: http://constitute.tech/home
