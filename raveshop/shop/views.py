from django.http import HttpResponse
from django.shortcuts import render

from .models import *

# Create your views here.
def index(request):
    print(request)
    products = Products.objects.all()
    return render(request, 'shop/index.html', {'title': 'Raveshop', 'products': products})


def basket(request):
    print(request)
    return HttpResponse('Basket')
