import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/api';
import { ArrowLeft, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

const FaqQuestions = () => {
  const { courseId } = useParams();
  const [faqs, setFaqs] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading FAQs for course:', courseId);
      
      // Load course details
      try {
        const courseResponse = await courseService.getCourse(courseId);
        setCourse(courseResponse.data);
        console.log('✅ Course loaded:', courseResponse.data);
      } catch (courseError) {
        console.warn('⚠️ Could not load course details:', courseError);
      }
      
      // Load FAQs for this course
      console.log('🔄 Fetching FAQs from API...');
      const faqsResponse = await courseService.getCourseFAQs(courseId);
      console.log('📡 FAQs API Response:', faqsResponse);
      
      // Handle response data
      let faqsData = [];
      
      if (faqsResponse.data) {
        // Try different response formats
        if (faqsResponse.data.faqs && Array.isArray(faqsResponse.data.faqs)) {
          faqsData = faqsResponse.data.faqs;
        } else if (Array.isArray(faqsResponse.data)) {
          faqsData = faqsResponse.data;
        } else if (faqsResponse.data.results && Array.isArray(faqsResponse.data.results)) {
          faqsData = faqsResponse.data.results;
        }
      }
      
      setFaqs(faqsData);
      console.log('✅ FAQs data loaded:', faqsData);

      // Expand first FAQ by default if there are FAQs
      if (faqsData.length > 0) {
        setExpandedFaqs(new Set([faqsData[0].id]));
      }
      
    } catch (error) {
      console.error('❌ Error loading FAQs:', error);
      
      let errorMessage = 'Failed to load FAQs. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          errorMessage = 'FAQ endpoint not found (404). Please check the API URL.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error (500). Please check the Django console.';
        } else {
          errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
        }
        
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Is the Django server running?';
        console.error('No response received');
      } else {
        // Something else happened
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFAQs();
  }, [courseId]);

  const toggleFaq = (faqId) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFaqs(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-800 rounded w-1/2 mb-8"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-cyan-400">Home</Link>
            <span>/</span>
            <Link to="/faq" className="hover:text-cyan-400">FAQ</Link>
            <span>/</span>
            <span className="text-cyan-400">Error</span>
          </nav>
          
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-500 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-red-400 mb-4">
                Error Loading FAQs
              </h3>
              <p className="text-gray-400 mb-6">{error}</p>
              
              <div className="space-y-4">
                <button
                  onClick={loadFAQs}
                  className="inline-flex items-center space-x-2 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
                
                <div>
                  <Link
                    to="/faq"
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to FAQ Page</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Debug Information */}
            <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Debug Information</h4>
              <div className="text-left text-sm text-gray-400 space-y-2">
                <p><strong>Course ID:</strong> {courseId}</p>
                <p><strong>Correct API Endpoint:</strong> http://localhost:8000/api/courses/courses/{courseId}/faqs/</p>
                <p><strong>Course Data:</strong> {course ? 'Loaded' : 'Not loaded'}</p>
                <p><strong>FAQs Count:</strong> {faqs.length}</p>
                
                <div className="mt-4 p-4 bg-gray-900 rounded">
                  <p><strong>Testing Steps:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>Open: <a href={`http://localhost:8000/api/courses/courses/${courseId}/faqs/`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Test API Endpoint</a></li>
                    <li>Check if it returns JSON data</li>
                    <li>Verify Django server is running</li>
                    <li>Check browser Network tab for the API call</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <span>/</span>
          <Link to="/faq" className="hover:text-cyan-400">FAQ</Link>
          <span>/</span>
          <span className="text-cyan-400">
            {course?.title || `Course ${courseId}`}
          </span>
        </nav>

        {/* Back Button */}
        <Link
          to="/faq"
          className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Courses</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {course?.title || `Course ${courseId}`} - FAQs
          </h1>
          <p className="text-gray-300 text-lg">
            Frequently asked questions about this course
          </p>
          {faqs.length > 0 && (
            <p className="text-cyan-400 text-sm mt-2">
              {faqs.length} question{faqs.length !== 1 ? 's' : ''} available
            </p>
          )}
        </div>

        {/* FAQs List */}
        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                No FAQs Available Yet
              </h3>
              <p className="text-gray-400 mb-4">
                There are no frequently asked questions for this course yet.
              </p>
              <p className="text-gray-500 text-sm">
                FAQs will appear here once they are added to the system.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-500 transition-colors">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-750 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold">Q{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  {expandedFaqs.has(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaqs.has(faq.id) && (
                  <div className="p-6 bg-gray-750 border-t border-gray-600">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-semibold">A</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqQuestions;