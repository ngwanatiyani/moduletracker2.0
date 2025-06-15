
import React from "react";
import { Award } from "lucide-react";

interface UserProfileProps {
  selectedModule: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ selectedModule }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 mt-8 border border-blue-100">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold">T</span>
        </div>
        <div>
          <div className="font-semibold text-gray-800">Ngwana Tiyani</div>
          <div className="text-sm text-gray-600">Student No: 24839292</div>
        </div>
      </div>
      <div className="text-blue-600 text-sm font-medium flex items-center gap-1">
        <Award className="w-3 h-3" />
        {selectedModule}
      </div>
    </div>
  );
};

export default UserProfile;
