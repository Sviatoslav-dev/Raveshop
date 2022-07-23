import base64
import json
from django.forms.models import model_to_dict

from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse

from .models import Product, ProductImage


class ProductsView(View):
    def get(self, request):
        products = Product.objects.all()
        products_images = []
        for p in products:
            img = ProductImage.objects.filter(product__pk=p.pk).first()
            products_images.append((p, img))

        return render(request, 'shop/index.html',
                      {'title': 'Raveshop', 'products_images': products_images})


class BasketView(View):
    def get(self, request):
        # basket = {k: v[0] if len(v) == 1 else v
        #           for k, v in request.GET.lists()}
        # ids = list(basket.keys())
        # for i, _ in enumerate(ids):
        #     ids[i] = int(ids[i])
        # products = Product.objects.filter(id__in=ids)
        # products_images_nums = []
        # total_price = 0
        # for p in products:
        #     img = ProductImage.objects.filter(product__pk=p.pk).first()
        #     n = basket[str(p.id)]
        #     products_images_nums.append((p, img, n))
        #     total_price += p.price * int(n)

        return render(request, 'shop/basket.html', {'title': 'Raveshop'})
        # 'products_images_nums': products_images_nums, 'total_price': total_price})


class ProductView(View):
    def get(self, request, product_id):
        prod = Product.objects.filter(id=product_id)
        images = list(ProductImage.objects.filter(product_id=product_id))
        return render(request, 'shop/product.html', {'title': 'Raveshop', 'product': prod[0], 'images': images})


def get_products(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    products = body['products']
    products = products.split()
    products = Product.objects.filter(id__in=products)
    products_dicts = []
    for product in products:
        product_img = ProductImage.objects.filter(product__pk=product.pk).first()
        product_dict = model_to_dict(product)
        product_dict['img_url'] = product_img.photo.url
        products_dicts.append(product_dict)
    result = json.dumps(products_dicts, indent=2)
    return HttpResponse(result, content_type="application/json")
