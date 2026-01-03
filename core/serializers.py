from rest_framework import serializers
from core.models import Employee, Article
from django.contrib.auth.models import User
from taggit.serializers import TaggitSerializer, TagListSerializerField


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name"]

class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    department = serializers.ChoiceField(choices=Employee.DEPARTMENT_CHOICES)

    class Meta:
        model = Employee
        fields = ('id', 'user', 'name', 'department', 'salary')


class ArticleSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'


