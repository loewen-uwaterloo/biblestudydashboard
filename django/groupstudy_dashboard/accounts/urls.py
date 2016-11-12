from django.conf.urls import url, include
from django.contrib.auth.views import login, logout
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

app_name = 'accounts'
urlpatterns = [
    url(r'^', include(router.urls)),        
    url(r'^users/login/', login, name='login'),
    url(r'^users/logout/', logout, {'next_page': 'login_view'}, name='logout'),
]
