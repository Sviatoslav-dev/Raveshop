from django import template

register = template.Library()

@register.simple_tag
def update_variable(value):
    """Allows to update existing variable in template"""
    return value

# def update_variable(value):
#     active = value
#     return active
#
#
# register.filter('update_variable', update_variable)