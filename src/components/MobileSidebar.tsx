
import React from "react";
import { X } from "lucide-react";
import ModuleSelector from "@/components/ModuleSelector";
import UserProfile from "@/components/UserProfile";

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedYear: string;
  modules: string[];
  selectedModule: string;
  onModuleSelect: (module: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  selectedYear,
  modules,
  selectedModule,
  onModuleSelect
}) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-auto
        w-80 sm:w-72 lg:w-80 xl:w-72 bg-white/90 backdrop-blur-lg shadow-xl lg:shadow-lg border-r border-slate-200/50 
        min-h-screen p-4 sm:p-6
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:min-h-[calc(100vh-80px)]
        overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent
      `}>
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>
        
        <ModuleSelector
          selectedYear={selectedYear}
          modules={modules}
          selectedModule={selectedModule}
          onModuleSelect={(module) => {
            onModuleSelect(module);
            setSidebarOpen(false);
          }}
        />
        <UserProfile selectedModule={selectedModule} />
      </div>
    </>
  );
};

export default MobileSidebar;
