
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignupForm = () => {
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
  );
};

export default SignupForm;
