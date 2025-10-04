from django.urls import path
from . import views

urlpatterns = [
    # Course URLs
    path('courses/', views.course_list_create, name='course-list-create'),
    path('courses/<int:pk>/', views.course_detail, name='course-detail'),
    
    # FAQ URLs
    path('faqs/', views.faq_list_create, name='faq-list-create'),
    path('faqs/bulk-create/', views.bulk_create_faqs, name='faq-bulk-create'),
    path('faqs/<int:pk>/', views.faq_detail, name='faq-detail'),
    path('courses/<int:course_id>/faqs/', views.faqs_by_course, name='faqs-by-course'),
    path('courses/<int:course_id>/faqs/delete-all/', views.delete_faqs_by_course, name='delete-faqs-by-course'),
    
    # Module URLs
    path('modules/', views.module_list_create, name='module-list-create'),
    path('modules/<int:pk>/', views.module_detail, name='module-detail'),
    
    # Topic URLs
    path('topics/', views.topic_list_create, name='topic-list-create'),
    path('topics/<int:pk>/', views.topic_detail, name='topic-detail'),
    
    # Lab URLs
    path('labs/', views.lab_list_create, name='lab-list-create'),
    path('labs/<int:pk>/', views.lab_detail, name='lab-detail'),
]