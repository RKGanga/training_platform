from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'course_interested', 'created_at']
    list_filter = ['course_interested', 'created_at']
    search_fields = ['name', 'email', 'course_interested']
    readonly_fields = ['created_at']

admin.site.register(Contact, ContactAdmin)