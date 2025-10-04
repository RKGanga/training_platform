import React, { useState } from 'react';
import { contactService } from '../services/api';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_interested: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await contactService.submitContact(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        course_interested: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-elevated rounded-2xl p-12 border border-border text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-surface" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-4">Message Sent Successfully!</h1>
            <p className="text-text-secondary text-lg mb-8">
              Thank you for your interest in <span className="text-primary-300">Sunviva Technologies</span>! 
              We'll reach out to you within 24 hours to discuss your training needs and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="bg-primary-300 text-surface px-8 py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-colors"
              >
                Browse Courses
              </a>
              <button
                onClick={() => setSuccess(false)}
                className="border border-border text-text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-surface-hover transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">Get in Touch</h1>
            <p className="text-text-secondary text-lg mb-8">
              Ready to start your learning journey with <span className="text-primary-300">Sunviva Technologies</span>? 
              Contact us and we'll help you choose the right path for your career growth.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="course_interested" className="block text-text-primary font-medium mb-2">
                    Course Interested In
                  </label>
                  <select
                    id="course_interested"
                    name="course_interested"
                    value={formData.course_interested}
                    onChange={handleChange}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary-300"
                  >
                    <option value="">Select a course</option>
                    <option value="Redhat Linux Administration">Redhat Linux Administration</option>
                    <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                    <option value="Microsoft Azure Fundamentals">Microsoft Azure Fundamentals</option>
                    <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS)</option>
                    <option value="Docker Containers">Docker Containers</option>
                    <option value="Kubernetes (K8s)">Kubernetes (K8s)</option>
                    <option value="Terraform Infrastructure as Code">Terraform Infrastructure as Code</option>
                    <option value="Ansible Automation">Ansible Automation</option>
                    <option value="Jenkins CI/CD">Jenkins CI/CD</option>
                    <option value="Git Version Control">Git Version Control</option>
                    <option value="GitHub Actions">GitHub Actions</option>
                    <option value="Python Programming">Python Programming</option>
                    <option value="Bash/Shell Scripting">Bash/Shell Scripting</option>
                    <option value="PowerShell Scripting">PowerShell Scripting</option>
                    <option value="Not Sure - Need Guidance">Not Sure - Need Guidance</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-300"
                  placeholder="Tell us about your learning goals, career aspirations, or any questions you have about our programs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-300 text-surface py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-12">
            <div className="bg-surface-elevated rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-primary-300" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Email</h3>
                    <p className="text-text-secondary">hr@sunvivatechnologies.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-primary-300" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Contact Us</h3>
                    <p className="text-text-secondary">+91 95508 04579</p>
                    <p className="text-text-secondary text-sm">Mon-Fri: 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-primary-300" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">Office</h3>
                    <p className="text-text-secondary">123 Tech Street</p>
                    <p className="text-text-secondary">Learning City, LC 12345</p>
                  </div>
                </div>
              </div>

              {/* Quick Response Info */}
              <div className="mt-8 p-4 bg-code rounded-xl">
                <h4 className="text-text-primary font-semibold text-sm mb-2">Quick Response</h4>
                <p className="text-text-secondary text-sm">
                  We typically respond to all inquiries within 2-4 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-surface-elevated rounded-2xl p-6 border border-border">
              <h3 className="text-text-primary font-semibold mb-4">What to Expect</h3>
              <ul className="text-text-secondary text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                  <span>Personalized course recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                  <span>Detailed program information and syllabus</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                  <span>Pricing and payment options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                  <span>Batch schedules and timing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
                  <span>Career guidance and placement support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;