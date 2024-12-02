# events/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'registrations', views.RegistrationViewSet, basename='registration')

urlpatterns = [
    path('', include(router.urls)),
]