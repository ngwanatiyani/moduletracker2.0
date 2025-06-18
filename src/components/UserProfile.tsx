
import React from "react";
import { Award, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  selectedModule: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ selectedModule }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-3 md:p-4 mt-6 md:mt-8 border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm md:text-base">
              {user?.firstName?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-800 text-sm md:text-base">
              {user?.firstName} {user?.surname}
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              Student No: {user?.studentNumber}
            </div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-red-500 p-1 md:p-2"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-blue-600 text-xs md:text-sm font-medium flex items-center gap-1">
        <Award className="w-3 h-3" />
        <span className="leading-tight">{selectedModule}</span>
      </div>
    </div>
  );
};

export default UserProfile;
