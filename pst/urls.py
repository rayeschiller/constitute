from django.conf.urls import url
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('mynewapp.urls')),
    path('/', views.index, name='index'),
    url(r'^', TemplateView.as_view(template_name="main.html")),
    #  re_path('index/', TemplateView.as_view(template_name='index.html')),

]
# path('', views.index, name='index'),
