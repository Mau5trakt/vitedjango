from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'author',
        'title',
        'status',
        'publication_time',
        'last_modify_time',
        'category',
        'color',
        'slug',
    )
    list_filter = (
        'author',
        'publication_time',
        'last_modify_time',
        'status'
    )
    search_fields = ('title', 'slug')
    date_hierarchy = 'publication_time'
    prepopulated_fields = {"slug": ("title", )}