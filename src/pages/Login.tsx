import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  studentNumber: z.string()
    .trim()
    .length(9, "Student number must be exactly 9 digits")
    .regex(/^\d{9}$/, "Student number must contain only numbers"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      studentNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.studentNumber, data.password);
    
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
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4 relative z-50">
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
        </div>

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
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel - Welcome */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 md:p-8 text-white relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-sm md:text-base mb-4 leading-relaxed">
                  Sign in to access your ModuleTracker dashboard and continue tracking your academic progress.
                </p>
                <p className="text-blue-200 mb-6 text-sm md:text-base">
                  Your academic journey continues here.
                </p>

                <div className="mt-4 flex justify-center">
                  <img 
                    src="/lovable-uploads/a19d6003-dcc7-41e0-b09b-a61c5a7dc7a5.png" 
                    alt="Student with academic tools and dashboard" 
                    className="w-full max-w-[200px] md:max-w-[250px] h-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="p-6 md:p-8">
              <div className="max-w-sm mx-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Sign In</h3>
                
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Student Number */}
                    <FormField
                      control={form.control}
                      name="studentNumber"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="studentNumber" className="text-gray-600 mb-2 block text-sm">Student Number</Label>
                          <FormControl>
                            <Input 
                              id="studentNumber"
                              placeholder="219xxxxx"
                              className="border-gray-200 focus:border-blue-500 h-10 text-sm w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="password" className="text-gray-600 mb-2 block text-sm">Password</Label>
                          <FormControl>
                            <Input 
                              id="password"
                              type="password"
                              placeholder="••••••••••"
                              className="border-gray-200 focus:border-blue-500 h-10 text-sm w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Login Button */}
                    <Button 
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium text-sm h-10 mt-6"
                    >
                      {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-4 text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                        Sign Up Here
                      </Link>
                    </p>
                  </form>
                </Form>
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
