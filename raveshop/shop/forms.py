from django import forms


class OrderForm(forms.Form):
    name = forms.CharField(max_length=255)
    region = forms.CharField(max_length=255)
    city = forms.CharField(max_length=255)
    phone_number = forms.CharField(max_length=255)
