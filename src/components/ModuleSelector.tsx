
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
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4" />
        Academic Year: {selectedYear} Year
      </h3>
      <div className="space-y-2">
        {modules.map((module) => (
          <div 
            key={module}
            onClick={() => onModuleSelect(module)}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover-scale ${
              selectedModule === module 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="font-medium">{module}</div>
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
