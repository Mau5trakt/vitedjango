from core import views
from django.urls import path
from rest_framework import routers



urlpatterns = [
    path('', views.Home.as_view(), name='home'),


 ]

router = routers.DefaultRouter()
router.register('api/employees', views.EmployeeViewSet, basename='employees')

urlpatterns += router.urls

