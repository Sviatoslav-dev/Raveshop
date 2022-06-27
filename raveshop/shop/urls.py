from django.urls import path

from shop.views import index, basket

urlpatterns = [
    path('', index),
    path('basket/', basket)
]
