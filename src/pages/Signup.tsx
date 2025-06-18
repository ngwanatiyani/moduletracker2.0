
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    studentNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields are filled
    if (!formData.firstName || !formData.surname || !formData.studentNumber || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const success = await signup(formData);
    
    if (success) {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Failed to create account. Student number may already exist.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-3 sm:p-4 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
            <span className="text-base sm:text-lg md:text-xl font-bold">ModuleTracker</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">Home</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">About</Link>
            <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">Contact</Link>
            <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm lg:text-base">Login</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm md:hidden z-50">
            <div className="flex flex-col space-y-3 p-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">Home</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">About</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">Contact</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm">Login</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Reduced form size by 40% */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl sm:max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel - Smaller */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 sm:p-6 text-white relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-lg sm:text-xl font-bold mb-3">Welcome!</h2>
                <p className="text-xs sm:text-sm mb-3 leading-relaxed">
                  Track your academic progress with ModuleTracker - designed for 2nd year AppDev students.
                </p>
                <p className="text-blue-200 mb-4 text-xs sm:text-sm">
                  Your dashboard is just a signup away.
                </p>

                {/* Smaller illustration */}
                <div className="mt-2 flex justify-center">
                  <img 
                    src="/lovable-uploads/a19d6003-dcc7-41e0-b09b-a61c5a7dc7a5.png" 
                    alt="Student with academic tools and dashboard" 
                    className="w-full max-w-[120px] sm:max-w-[150px] h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Smaller Form */}
            <div className="p-4 sm:p-6">
              <div className="max-w-xs mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">Create Account</h3>
                
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {/* Name Fields - Smaller */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-600 mb-1 block text-xs">First Name</Label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-gray-600 mb-1 block text-xs">Surname</Label>
                      <Input 
                        id="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        placeholder="Surname"
                        className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Student Number - Smaller */}
                  <div>
                    <Label htmlFor="studentNumber" className="text-gray-600 mb-1 block text-xs">Student Number</Label>
                    <Input 
                      id="studentNumber"
                      value={formData.studentNumber}
                      onChange={handleChange}
                      placeholder="219xxxxx"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      required
                    />
                  </div>

                  {/* Password - Smaller */}
                  <div>
                    <Label htmlFor="password" className="text-gray-600 mb-1 block text-xs">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      required
                    />
                  </div>

                  {/* Confirm Password - Smaller */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-600 mb-1 block text-xs">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      required
                    />
                  </div>

                  {/* Create Button - Smaller */}
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded-lg font-medium text-xs h-8 mt-4"
                  >
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>

                  {/* Login Link - Smaller */}
                  <p className="text-center text-gray-600 mt-3 text-xs">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                      Login Here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Smaller */}
      <footer className="bg-slate-900 text-center py-3">
        <p className="text-gray-400 text-xs">© 2025 ModuleTracker - Professional Academic Platform</p>
      </footer>
    </div>
  );
};

export default Signup;
