
import SignupNavigation from "@/components/auth/SignupNavigation";
import SignupHero from "@/components/auth/SignupHero";
import SignupForm from "@/components/auth/SignupForm";
import SignupFooter from "@/components/auth/SignupFooter";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <SignupNavigation />

      {/* Main Content - Reduced form size by 40% */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl sm:max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <SignupHero />
            <SignupForm />
          </div>
        </div>
      </div>

      <SignupFooter />
    </div>
  );
};

export default Signup;
