// In src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetails';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import FaqQuestions from './pages/FaqQuestions';
 // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faq/questions/:courseId" element={<FaqQuestions />} />  {/* Add this route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;