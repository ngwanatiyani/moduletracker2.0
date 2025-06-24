
import React from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ModuleDropdownProps {
  modules: string[];
  selectedModule: string;
  onModuleSelect: (module: string) => void;
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({
  modules,
  selectedModule,
  onModuleSelect
}) => {
  const getModuleDisplay = (module: string) => {
    const parts = module.split('(');
    return {
      name: parts[0].trim(),
      code: parts[1]?.replace(')', '') || ''
    };
  };

  const selectedDisplay = getModuleDisplay(selectedModule);

  return (
    <div className="w-full max-w-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto p-4 bg-white/95 backdrop-blur-sm border border-slate-200/50 hover:bg-slate-50 text-left"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 truncate text-sm">
                  {selectedDisplay.name}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {selectedDisplay.code}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg"
          align="start"
        >
          {modules.map((module) => {
            const display = getModuleDisplay(module);
            return (
              <DropdownMenuItem
                key={module}
                onClick={() => onModuleSelect(module)}
                className={`p-3 cursor-pointer ${
                  selectedModule === module 
                    ? 'bg-orange-50 text-orange-900' 
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-full">
                  <div className="font-medium text-sm truncate">
                    {display.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate mt-1">
                    {display.code}
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ModuleDropdown;
