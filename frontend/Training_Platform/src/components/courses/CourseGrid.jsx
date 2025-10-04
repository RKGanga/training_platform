import React from 'react';
import CourseCard from './CourseCard';
import CourseListItem from './CourseListItem';

const CourseGrid = ({ courses, loading, viewMode = 'grid' }) => {
  if (loading) {
    return (
      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "space-y-4"
      }>
        {[...Array(6)].map((_, i) => (
          viewMode === 'grid' ? (
            <div key={i} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ) : (
            <div key={i} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="h-6 bg-gray-700 rounded w-1/4 mb-3"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                    <div className="h-4 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          )
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No courses found</div>
        <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;