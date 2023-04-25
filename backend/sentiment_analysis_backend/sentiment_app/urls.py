from django.urls import path
from rest_framework.routers import DefaultRouter
from sentiment_app.views import (
    ImageView,
)

router = DefaultRouter()

router.register(r"v1/upload", ImageView, basename="ImageView")

urlpatterns = router.urls
