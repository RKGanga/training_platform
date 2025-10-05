import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { courseService } from '../services/api';
import CourseGrid from '../components/courses/CourseGrid';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, [searchParams]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchParams.get('category')) params.category = searchParams.get('category');
      if (searchParams.get('level')) params.level = searchParams.get('level');

      const response = await courseService.getAllCourses(params);
      const allCourses = response.data.results || response.data;

      // Filter out AWS courses
      const filteredCourses = allCourses.filter(course =>
        !course.title.toLowerCase().includes('aws') &&
        !course.category?.toLowerCase().includes('aws') &&
        course.title !== 'Amazon Web Services (AWS)'
      );

      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {searchParams.get('category') ? `${searchParams.get('category')} Courses` : 'All Courses'}
          </h1>
          <p className="text-gray-300 text-lg">
            {searchParams.get('category') 
              ? `Browse our ${searchParams.get('category').toLowerCase()} courses` 
              : `Browse all ${courses.length} courses in our catalog`
            }
          </p>
        </div>

        {/* Courses Sections */}
        {!searchParams.get('search') && (
          <div className="space-y-16">
            {/* Cloud Section */}
            {courses.filter(course => course.category === 'Cloud').length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                        </div>
                        Cloud
                      </h2>
                      <p className="text-blue-300/80 text-lg mt-2">
                        Master cloud technologies and deployment strategies
                      </p>
                    </div>
                  </div>
                  <CourseGrid courses={courses.filter(course => course.category === 'Cloud')} loading={loading} />
                </div>
              </div>
            )}

            {/* DevOps Section */}
            {courses.filter(course => course.category === 'DevOps').length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-12 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
                        </div>
                        DevOps
                      </h2>
                      <p className="text-purple-300/80 text-lg mt-2">
                        Automate deployment and streamline development workflows
                      </p>
                    </div>
                  </div>
                  <CourseGrid courses={courses.filter(course => course.category === 'DevOps')} loading={loading} />
                </div>
              </div>
            )}

            {/* Scripting Section */}
            {courses.filter(course => course.category === 'Scriptings').length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                          <div className="w-8 h-8 bg-yellow-500 rounded-lg"></div>
                        </div>
                        Scripting
                      </h2>
                      <p className="text-yellow-300/80 text-lg mt-2">
                        Master automation and scripting languages
                      </p>
                    </div>
                  </div>
                  <CourseGrid courses={courses.filter(course => course.category === 'Scriptings')} loading={loading} />
                </div>
              </div>
            )}

            {/* Operating System Section */}
            {courses.filter(course => course.category === 'Operating System').length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-12 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                          <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                        </div>
                        Operating System
                      </h2>
                      <p className="text-green-300/80 text-lg mt-2">
                        Deep dive into Linux administration and system operations
                      </p>
                    </div>
                  </div>
                  <CourseGrid courses={courses.filter(course => course.category === 'Operating System')} loading={loading} />
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;