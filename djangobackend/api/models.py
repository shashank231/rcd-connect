from django.db import models

# Create your models here.

class TodoTasks(models.Model):
    name = models.CharField(max_length=100)