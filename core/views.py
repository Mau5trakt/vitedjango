from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets

from core.models import Employee, Article
from core.serializers import EmployeeSerializer, ArticleSerializer


# Create your views here.




class Home(TemplateView):
    template_name = 'core/home.html'

    def get_context_data(self, **kwargs):

        return {
            'departament_choices': [{
                'id': c[0],
                'name': c[1]
            } for c in Employee.DEPARTMENT_CHOICES],
        }




class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer

    def get_queryset(self):

        return self.request.user.employees.all()

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'slug'