import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award, BookOpen, Globe, Heart, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Learn from seasoned IT professionals with extensive industry experience.'
    },
    {
      icon: BookOpen,
      title: 'Practical Labs',
      description: 'Hands-on training with real-world projects and state-of-the-art labs.'
    },
    {
      icon: Target,
      title: 'Career Guidance',
      description: 'Personalized career coaching and placement assistance to help you land your dream job.'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Preparation for recognized certifications that boost your career prospects.'
    },
    {
      icon: Globe,
      title: 'Modern Technologies',
      description: 'Stay current with the latest tools and platforms used in the industry.'
    },
    {
      icon: Heart,
      title: 'Student-Focused',
      description: 'Dedicated to your success with personalized attention and support.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Trained' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '50+', label: 'Industry Experts' },
    { number: '15+', label: 'Countries Served' }
  ];

  const whyChooseUs = [
    {
      icon: GraduationCap,
      title: 'Expert Trainers',
      description: 'Learn from seasoned IT professionals with extensive industry experience.'
    },
    {
      icon: Briefcase,
      title: 'Practical Labs',
      description: 'Hands-on training with real-world projects and state-of-the-art labs.'
    },
    {
      icon: Users,
      title: 'Career Guidance',
      description: 'Personalized career coaching and placement assistance to help you land your dream job.'
    }
  ];

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex space-x-2 text-sm text-text-muted mb-8">
          <Link to="/" className="hover:text-text-primary">Home</Link>
          <span>/</span>
          <span className="text-text-primary">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            About <span className="text-primary-300">Sunviva Technologies</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Empowering professionals with practical skills for the modern technology landscape
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-surface-elevated rounded-2xl p-8 md:p-12 border border-border mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-text-secondary text-lg">
                <p>
                  We are an institution focused on delivering high-quality, hands-on training for 
                  <span className="text-primary-300"> Cloud</span>, 
                  <span className="text-secondary-400"> DevOps</span>, 
                  <span className="text-success"> Linux</span>, and 
                  <span className="text-warning"> Scripting</span>.
                </p>
                <p>
                  Our expert trainers bring real-world experience with practical labs and career 
                  guidance to help you upskill and grow in your professional journey.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-primary-300 text-surface px-8 py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-colors text-center"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/contact"
                  className="border border-border text-text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-surface-hover transition-colors text-center"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-surface rounded-xl p-6 text-center border border-border">
                  <div className="text-2xl font-bold text-primary-300 mb-2">{stat.number}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why Choose <span className="text-primary-300">Sunviva Technologies</span>?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Our institute is dedicated to providing top‑tier IT training that prepares you for success in the tech industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-surface-elevated rounded-2xl p-8 border border-border hover:border-primary-300 transition-all duration-300 group text-center">
                <div className="bg-surface rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-300 group-hover:text-surface transition-colors">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4 group-hover:text-primary-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            What Makes Us <span className="text-primary-300">Different</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-surface-elevated rounded-2xl p-6 border border-border hover:border-primary-300 transition-all duration-300 group">
                <div className="bg-surface rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary-300 group-hover:text-surface transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-surface-elevated rounded-2xl p-8 md:p-12 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Our Approach to Learning
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  At Sunviva Technologies, we believe in learning by doing. Our curriculum is designed 
                  around practical, hands-on exercises that simulate real-world scenarios you'll encounter 
                  in your career.
                </p>
                <p>
                  Each course is carefully crafted to balance theoretical knowledge with practical 
                  application, ensuring you gain both understanding and experience that employers value.
                </p>
                <p>
                  Our trainers are not just instructors—they're industry practitioners who bring 
                  current best practices and real-world insights into every session.
                </p>
              </div>
            </div>
            
            <div className="bg-surface rounded-2xl p-6 border border-border">
              <h3 className="text-xl font-semibold text-text-primary mb-4">What We Offer</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Comprehensive course materials and resources</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Hands-on labs and real-world projects</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Expert instructor guidance and mentorship</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Career counseling and certification guidance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Flexible learning options to fit your schedule</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                  <span>Ongoing support even after course completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to Start Your Journey with Sunviva?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who have transformed their careers with our practical, 
            industry-focused training programs at Sunviva Technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-primary-300 text-surface px-8 py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-colors"
            >
              Browse All Courses
            </Link>
            <Link
              to="/contact"
              className="border border-primary-300 text-primary-300 px-8 py-4 rounded-2xl font-semibold hover:bg-primary-300 hover:text-surface transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;