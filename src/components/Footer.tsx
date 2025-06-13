
import { GraduationCap, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">ModuleTracker</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students to track their academic progress and achieve their goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">021 460 3779</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">info@moduletracker.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 ModuleTracker. All rights reserved. | Powered by Cape Peninsula University of Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
