from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # This line is crucial
    path('api/courses/', include('courses.urls')),
    path('api/contacts/', include('contacts.urls')),
]