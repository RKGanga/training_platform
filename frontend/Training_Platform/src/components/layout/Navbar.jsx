import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

              {/* Dropdown Menu */}
              {isCoursesOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">All Courses</h3>
                    
                    {loading ? (
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : courses.length === 0 ? (
                      <div className="text-gray-400 text-sm text-center py-4">No courses available</div>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        {/* Render each category */}
                        {Object.entries(categories).map(([category, categoryCourses]) => (
                          categoryCourses.length > 0 && (
                            <div key={category} className="mb-4 last:mb-0">
                              <button
                                onClick={() => handleCategoryClick(category)}
                                className="w-full text-left mb-2"
                              >
                                <h4 className={`text-sm font-semibold ${getCategoryColor(category)} hover:opacity-80 transition-opacity uppercase tracking-wide`}>
                                  {getDisplayCategory(category)}
                                </h4>
                              </button>
                              <div className="space-y-1">
                                {categoryCourses.map((course) => (
                                  <button
                                    key={course.id}
                                    onClick={() => handleCourseClick(course.id)}
                                    className="block w-full text-left text-gray-300 hover:text-cyan-400 px-2 py-1 text-sm transition-colors rounded hover:bg-gray-700/50"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="truncate">{course.title}</span>
                                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                        
                        {/* View All Courses Button */}
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <button
                            onClick={handleCoursesClick}
                            className="w-full text-center text-cyan-400 hover:text-cyan-300 font-medium text-sm py-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
                          >
                            View All Courses →
                          </button>
                        </div>
                      </div>
                    )}
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
          </div>

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
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;