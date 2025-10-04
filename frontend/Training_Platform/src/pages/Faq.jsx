import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseService } from '../services/api';
import { Clock, BarChart3, ArrowRight } from 'lucide-react';

const Faq = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await courseService.getAllCourses();
        const allCourses = response.data.results || response.data;
        setCourses(allCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Operating System':
        return 'bg-green-500/20 text-green-500';
      case 'Cloud':
        return 'bg-blue-500/20 text-blue-500';
      case 'DevOps':
        return 'bg-purple-500/20 text-purple-500';
      case 'Scriptings':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getLevelBg = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-500';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Advanced':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const handleViewQuestions = (courseId, courseTitle) => {
    navigate(`/faq/questions/${courseId}`, { 
      state: { courseTitle } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">FAQ</span>
        </nav>

        {/* Courses Section */}
        <section>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Course FAQs
            </h1>
            <p className="text-gray-300 text-lg">
              Select a course to view frequently asked questions and answers
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
                  <div className="mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded ${getCategoryBg(course.category)}`}>
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                    {course.short_description || course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <BarChart3 size={16} />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getLevelBg(course.level)}`}>
                        {course.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
                        {course.mode || 'Online'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleViewQuestions(course.id, course.title)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      View Questions
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Faq;