from django.urls import path

from shop.views import ProductsView, BasketView, ProductView, get_products

urlpatterns = [
    path('', ProductsView.as_view(), name='home'),
    path('basket/', BasketView.as_view(), name='basket'),
    path('basket/get_products', get_products, name='get_products'),
    path('product/<int:product_id>/', ProductView.as_view(), name='product')
]
