from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.utils import timezone
from .models import Contact
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    @action(detail=False, methods=['post'])
    def submit_contact(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            
            # Send email notification
            email_sent = self.send_contact_email(contact)
            
            response_data = {
                "message": "Thank you for your message! We'll reach out within 24 hours."
            }
            
            if not email_sent:
                response_data["note"] = "Note: Email notification failed, but your message was saved."
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_contact_email(self, contact):
        """Send HTML email notification for new contact form submission"""
        try:
            subject = f'🌐 New Contact Form Submission - {contact.name}'
            
            # Context for email templates
            context = {
                'name': contact.name,
                'email': contact.email,
                'phone': contact.phone,
                'course_interested': contact.course_interested,
                'message': contact.message,
                'timestamp': timezone.now().strftime("%Y-%m-%d %H:%M:%S %Z")
            }
            
            # Render HTML content
            html_content = render_to_string(
                'contacts/email_templates/contact_notification.html', 
                context
            )
            
            # Render plain text content
            text_content = render_to_string(
                'contacts/email_templates/contact_notification.txt', 
                context
            )
            
            # Create email
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=['hr@sunvivatechnologies.com'],  # Send to HR email
                reply_to=[contact.email]  # Allow direct reply to the user
            )
            
            # Attach HTML version
            email.attach_alternative(html_content, "text/html")
            
            # Send email
            email.send(fail_silently=False)
            
            print(f"✅ Email sent successfully for contact from {contact.name}")
            return True
            
        except Exception as e:
            print(f"❌ Email sending failed: {str(e)}")
            # Log the error for debugging
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Email sending failed for contact {contact.id}: {str(e)}")
            return False