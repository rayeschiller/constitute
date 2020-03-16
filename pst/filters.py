from django_filters import rest_framework as filters
from .models import Tweet


class CharInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class MyCharFilter(filters.CharFilter):
    empty_value = 'EMPTY'

    def filter(self, qs, value):
        if value != self.empty_value:
            return super(MyCharFilter, self).filter(qs, value)
        qs = self.get_method(qs)(**{'%s__%s' % (self.field_name, self.lookup_expr): ""})
        return qs.distinct() if self.distinct else qs


class TweetFilter(filters.FilterSet):
    DEMOCRAT = 'Democrat'
    REPUBLICAN = 'Republican'
    POLITICAL_PARTY_CHOICES = (
        (DEMOCRAT, 'Democrat'),
        (REPUBLICAN, 'Republican')
    )
    twitterUser__id = filters.NumberFilter(field_name='twitterUser__id', lookup_expr='exact')
    politician__id = filters.NumberFilter(field_name='politician__id', lookup_expr='exact')
    politician__last_name = filters.CharFilter(field_name='politician__last_name', lookup_expr='exact')
    politician__political_party = filters.ChoiceFilter(choices=POLITICAL_PARTY_CHOICES)
    location = MyCharFilter(field_name='location', exclude=True)
    is_retweet = filters.BooleanFilter(field_name='is_retweet', lookup_expr='exact')

    class Meta:
        model = Tweet
        fields = {
            'date': ['year__lt', 'year__gt', 'month__gt', 'month__lt', 'day__gt', 'day__lt'],
            'tweet_id': ['exact'],
            'location': ['exact'],
            'sentiment': ['gt', 'lt', 'exact'],
            'is_retweet': ['exact']
        }
