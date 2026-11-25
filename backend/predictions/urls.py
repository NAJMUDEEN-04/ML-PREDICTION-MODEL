from django.urls import path
from .views import *

urlpatterns = [
    path('data/', prediction.as_view()),
]