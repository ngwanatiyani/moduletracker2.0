
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [selectedYear, setSelectedYear] = useState("2nd");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">ModuleTracker</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors">Contact</Link>
            <span className="text-blue-400 font-medium">Login</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
          <div className="grid lg:grid-cols-2">
            {/* Left Panel - Welcome */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-20 right-16 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-32 left-8 w-4 h-4 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-16 right-12 w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="absolute top-1/3 right-8 w-8 h-8 bg-blue-600 rounded-full opacity-70"></div>
              <div className="absolute bottom-1/3 left-12 w-12 h-12 bg-indigo-600 rounded-full opacity-50"></div>

              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">Welcome!</h2>
                <p className="text-lg mb-4 leading-relaxed">
                  Track your academic progress and stay on top of your studies with ModuleTracker
                </p>
                <p className="text-blue-200 mb-8">
                  Your personalized dashboard is just a login away.
                </p>

                {/* Illustration */}
                <div className="mt-8 relative">
                  <div className="bg-yellow-400 w-16 h-12 rounded-lg absolute bottom-8 left-4 transform rotate-12"></div>
                  <div className="bg-orange-500 w-12 h-8 rounded absolute bottom-12 left-8 transform -rotate-6"></div>
                  <div className="bg-blue-500 w-8 h-8 rounded absolute bottom-6 left-12"></div>
                  <div className="bg-red-500 w-24 h-16 rounded-lg absolute bottom-4 right-8 transform rotate-6"></div>
                  
                  {/* Character illustration placeholder */}
                  <div className="w-20 h-24 bg-orange-400 rounded-t-full absolute bottom-0 right-16"></div>
                  <div className="w-16 h-8 bg-orange-600 rounded absolute bottom-0 right-18"></div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-8">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Create Account</h3>
                
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-600 mb-2 block">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name"
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-gray-600 mb-2 block">Surname</Label>
                      <Input 
                        id="surname"
                        placeholder="Enter your surname"
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Student Number */}
                  <div>
                    <Label htmlFor="studentNumber" className="text-gray-600 mb-2 block">CPUT Student Number</Label>
                    <Input 
                      id="studentNumber"
                      placeholder="e.g., 219xxxxx"
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Year of Study */}
                  <div>
                    <Label className="text-gray-600 mb-3 block">Year of Study</Label>
                    <div className="flex space-x-2">
                      {["1st", "2nd", "3rd"].map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => setSelectedYear(year)}
                          className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
                            selectedYear === year
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {year} Year
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-gray-600 mb-2 block">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-600 mb-2 block">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Create Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium text-lg"
                  >
                    Create
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 mt-6">
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
        <p className="text-gray-400">© 2025 ModuleTracker - Nqwana-Tiyani</p>
      </footer>
    </div>
  );
};

export default Signup;
