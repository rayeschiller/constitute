from django_filters import rest_framework as filters
from .models import Tweet

class NumberInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class TweetFilter(filters.FilterSet):
	# date = filters.DateTimeFilter(field_name='date', lookup_expr='iexact')
	DEMOCRAT = 'Democrat'
	REPUBLICAN = 'Republican'
	POLITICAL_PARTY_CHOICES = (
		(DEMOCRAT, 'Democrat'),
		(REPUBLICAN, 'Republican')
	)
	twitterUser__id = filters.NumberFilter(field_name='twitterUser__id', lookup_expr='exact')
	politician__id = filters.NumberFilter(field_name='politician__id', lookup_expr='exact')
	politician__last_name = filters.CharFilter(field_name='politician__last_name', lookup_expr='exact')
	politician__political_party = filters.ChoiceFilter(choices = POLITICAL_PARTY_CHOICES)
	has_location = filters.BooleanFilter(field_name='location', lookup_expr='isnull', exclude=True)
    
	class Meta:
		model = Tweet
		fields = {
			'date': ['year__lt', 'year__gt', 'month__gt', 'day__gt'],
			'tweet_id': ['exact'], 
			'location': ['exact'], 
			'sentiment': ['gt', 'lt', 'exact'],
		}
        