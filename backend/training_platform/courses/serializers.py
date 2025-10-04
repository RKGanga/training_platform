from rest_framework import serializers
from .models import Course, Module, Topic, Lab, FAQ

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    
    class Meta:
        model = Module
        fields = '__all__'

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'category', 'subcategory', 
            'short_description', 'level', 'duration', 'mode', 
            'prerequisites', 'featured', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']

class CourseDetailSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    labs = LabSerializer(many=True, read_only=True)
    faqs = FAQSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']