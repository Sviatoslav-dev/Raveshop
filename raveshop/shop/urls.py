from django.urls import path

from shop.views import index, basket, product

urlpatterns = [
    path('', index),
    path('basket/', basket),
    path('product/<int:product_id>/', product)
]
