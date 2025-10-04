import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CourseListItem = ({ course }) => {
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

  const categoryBg = getCategoryBg(course.category);
  

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-cyan-500 transition-all duration-300 cursor-pointer group">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-3 py-1 rounded ${categoryBg}`}>
              {course.category}
            </span>
            {course.featured && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-cyan-500/20 text-cyan-500">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {course.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            {course.short_description || course.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/courses/${course.id}`}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;