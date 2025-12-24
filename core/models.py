from django.conf import settings
from django.db import models
import uuid
from django.contrib.auth.models import User
from tinymce import models as tinymce_models
from taggit.managers import TaggableManager
from .fields import HexField

class PublishedArticlesManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status=Article.Status.PUBLISHED)

# Create your models here.
class Employee(models.Model):
    DEPARTMENT_CHOICES = (
        ('hr', 'Human Resources'),
        ('finance', 'Finance'),
        ('engineering', 'Engineering'),
        ('marketing', 'Marketing'),
        ('sales', 'Sales'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employees')
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    salary = models.PositiveIntegerField()



class Article(models.Model):
    class Status(models.TextChoices):
        ARCHIVED = "A", "Archived"
        DRAFTED = "D", "Drafted"
        PUBLISHED = "P", "Published"
    

    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    exceprt = models.CharField(max_length=140)
    body = tinymce_models.HTMLField()
    status = models.CharField(max_length=1, choices=Status, default=Status.PUBLISHED)
    publication_time = models.DateTimeField("Creation time", auto_now_add=True)
    last_modify_time = models.DateTimeField("Modify time", auto_now=True)
    published = PublishedArticlesManager()
    category = models.CharField(max_length=30)
    color = HexField(verbose_name="Banne color")
    
    tags = TaggableManager()


    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-publication_time']