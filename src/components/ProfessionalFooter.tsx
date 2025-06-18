
import React from "react";
import { GraduationCap, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const ProfessionalFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-8 sm:py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                ModuleTracker
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Advanced academic progress tracking platform designed to help students monitor and optimize their educational journey.
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Features</a>
              <a href="#dashboard" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Dashboard</a>
              <a href="#analytics" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Analytics</a>
              <a href="#support" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Academic Support</a>
            </div>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <div className="space-y-2">
              <a href="#help" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Help Center</a>
              <a href="#documentation" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Documentation</a>
              <a href="#tutorials" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">Tutorials</a>
              <a href="#api" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">API Reference</a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">support@moduletracker.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+27 21 460 3779</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Cape Peninsula University</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ModuleTracker. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Powered by</span>
            <a 
              href="https://cput.ac.za" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <span>CPUT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
