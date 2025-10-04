import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => handleNavigation('/')}>
              <GraduationCap className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">
                Sunviva Technologies
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Empowering professionals with industry-focused IT training in Cloud, DevOps, 
              Linux, and Scripting technologies. Transform your career with hands-on learning 
              and expert guidance.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/sunvivatech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/sunvivatech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/sunvivatech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/sunvivatech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <div 
                  onClick={() => handleNavigation('/courses')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>All Courses</span>
                </div>
              </li>
              <li>
                <div 
                  onClick={() => handleNavigation('/courses?category=Cloud')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Cloud Computing</span>
                </div>
              </li>
              <li>
                <div 
                  onClick={() => handleNavigation('/courses?category=DevOps')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>DevOps Training</span>
                </div>
              </li>
              <li>
                <div 
                  onClick={() => handleNavigation('/courses?category=Operating System')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Linux Administration</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <div 
                  onClick={() => handleNavigation('/contact')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Contact Us</span>
                </div>
              </li>
              <li>
                <div 
                  onClick={() => handleNavigation('/faq')}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>FAQ</span>
                </div>
              </li>
              <li>
                <a 
                  href="mailto:hr@sunvivatechnologies.com" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center space-x-1"
                >
                  <Mail className="h-3 w-3" />
                  <span>HR & Admissions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Email</h4>
                  <div className="text-gray-400 text-sm space-y-1">
                    <a 
                      href="mailto:hr@sunvivatechnologies.com" 
                      className="block hover:text-cyan-400 transition-colors"
                    >
                      hr@sunvivatechnologies.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Phone</h4>
                  <a 
                    href="tel:+919550804579" 
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors block"
                  >
                    +91 95508 04579
                  </a>
                  <p className="text-gray-500 text-xs mt-1">Mon-Fri: 9AM-6PM IST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">Office Address</h4>
                  <p className="text-gray-400 text-sm">
                    123 Tech Street<br />
                    Learning City, LC 12345<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-500 text-sm">
              © {currentYear} Sunviva Technologies. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-500 text-sm">
            <span>Empowering IT Professionals</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;