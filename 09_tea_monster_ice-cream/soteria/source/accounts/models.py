from django.db import models
from django.contrib.auth.models import User

AGE_CHOICES = (
    ('young','0-18'),
    ('young_adult', '18-40'),
    ('old','more than 40'),
)

SEX_CHOICES = {
    ('m', 'male'),
    ('f', 'female'),
    ('u', 'undeclared')
}

class Activation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    code = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True)
    # age = models.CharField(choices=AGE_CHOICES, max_length=20, default='young')
    # sex = models.CharField(choices=SEX_CHOICES, max_length=20, default='u')
