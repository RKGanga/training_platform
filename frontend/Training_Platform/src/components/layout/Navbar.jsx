import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlignJustify, X, GraduationCap, ChevronRight } from 'lucide-react';
import { courseService } from '../../services/api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await courseService.getAllCourses();
        console.log('Full API response:', response);
        console.log('Response data:', response.data);
        
        const allCourses = response.data.results || response.data;
        console.log('All courses:', allCourses);
        
        // Check if courses have the right structure
        if (allCourses && allCourses.length > 0) {
          console.log('First course sample:', allCourses[0]);
          console.log('First course category:', allCourses[0].category);
        }
        
        setCourses(allCourses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // FIXED: Group courses by category with proper mapping
  const groupCoursesByCategory = () => {
    const categories = {
      'Cloud': [],
      'DevOps': [],
      'Scriptings': [], // Fixed: Changed from 'Scripting' to 'Scriptings'
      'Operating System': []
    };

    console.log('Grouping courses:', courses);

    courses.forEach(course => {
      console.log('Processing course:', course.title, 'Category:', course.category);
      
      // Direct mapping based on your actual category names
      if (course.category === 'Scriptings') {
        categories['Scriptings'].push(course);
      }
      else if (course.category === 'Cloud') {
        categories['Cloud'].push(course);
      }
      else if (course.category === 'DevOps') {
        categories['DevOps'].push(course);
      }
      else if (course.category === 'Operating System') {
        categories['Operating System'].push(course);
      }
      else {
        console.log('Unmapped category:', course.category, 'for course:', course.title);
        // Fallback: Add to appropriate category based on title or other logic
        if (course.title.toLowerCase().includes('python') || course.title.toLowerCase().includes('shell') || course.title.toLowerCase().includes('bash')) {
          categories['Scriptings'].push(course);
        }
      }
    });

    console.log('Final categories:', categories);
    return categories;
  };

  const categories = groupCoursesByCategory();

  // Map display categories back to API categories for navigation
  const getApiCategory = (displayCategory) => {
    const categoryMap = {
      'Scriptings': 'Scriptings', // Fixed: Use same key
      'Cloud': 'Cloud',
      'DevOps': 'DevOps', 
      'Operating System': 'Operating System'
    };
    return categoryMap[displayCategory] || displayCategory;
  };

  // Get category display name (for UI)
  const getDisplayCategory = (apiCategory) => {
    const displayMap = {
      'Scriptings': 'Scripting', // Show as "Scripting" in UI but use "Scriptings" for API
      'Cloud': 'Cloud',
      'DevOps': 'DevOps',
      'Operating System': 'Operating System'
    };
    return displayMap[apiCategory] || apiCategory;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCoursesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCoursesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCoursesOpen(false);
    }, 200);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
    setIsCoursesOpen(false);
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (displayCategory) => {
    const apiCategory = getApiCategory(displayCategory);
    navigate(`/courses?category=${encodeURIComponent(apiCategory)}`);
    setIsCoursesOpen(false);
    setIsMenuOpen(false);
  };

  // Clicking "Courses" navigates to courses page
  const handleCoursesClick = () => {
    navigate('/courses');
    setIsMenuOpen(false);
  };

  // Get category color for UI
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cloud':
        return 'text-blue-400';
      case 'DevOps':
        return 'text-purple-400';
      case 'Scriptings':
        return 'text-yellow-400';
      case 'Operating System':
        return 'text-green-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">
              Sunviva Technologies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            
            {/* Courses Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleCoursesClick}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === '/courses' || isCoursesOpen
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                <span>Courses</span>
                <ChevronRight className={`h-4 w-4 transform transition-transform ${isCoursesOpen ? 'rotate-90' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isCoursesOpen && (
                <div className="absolute top-full mt-2 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                     style={{
                       left: '1%',
                       transform: 'translateX(-60%)',
                       width: 'max-content',
                       maxWidth: '75vw'
                     }}>
                  <div className="p-8">
                    <div className="grid grid-cols-4 gap-8" style={{ minWidth: '800px' }}>
                      {/* Cloud Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <h3 className="text-lg font-bold text-blue-400">Cloud</h3>
                        </div>
                        <div className="space-y-2">
                          {categories['Cloud']?.filter(course =>
                            !course.title.toLowerCase().includes('aws') &&
                            course.title !== 'Amazon Web Services (AWS)'
                          ).map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="block w-full text-left text-gray-300 hover:text-blue-400 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-blue-500/10"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">{course.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* DevOps Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <h3 className="text-lg font-bold text-purple-400">DevOps</h3>
                        </div>
                        <div className="space-y-2">
                          {categories['DevOps']?.filter(course =>
                            !course.title.toLowerCase().includes('aws') &&
                            course.title !== 'Amazon Web Services (AWS)'
                          ).map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="block w-full text-left text-gray-300 hover:text-purple-400 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-purple-500/10"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">{course.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Scriptings Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <h3 className="text-lg font-bold text-yellow-400">Scripting</h3>
                        </div>
                        <div className="space-y-2">
                          {categories['Scriptings']?.filter(course =>
                            !course.title.toLowerCase().includes('aws') &&
                            course.title !== 'Amazon Web Services (AWS)'
                          ).map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="block w-full text-left text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-yellow-500/10"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">{course.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Operating System Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <h3 className="text-lg font-bold text-green-400">Operating System</h3>
                        </div>
                        <div className="space-y-2">
                          {categories['Operating System']?.filter(course =>
                            !course.title.toLowerCase().includes('aws') &&
                            course.title !== 'Amazon Web Services (AWS)'
                          ).map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="block w-full text-left text-gray-300 hover:text-green-400 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-green-500/10"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">{course.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Section
                    <div className="mt-8 pt-6 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm">
                          Browse all courses by category
                        </div>
                        <button
                          onClick={handleCoursesClick}
                          className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                          View All Courses
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Items */}
            {['FAQ', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item}
              </Link>
            ))}

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/contact"
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-colors"
              >
                Enroll Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-cyan-400"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;