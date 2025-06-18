
const SignupHero = () => {
  return (
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
  );
};

export default SignupHero;
