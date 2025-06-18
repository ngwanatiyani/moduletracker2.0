
import React from "react";
import { BookOpen } from "lucide-react";

interface ModuleSelectorProps {
  selectedYear: string;
  modules: string[];
  selectedModule: string;
  onModuleSelect: (module: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  selectedYear,
  modules,
  selectedModule,
  onModuleSelect
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
        <BookOpen className="w-4 h-4 flex-shrink-0" />
        Academic Year: {selectedYear} Year
      </h3>
      <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {modules.map((module) => (
          <div 
            key={module}
            onClick={() => onModuleSelect(module)}
            className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 hover-scale text-xs sm:text-sm break-words ${
              selectedModule === module 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="font-medium leading-tight">{module}</div>
            {selectedModule === module && (
              <div className="text-xs mt-1 opacity-90">Currently Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleSelector;
