from cloudipsp import Api, Checkout
api = Api(merchant_id=1506449,
          secret_key='Wu0CblCd0b8BjsVv5MmFlJkWQagksur2')
checkout = Checkout(api=api)
data = {
    "currency": "UAH",
    "amount": 1000
}
url = checkout.url(data).get('checkout_url')

print(url)