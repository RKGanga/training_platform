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

      setCourses(allCourses);
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
          <div className="space-y-12">
            {/* Cloud Section */}
            {courses.filter(course => course.category === 'Cloud').length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  Cloud
                </h2>
                <CourseGrid courses={courses.filter(course => course.category === 'Cloud')} loading={loading} />
              </div>
            )}

            {/* DevOps Section */}
            {courses.filter(course => course.category === 'DevOps').length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                  DevOps
                </h2>
                <CourseGrid courses={courses.filter(course => course.category === 'DevOps')} loading={loading} />
              </div>
            )}

            {/* Scripting Section */}
            {courses.filter(course => course.category === 'Scriptings').length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                  Scripting
                </h2>
                <CourseGrid courses={courses.filter(course => course.category === 'Scriptings')} loading={loading} />
              </div>
            )}

            {/* Operating System Section */}
            {courses.filter(course => course.category === 'Operating System').length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  Operating System
                </h2>
                <CourseGrid courses={courses.filter(course => course.category === 'Operating System')} loading={loading} />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;