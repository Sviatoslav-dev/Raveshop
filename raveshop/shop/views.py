from django.shortcuts import render
from django.views.generic.base import View

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
        basket = {k: v[0] if len(v) == 1 else v
                  for k, v in request.GET.lists()}
        ids = list(basket.keys())
        for i, _ in enumerate(ids):
            ids[i] = int(ids[i])
        products = Product.objects.filter(id__in=ids)
        products_images_nums = []
        for p in products:
            img = ProductImage.objects.filter(product__pk=p.pk).first()
            products_images_nums.append((p, img, basket[str(p.id)]))

        return render(request, 'shop/basket.html',
                      {'title': 'Raveshop', 'products_images_nums': products_images_nums})


class ProductView(View):
    def get(self, request, product_id):
        prod = Product.objects.filter(id=product_id)
        images = list(ProductImage.objects.filter(product_id=product_id))
        return render(request, 'shop/product.html', {'title': 'Raveshop', 'product': prod[0], 'images': images})
