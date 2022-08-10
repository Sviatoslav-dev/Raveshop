from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True)


class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    count = models.IntegerField()

    def __str__(self):
        return f'{self.product.name} - {self.count} шт.'


class Order(models.Model):
    name = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    payment_id = models.IntegerField(null=True, unique=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"""
            {self.name}
            {self.region}
            {self.city}
            {self.phone_number}
            {self.payment_id}
            Оплачено: {self.paid}
        """
