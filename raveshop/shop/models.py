from django.db import models


# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True)

    def __str__(self):
        return self.name


class Baskets(models.Model):
    user_id = models.IntegerField()
    product = models.ForeignKey('Products', on_delete=models.CASCADE)
