
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the account creation
    // For now, we'll just redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
            <span className="text-lg md:text-xl font-bold">ModuleTracker</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">Contact</Link>
            <span className="text-blue-400 font-medium">Login</span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm md:hidden z-50">
              <div className="flex flex-col space-y-4 p-6">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors">Home</Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors">About</Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors">Contact</Link>
                <span className="text-blue-400 font-medium">Login</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="grid lg:grid-cols-2">
            {/* Left Panel - Welcome with new image */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 md:p-8 text-white relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Welcome!</h2>
                <p className="text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
                  Track your academic progress and stay on top of your studies with ModuleTracker - designed for 2nd year AppDev students.
                </p>
                <p className="text-blue-200 mb-4 md:mb-6 text-sm md:text-base">
                  Your personalized dashboard is just a signup away.
                </p>

                {/* New illustration */}
                <div className="mt-4 md:mt-6 flex justify-center">
                  <img 
                    src="/lovable-uploads/a19d6003-dcc7-41e0-b09b-a61c5a7dc7a5.png" 
                    alt="Student with academic tools and dashboard" 
                    className="w-full max-w-xs md:max-w-sm h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-6 md:p-8">
              <div className="max-w-sm mx-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">Create Account</h3>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-600 mb-1 block text-sm">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name"
                        className="border-gray-200 focus:border-blue-500 h-9 md:h-10 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-gray-600 mb-1 block text-sm">Surname</Label>
                      <Input 
                        id="surname"
                        placeholder="Enter your surname"
                        className="border-gray-200 focus:border-blue-500 h-9 md:h-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Student Number */}
                  <div>
                    <Label htmlFor="studentNumber" className="text-gray-600 mb-1 block text-sm">CPUT Student Number</Label>
                    <Input 
                      id="studentNumber"
                      placeholder="e.g., 219xxxxx"
                      className="border-gray-200 focus:border-blue-500 h-9 md:h-10 text-sm"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-gray-600 mb-1 block text-sm">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-9 md:h-10 text-sm"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-600 mb-1 block text-sm">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-9 md:h-10 text-sm"
                    />
                  </div>

                  {/* Create Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 md:py-3 rounded-lg font-medium text-sm md:text-base h-10 md:h-11 mt-6"
                  >
                    Create Account
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 mt-4 text-sm">
                    Already have an account?{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                      Login Here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-4">
        <p className="text-gray-400 text-sm">© 2025 ModuleTracker - Nqwana-Tiyani</p>
      </footer>
    </div>
  );
};

export default Signup;
