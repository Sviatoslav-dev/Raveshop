from django.shortcuts import render

from .models import Products


# Create your views here.
def index(request):
    products = Products.objects.all()
    return render(request, 'shop/index.html',
                  {'title': 'Raveshop', 'products': products})


def basket(request):
    if request.method == 'GET':
        basket = {k: v[0] if len(v) == 1 else v
                  for k, v in request.GET.lists()}
        print(basket)
        ids = list(basket.keys())
        print(ids)
        for i, _ in enumerate(ids):
            ids[i] = int(ids[i])
        print(ids)
        products = Products.objects.filter(id__in=ids)
        print(products)
        products_nums = []
        for p in products:
            products_nums.append((p, basket[str(p.id)]))
    return render(request, 'shop/basket.html',
                  {'title': 'Raveshop', 'products_nums': products_nums})

def product(request, product_id):
    prod = Products.objects.filter(id=product_id)
    return render(request, 'shop/product.html', {'title': 'Raveshop', 'product': prod[0]})
