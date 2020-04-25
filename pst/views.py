from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action

from .filters import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import filters as rest_filters
from .serializers import *
from django.db.models import Count
import csv
from pst.tweet_handling.fetchTweets import fetchTweets


# Create your views here.
def print_tweets(request):
    politician_ids = Politician.objects.values_list('id', flat=True)
    fetchTweets(politician_ids, searchOnlySexistWords=False)

    tweetsForUi = Tweet.objects.all().filter(politician=politician_ids[0])
    template = loader.get_template('pst/index.html')
    context = {
        'tweets': tweetsForUi,
    }
    return HttpResponse(template.render(context, request))


def data_viz_tweets(request):
    template = loader.get_template('pst/dataviz.html')
    politicianQuerySet = Politician.objects.annotate(num_tweets=Count('politician'))

    context = {
        'politicianTweetCount': politicianQuerySet,
    }
    return HttpResponse(template.render(context, request))


def data_viz_details(request, pk):
    template = loader.get_template('pst/datavizdetails.html')
    politician = Politician.objects.get(pk=pk)
    if politician is None:
        print("Error finding politician")
        politician = "Politician missing or could not be found"
    else:
        negativeTweets = Tweet.objects.filter(politician=politician, sentiment__lte=0).count()
        neutralTweets = Tweet.objects.filter(politician=politician, sentiment=0).count()
        positiveTweets = Tweet.objects.filter(politician=politician, sentiment__gte=0).count()
        tweetsWithLocation = Tweet.objects.filter(politician=politician).exclude(location__exact='')

    context = {
        'politician': politician,
        'negativeTweets': negativeTweets,
        'neutralTweets': neutralTweets,
        'positiveTweets': positiveTweets,
        'tweetsWithLocation': tweetsWithLocation
    }
    return HttpResponse(template.render(context, request))


def load_politicians(request):
    data = csv.DictReader(open("./resources/politicians.csv"))
    print("testing")
    for row in data:
        # if politician is not already in the database
        try:
            first_name = row['FirstName']
            last_name = row['LastName']
            politican_count = Politician.objects.filter(first_name=first_name, last_name=last_name).count()
            if (politican_count == 0):
                Politician.objects.create(first_name=first_name,
                                          last_name=last_name,
                                          username=row['Username'],
                                          alternativeName=row['AlternativeName'],
                                          district=row['District'],
                                          office_level=row['OfficeLevel'],
                                          political_party=row['PoliticalParty'],
                                          city=row['City'],
                                          state=row['State'],
                                          gender=row['Gender'])
                print('Politician ' + last_name + ' successfully saved')
        except Exception as e:
            print("Politician did not save " + str(e))

    politicians = Politician.objects.all()
    for politician in politicians:
        if politician.tweet_count is None or politician.tweet_count == 0:
            try:
                count = Tweet.objects.filter(politician=politician).count()
                politician.tweet_count = count
                politician.save()
            except:
                print("Politician " + str(politician.last_name) + " was not saved")
        if politician.image_url is None:
            try:
                politician.image_url = "img/" + politician.last_name + ".jpg"
                politician.save()
            except:
                print("Could not find image for politician " + politician.last_name)
                politician.image_url = "./static/img/placeholder.jpg"
                politician.save()

    return HttpResponse("Politicians Saved")


class TweetViewSet(viewsets.ModelViewSet):
    serializer_class = TweetSerializer
    queryset = Tweet.objects.order_by("-date")
    filter_backends = (DjangoFilterBackend, rest_filters.OrderingFilter)
    # filter_backends = (DjangoFilterBackend,)
    filterset_class = TweetFilter
    ordering_fields = ('politician', 'date', 'sentiment')


class SexistWordViewSet(viewsets.ModelViewSet):
    serializer_class = SexistWordSerializer
    queryset = SexistWord.objects.all()


class PoliticianViewSet(viewsets.ModelViewSet):
    serializer_class = PoliticianSerializer
    queryset = Politician.objects.all()
    filter_backends = (DjangoFilterBackend, rest_filters.OrderingFilter)
    filter_fields = ('id', 'active',)
    ordering_fields = ('state', 'tweet_count')

    @action(detail=False)
    def toxicity_counts(self, request):
        active_politicians = Politician.objects.filter(active=True)
        toxic_counts = {}
        for politician in active_politicians:
            counts = {'gender': politician.gender,
                      'total': Tweet.objects.filter(politician=politician).count(),
                      'toxicity': Tweet.objects.filter(politician=politician, toxicity__gt=.7).count(),
                      'sexually_explicit': Tweet.objects.filter(politician=politician,
                                                                sexually_explicit__gt=.7).count(),
                      'identity_attack': Tweet.objects.filter(politician=politician, identity_attack__gt=.7).count()}
            toxic_counts[politician.last_name] = counts
        return Response(toxic_counts)


class TwitterUserViewSet(viewsets.ModelViewSet):
    serializer_class = TwitterUserSerializer
    queryset = TwitterUser.objects.all()
    filter_backends = (DjangoFilterBackend, rest_filters.OrderingFilter)
    filter_fields = ('tweet_count', 'username', 'user_id', 'followers_count')
    ordering_fields = ('tweet_count',)


def streaming(request):
    return render(request, 'pst/streaming.html', {
    })
