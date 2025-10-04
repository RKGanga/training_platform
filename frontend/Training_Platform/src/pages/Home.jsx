import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import { 
  Play, BookOpen, Award, Terminal, ArrowRight, User, Star, Users, Calendar,
  Shield, Cloud, Server, Cpu, Database, Zap, ChevronRight
} from 'lucide-react';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        const allCoursesData = response.data.results || response.data;
        setAllCourses(allCoursesData);
        
        const limitedCourses = allCoursesData.slice(0, 6);
        setFeaturedCourses(limitedCourses);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const categories = [
    
    {
      name: 'Cloud',
      icon: Cloud,
      description: 'Learn GCP, Azure, and AWS cloud platforms',
      color: 'text-blue-500'
    },
    {
      name: 'DevOps',
      icon: Server,
      description: 'Automate with Docker, Kubernetes, Terraform',
      color: 'text-purple-500'
    },
    {
      name: 'Scriptings',
      icon: Zap,
      description: 'Bash, Python, PowerShell scripting mastery',
      color: 'text-yellow-500'
    },
    {
      name: 'Operating System',
      icon: Terminal,
      description: 'Master Linux administration and system operations',
      color: 'text-green-500'
    }
  ];

  const whyChooseUs = [
    {
      icon: Calendar,
      title: 'Flexible Learning',
      description: 'Learn at your own pace with flexible scheduling options that fit your busy lifestyle.'
    },
    {
      icon: User,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience.'
    },
    {
      icon: Database,
      title: 'Industry Curriculum',
      description: 'Courses updated to match current industry demands and technologies.'
    }
  ];

  const trainerStats = [
    { label: 'Certifications', value: '12+', icon: Award },
    { label: 'Success Rate', value: '98%', icon: Star },
    { label: 'Years Experience', value: '15+', icon: Calendar },
    { label: 'Support', value: '24/7', icon: Users }
  ];

  const skills = [
    { name: 'AWS', level: 95, icon: Cloud },
    { name: 'Kubernetes', level: 90, icon: Cpu },
    { name: 'Docker', level: 92, icon: Database },
    { name: 'Terraform', level: 88, icon: Server },
    { name: 'Linux', level: 96, icon: Terminal },
    { name: 'Python', level: 85, icon: Zap }
  ];

  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '50+', label: 'Corporate Clients' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Master Cloud - <span className="text-cyan-400">Transform your career</span> with elite training
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Advance your career with practical, industry-focused training in cloud technologies, 
              DevOps practices, and Linux system administration.
            </p>
            <Link
              to="/courses"
              className="bg-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-600 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/courses?category=${category.name}`}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-cyan-500 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className={`${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-cyan-400 text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose <span className="text-cyan-400">Sunviva Technologies</span>?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our institute is dedicated to providing top‑tier IT training that prepares you for success in the tech industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="bg-gray-900 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn from Industry Expert */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 to-purple-600/3"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-4">
              <Star className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-cyan-400 font-medium text-sm">Industry Expert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn from Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Expert</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Get trained by a professional with real-world experience and proven track record.
            </p>
          </div>

          {/* Compact Profile Dashboard */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30">
            {/* Header with Profile & Stats */}
            <div className="bg-gradient-to-r from-cyan-600/90 to-purple-700/90 p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 animate-pulse"></div>
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-3 border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-xl">
                      <User className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-gray-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-1">Srinivas</h1>
                    <p className="text-gray-200 text-base">Senior Cloud & DevOps Architect</p>
                    <p className="text-gray-300 text-sm">15+ years experience</p>
                  </div>
                </div>

                {/* Compact Stats */}
                <div className="flex space-x-4">
                  {trainerStats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-gray-300 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-700/50 bg-gray-800/50">
              <div className="flex space-x-6 px-6">
                {['Experience', 'Skills', 'Certifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`py-3 font-semibold border-b-2 transition-all duration-300 text-sm ${
                      activeTab === tab.toLowerCase()
                        ? 'text-cyan-400 border-cyan-400'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Tab Content */}
            <div className="p-6">
              {activeTab === 'experience' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white mb-3">Training Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      '15+ years IT training experience',
                      'Corporate trainer for diverse industries',
                      'Proven educational methodologies',
                      'Technology integration expertise'
                    ].map((experience, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{experience}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Technical Expertise</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <skill.icon className="w-4 h-4 text-cyan-400" />
                            <span className="font-medium text-white text-sm">{skill.name}</span>
                          </div>
                          <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-600/50 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Professional Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'AWS Solutions Architect Pro',
                      'Google Cloud Architect',
                      'Kubernetes Administrator',
                      'Terraform Associate',
                      'Docker Certified',
                      'Linux Professional',
                      'Azure Solutions Expert',
                      'Red Hat Certified'
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-xs">
                        <Award className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Compact Mission Section */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 mt-8 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-gray-300 text-sm">
                  Delivering high-quality training in <span className="text-cyan-400">Cloud</span>,
                  <span className="text-purple-400"> DevOps</span>, <span className="text-green-400">Linux</span>, and
                  <span className="text-yellow-400"> Scripting</span> with real-world expertise.
                </p>
              </div>

              <div className="flex space-x-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl p-4 text-center border border-gray-700/50 min-w-[100px]">
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{stat.number}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900 rounded-3xl p-12 border border-gray-700 hover:shadow-lg hover:shadow-cyan-500/10 transition-shadow">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of professionals who have transformed their careers with our elite training programs.
            </p>
            <Link
              to="/courses"
              className="bg-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-600 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore All Courses</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;