"""siteadmin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from pst.views import *

router = DefaultRouter()
router.register(r'tweets', TweetViewSet)
router.register(r'sexistwords', SexistWordViewSet)
router.register(r'twitterusers', TwitterUserViewSet)
router.register(r'politicians', PoliticianViewSet)
urlpatterns = router.urls

urlpatterns.extend([
  path('admin/', admin.site.urls),
  re_path('home/', TemplateView.as_view(template_name='index.html')),
  re_path('appTweets/', TemplateView.as_view(template_name='index.html')),
  re_path('genderTweets/', TemplateView.as_view(template_name='index.html')),
  re_path('analytics/', TemplateView.as_view(template_name='index.html')),
  re_path('vis/', TemplateView.as_view(template_name='index.html')),
  re_path('politicians/', TemplateView.as_view(template_name='index.html')),
  path('print_tweets/', print_tweets),
  path('load_politicians/', load_politicians),
  path('stream_tweets/', streaming),
  path('data_viz/', data_viz_tweets),
  re_path(r'^data_viz/(?P<pk>\d+)/$', data_viz_details, name='data_viz_details'),]
)
