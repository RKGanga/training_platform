from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Course, Module, Topic, Lab, FAQ
from .serializers import (
    CourseListSerializer, CourseDetailSerializer,
    ModuleSerializer, LabSerializer, FAQSerializer,
    TopicSerializer
)

# ===== COURSE VIEWS =====
@api_view(['GET', 'POST'])
def course_list_create(request):
    """
    GET: List all courses with filtering and search
    POST: Create a new course
    """
    if request.method == 'GET':
        # Filtering
        category = request.GET.get('category')
        level = request.GET.get('level')
        featured = request.GET.get('featured')
        search = request.GET.get('search')
        
        queryset = Course.objects.all()
        
        if category:
            queryset = queryset.filter(category=category)
        if level:
            queryset = queryset.filter(level=level)
        if featured:
            queryset = queryset.filter(featured=featured.lower() == 'true')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(short_description__icontains=search) |
                Q(description__icontains=search)
            )
        
        serializer = CourseListSerializer(queryset, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CourseListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def course_detail(request, pk):
    """
    GET: Retrieve a specific course with all details
    PUT: Update a specific course
    DELETE: Delete a specific course
    """
    course = get_object_or_404(Course, pk=pk)
    
    if request.method == 'GET':
        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CourseListSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        course.delete()
        return Response(
            {'message': 'Course deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

# ===== FAQ VIEWS =====
@api_view(['GET', 'POST'])
def faq_list_create(request):
    """
    GET: List all FAQs
    POST: Create a new FAQ
    """
    if request.method == 'GET':
        course_id = request.GET.get('course_id')
        if course_id:
            faqs = FAQ.objects.filter(course_id=course_id)
        else:
            faqs = FAQ.objects.all()
        
        serializer = FAQSerializer(faqs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = FAQSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def faq_detail(request, pk):
    """
    GET: Retrieve a specific FAQ
    PUT: Update a specific FAQ
    DELETE: Delete a specific FAQ
    """
    faq = get_object_or_404(FAQ, pk=pk)
    
    if request.method == 'GET':
        serializer = FAQSerializer(faq)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = FAQSerializer(faq, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        faq.delete()
        return Response(
            {'message': 'FAQ deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

@api_view(['GET'])
def faqs_by_course(request, course_id):
    """
    GET: Get all FAQs for a specific course
    """
    try:
        # Check if course exists
        course = get_object_or_404(Course, id=course_id)
        
        # Get all FAQs for this course, ordered by order_index
        faqs = FAQ.objects.filter(course_id=course_id).order_by('order_index')
        
        # Serialize the data
        serializer = FAQSerializer(faqs, many=True)
        
        # Return response with course info and FAQs
        response_data = {
            'course': {
                'id': course.id,
                'title': course.title,
                'category': course.category,
                'level': course.level
            },
            'faqs': serializer.data,
            'count': faqs.count()
        }
        
        return Response(response_data)
        
    except Course.DoesNotExist:
        return Response(
            {'error': f'Course with id {course_id} does not exist'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
def delete_faqs_by_course(request, course_id):
    """
    DELETE: Delete all FAQs for a specific course
    """
    try:
        # Check if course exists
        course = get_object_or_404(Course, id=course_id)
        
        # Get all FAQs for this course
        faqs = FAQ.objects.filter(course_id=course_id)
        faqs_count = faqs.count()
        
        # Delete all FAQs
        faqs.delete()
        
        return Response(
            {
                'message': f'Successfully deleted {faqs_count} FAQs for course: {course.title}',
                'deleted_count': faqs_count,
                'course': {
                    'id': course.id,
                    'title': course.title
                }
            },
            status=status.HTTP_200_OK
        )
        
    except Course.DoesNotExist:
        return Response(
            {'error': f'Course with id {course_id} does not exist'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# ===== MODULE VIEWS =====
@api_view(['GET', 'POST'])
def module_list_create(request):
    """
    GET: List all modules
    POST: Create a new module
    """
    if request.method == 'GET':
        course_id = request.GET.get('course_id')
        if course_id:
            modules = Module.objects.filter(course_id=course_id)
        else:
            modules = Module.objects.all()
        
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def module_detail(request, pk):
    """
    GET: Retrieve a specific module
    PUT: Update a specific module
    DELETE: Delete a specific module
    """
    module = get_object_or_404(Module, pk=pk)
    
    if request.method == 'GET':
        serializer = ModuleSerializer(module)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ModuleSerializer(module, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        module.delete()
        return Response(
            {'message': 'Module deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

# ===== TOPIC VIEWS =====
@api_view(['GET', 'POST'])
def topic_list_create(request):
    """
    GET: List all topics
    POST: Create a new topic
    """
    if request.method == 'GET':
        module_id = request.GET.get('module_id')
        if module_id:
            topics = Topic.objects.filter(module_id=module_id)
        else:
            topics = Topic.objects.all()
        
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def topic_detail(request, pk):
    """
    GET: Retrieve a specific topic
    PUT: Update a specific topic
    DELETE: Delete a specific topic
    """
    topic = get_object_or_404(Topic, pk=pk)
    
    if request.method == 'GET':
        serializer = TopicSerializer(topic)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TopicSerializer(topic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        topic.delete()
        return Response(
            {'message': 'Topic deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

# ===== LAB VIEWS =====
@api_view(['GET', 'POST'])
def lab_list_create(request):
    """
    GET: List all labs
    POST: Create a new lab
    """
    if request.method == 'GET':
        course_id = request.GET.get('course_id')
        if course_id:
            labs = Lab.objects.filter(course_id=course_id)
        else:
            labs = Lab.objects.all()
        
        serializer = LabSerializer(labs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def lab_detail(request, pk):
    """
    GET: Retrieve a specific lab
    PUT: Update a specific lab
    DELETE: Delete a specific lab
    """
    lab = get_object_or_404(Lab, pk=pk)
    
    if request.method == 'GET':
        serializer = LabSerializer(lab)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = LabSerializer(lab, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        lab.delete()
        return Response(
            {'message': 'Lab deleted successfully'}, 
            status=status.HTTP_204_NO_CONTENT
        )

# ===== BULK CREATE VIEWS =====
@api_view(['POST'])
def bulk_create_faqs(request):
    """
    POST: Create multiple FAQs at once
    """
    serializer = FAQSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)