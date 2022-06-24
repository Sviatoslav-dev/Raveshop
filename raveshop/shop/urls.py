from django.urls import path
from django.shortcuts import render

from shop.views import index, basket

urlpatterns = [
    path('', index),
    path('basket/', basket)
]