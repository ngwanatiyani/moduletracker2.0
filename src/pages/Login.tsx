
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!studentNumber || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const success = await login(studentNumber, password);
    
    if (success) {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid student number or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
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
            <Link to="/signup" className="hover:text-yellow-400 transition-colors">Sign Up</Link>
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
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
          <div className="grid lg:grid-cols-2">
            {/* Left Panel - Welcome */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-3 text-white relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-base font-bold mb-2">Welcome Back!</h2>
                <p className="text-xs mb-2 leading-relaxed">
                  Sign in to access your ModuleTracker dashboard and continue tracking your academic progress.
                </p>
                <p className="text-blue-200 mb-3 text-xs">
                  Your academic journey continues here.
                </p>

                <div className="mt-2 flex justify-center">
                  <img 
                    src="/lovable-uploads/a19d6003-dcc7-41e0-b09b-a61c5a7dc7a5.png" 
                    alt="Student with academic tools and dashboard" 
                    className="w-full max-w-[140px] h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-3">
              <div className="max-w-[200px] mx-auto">
                <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Sign In</h3>
                
                <form className="space-y-2" onSubmit={handleSubmit}>
                  {/* Student Number */}
                  <div>
                    <Label htmlFor="studentNumber" className="text-gray-600 mb-0.5 block text-xs">Student Number</Label>
                    <Input 
                      id="studentNumber"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      placeholder="219xxxxx"
                      className="border-gray-200 focus:border-blue-500 h-7 text-xs"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-gray-600 mb-0.5 block text-xs">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-7 text-xs"
                      required
                    />
                  </div>

                  {/* Login Button */}
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1 rounded-lg font-medium text-xs h-7 mt-3"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>

                  {/* Sign Up Link */}
                  <p className="text-center text-gray-600 mt-2 text-xs">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                      Sign Up Here
                    </Link>
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

export default Login;
