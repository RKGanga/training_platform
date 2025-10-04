from django.contrib import admin
from .models import Course, Module, Topic, Lab, FAQ

class TopicInline(admin.TabularInline):
    model = Topic
    extra = 1

class ModuleAdmin(admin.ModelAdmin):
    inlines = [TopicInline]
    list_display = ['title', 'course', 'order_index']
    list_filter = ['course']
    ordering = ['course', 'order_index']

class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1

class LabInline(admin.TabularInline):
    model = Lab
    extra = 1

class FAQInline(admin.TabularInline):
    model = FAQ
    extra = 1

class CourseAdmin(admin.ModelAdmin):
    inlines = [ModuleInline, LabInline, FAQInline]
    list_display = ['title', 'category', 'level', 'duration', 'featured', 'created_at']
    list_filter = ['category', 'level', 'featured', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']

admin.site.register(Course, CourseAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lab)
admin.site.register(FAQ)