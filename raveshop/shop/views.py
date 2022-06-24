from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    print(request)
    return render(request, 'shop/index.html')


def basket(request):
    print(request)
    return HttpResponse('Basket')
