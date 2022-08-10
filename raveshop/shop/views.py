import base64
import json
import random

from django.forms.models import model_to_dict
import telebot

from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse

from .forms import OrderForm
from .models import *
from django.http import HttpResponseRedirect
from cloudipsp import Api, Checkout
import json
from django.core.mail import send_mail
from raveshop.settings import BOT_TOKEN


class ProductsView(View):
    def get(self, request):
        products = Product.objects.all()
        products_images = []
        for p in products:
            img = ProductImage.objects.filter(product__pk=p.pk).first()
            products_images.append((p, img))

        return render(request, 'shop/index.html',
                      {'title': 'Raveshop', 'products_images': products_images})

    def post(self, request):
        print(request.POST)


class BasketView(View):
    def get(self, request):
        form = OrderForm()
        return render(request, 'shop/basket.html', {'title': 'Raveshop', 'form': form})

    def post(self, request, *args, **kwargs):
        # massage = json.dumps(request.POST)

        #payment_id = 1000 #random.randint(1, 1000)
        #form = OrderForm(request.POST)
        #if form.is_valid():
            # api = Api(merchant_id=1506449,
            #           secret_key='Wu0CblCd0b8BjsVv5MmFlJkWQagksur2')
            # checkout = Checkout(api=api)
            # data = {
            #     "currency": "UAH",
            #     "amount": 10_00,
            #     "response_url": 'http://127.0.0.1:8000/'
            # }
            # print(checkout.order_id)
            # url = checkout.url(data).get('checkout_url')
            # payment_id = checkout.payment_id

            # post_data = request.POST
            # basket = json.loads(post_data['basket_data'])
            #
            # order = Order(name=post_data['name'], region=post_data['region'], city=post_data['city'],
            #               phone_number=post_data['phone_number'], payment_id=payment_id)
            # order.save()
            #
            # for product_id in basket.keys():
            #     product = Product.objects.filter(pk=product_id).first()
            #     po = ProductOrder(product=product, order=order, count=4)
            #     po.save()
        return HttpResponseRedirect(f'/basket/success/')


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


class OrderSuccess(View):
    def get(self, request):
        return render(request, 'shop/order_success.html', {'title': 'Raveshop'})

    def post(self, request):
        payment_id = request.POST['payment_id']
        order = Order.objects.filter(payment_id=payment_id).first()
        order_products = ProductOrder.objects.filter(order__pk=order.id)
        massage = ''
        massage += str(order) + '\n'
        for op in order_products:
            massage += str(op) + '\n'
        bot = telebot.TeleBot(BOT_TOKEN)
        bot.config['api_key'] = BOT_TOKEN
        bot.send_message(473958566, massage)
        return HttpResponse('Success')
