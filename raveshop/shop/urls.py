from django.urls import path

from shop.views import ProductsView, BasketView, ProductView

urlpatterns = [
    path('', ProductsView.as_view(), name='home'),
    path('basket/', BasketView.as_view(), name='basket'),
    path('product/<int:product_id>/', ProductView.as_view(), name='product')
]
