from django.conf import settings
from django.db import models
import uuid
from django.contrib.auth.models import User
from tinymce import models as tinymce_models
from taggit.managers import TaggableManager
from .fields import HexColorField
from slugify import slugify

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


    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="blog_posts"
    )
    title = models.CharField(max_length=100)
    excerpt = models.CharField(max_length=140)
    body = tinymce_models.HTMLField()
    status = models.CharField(
        max_length=1,
        choices=Status.choices,
        default=Status.PUBLISHED
    )
    publication_time = models.DateTimeField("Creation time", auto_now_add=True)
    last_modify_time = models.DateTimeField("Modify time", auto_now=True)

    category = models.CharField(max_length=30)
    color = HexColorField(verbose_name="Banner color")
    slug = models.SlugField(max_length=100)
    tags = TaggableManager()


    objects = models.Manager()
    published = PublishedArticlesManager()

    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-publication_time']

    def save(self, *args, **kwargs):
        print(self.__dict__)
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)