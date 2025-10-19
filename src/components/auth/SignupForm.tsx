import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const signupSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .regex(/^[A-Za-z]+$/, "First name must contain only alphabetic characters"),
  surname: z.string()
    .trim()
    .min(1, "Surname is required")
    .regex(/^[A-Za-z]+$/, "Surname must contain only alphabetic characters"),
  studentNumber: z.string()
    .trim()
    .length(9, "Student number must be exactly 9 digits")
    .regex(/^\d{9}$/, "Student number must contain only numbers"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      studentNumber: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const signupData = {
      firstName: data.firstName,
      surname: data.surname,
      studentNumber: data.studentNumber,
      password: data.password,
      confirmPassword: data.confirmPassword
    };
    
    const success = await signup(signupData);
    
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
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-xs mx-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">Create Account</h3>
        
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name Fields - Smaller */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName" className="text-gray-600 mb-1 block text-xs">First Name</Label>
                    <FormControl>
                      <Input 
                        id="firstName"
                        placeholder="First name"
                        className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="surname" className="text-gray-600 mb-1 block text-xs">Surname</Label>
                    <FormControl>
                      <Input 
                        id="surname"
                        placeholder="Surname"
                        className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Student Number - Smaller */}
            <FormField
              control={form.control}
              name="studentNumber"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="studentNumber" className="text-gray-600 mb-1 block text-xs">Student Number</Label>
                  <FormControl>
                    <Input 
                      id="studentNumber"
                      placeholder="219xxxxx"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Password - Smaller */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password" className="text-gray-600 mb-1 block text-xs">Password</Label>
                  <FormControl>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password - Smaller */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirmPassword" className="text-gray-600 mb-1 block text-xs">Confirm Password</Label>
                  <FormControl>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••••"
                      className="border-gray-200 focus:border-blue-500 h-8 text-xs w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Create Button - Smaller */}
            <Button 
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded-lg font-medium text-xs h-8 mt-4"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Account"}
            </Button>

            {/* Login Link - Smaller */}
            <p className="text-center text-gray-600 mt-3 text-xs">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                Login Here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
