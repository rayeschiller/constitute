This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

In order to have everything working locally, you need the following processes:
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
