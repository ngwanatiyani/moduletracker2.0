
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [selectedYear, setSelectedYear] = useState("2nd");
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
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full">
          <div className="grid lg:grid-cols-2">
            {/* Left Panel - Welcome with new image */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 text-white relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-3">Welcome!</h2>
                <p className="text-sm mb-2 leading-relaxed">
                  Track your academic progress and stay on top of your studies with ModuleTracker
                </p>
                <p className="text-blue-200 mb-4 text-sm">
                  Your personalized dashboard is just a login away.
                </p>

                {/* New illustration */}
                <div className="mt-4 flex justify-center">
                  <img 
                    src="/lovable-uploads/a19d6003-dcc7-41e0-b09b-a61c5a7dc7a5.png" 
                    alt="Student with academic tools and dashboard" 
                    className="w-full max-w-xs h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-4">
              <div className="max-w-xs mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Create Account</h3>
                
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-600 mb-1 block text-xs">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name"
                        className="border-gray-200 focus:border-blue-500 h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-gray-600 mb-1 block text-xs">Surname</Label>
                      <Input 
                        id="surname"
                        placeholder="Enter your surname"
                        className="border-gray-200 focus:border-blue-500 h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Student Number */}
                  <div>
                    <Label htmlFor="studentNumber" className="text-gray-600 mb-1 block text-xs">CPUT Student Number</Label>
                    <Input 
                      id="studentNumber"
                      placeholder="e.g., 219xxxxx"
                      className="border-gray-200 focus:border-blue-500 h-8 text-sm"
                    />
                  </div>

                  {/* Year of Study */}
                  <div>
                    <Label className="text-gray-600 mb-1 block text-xs">Year of Study</Label>
                    <div className="flex space-x-1">
                      {["1st", "2nd", "3rd"].map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => setSelectedYear(year)}
                          className={`flex-1 py-1.5 px-2 rounded-md border font-medium transition-colors text-xs ${
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
                    <Label htmlFor="password" className="text-gray-600 mb-1 block text-xs">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-sm"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-600 mb-1 block text-xs">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-sm"
                    />
                  </div>

                  {/* Create Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded-lg font-medium text-sm h-8"
                  >
                    Create
                  </Button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 mt-3 text-xs">
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
