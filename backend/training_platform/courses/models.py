from django.db import models
from django.utils.text import slugify

class Course(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    
    CATEGORY_CHOICES = [
        ('Operating System', 'Operating System'),
        ('Cloud', 'Cloud'),
        ('DevOps', 'DevOps'),
        ('Scriptings', 'Scriptings'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField()
    short_description = models.TextField()
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration = models.CharField(max_length=50)
    mode = models.CharField(max_length=20, default='Online')
    prerequisites = models.TextField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    order_index = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order_index']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Topic(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    order_index = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order_index']

    def __str__(self):
        return self.title

class Lab(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='labs')
    title = models.CharField(max_length=200)
    description = models.TextField()
    objectives = models.TextField(blank=True, null=True)
    duration_minutes = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class FAQ(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='faqs')
    question = models.TextField()
    answer = models.TextField()
    order_index = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order_index']

    def __str__(self):
        return self.question[:100]