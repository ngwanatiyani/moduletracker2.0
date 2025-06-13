
import { useState } from "react";
import { GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedYear] = useState("1st"); // This would come from user's account data
  
  const getModulesForYear = (year: string) => {
    const baseModules = [
      "Application Development",
      "Business Practice", 
      "Communications Networks",
      "ICT Fundamentals",
      "Multimedia Foundations",
      "Professional Communications",
      "Programming",
      "Project"
    ];
    
    return baseModules.map(module => `${module} ${year.charAt(0)}`);
  };

  const modules = getModulesForYear(selectedYear);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">ModuleTracker</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <span className="text-blue-400 font-medium">Dashboard</span>
            <span className="hover:text-yellow-400 transition-colors cursor-pointer">Logout</span>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 min-h-[calc(100vh-80px)] p-4">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Academic Year: {selectedYear} Year</h3>
            <div className="space-y-2">
              {modules.map((module, index) => (
                <div 
                  key={module}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    index === 0 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {module}
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white rounded-lg p-4 mt-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <div className="font-semibold">Ngwana Tiyani</div>
                <div className="text-sm text-gray-600">Student No: 24839292</div>
              </div>
            </div>
            <div className="text-blue-500 text-sm">Application Development</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Module Overview Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Application Development 1</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold">68%</div>
                </div>
              </div>
              <CardDescription>Overall Progress: 68% | Status: Passing</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={68} className="h-6 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </Progress>
            </CardContent>
          </Card>

          {/* Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Term 1 */}
            <Card>
              <CardHeader>
                <CardTitle>Term 1</CardTitle>
                <CardDescription>Weight: 30%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Term 1:</span>
                  <span>75% (weight: 15%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Assignment 1:</span>
                  <span>68% (weight: 10%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Project:</span>
                  <span>72% (weight: 5%)</span>
                </div>
                <hr />
                <div className="text-yellow-600 font-medium">Term Average: 72%</div>
                <div>Status: Passing</div>
                <Button variant="link" className="text-blue-500 p-0">+ Add Assessment</Button>
              </CardContent>
            </Card>

            {/* Term 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Term 2</CardTitle>
                <CardDescription>Weight: 30%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Term 2:</span>
                  <span>65% (weight: 15%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Assignment 2:</span>
                  <span>70% (weight: 10%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Quiz:</span>
                  <span>58% (weight: 5%)</span>
                </div>
                <hr />
                <div className="text-yellow-600 font-medium">Term Average: 66%</div>
                <div>Status: Passing</div>
                <Button variant="link" className="text-blue-500 p-0">+ Add Assessment</Button>
              </CardContent>
            </Card>

            {/* Term 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Term 3</CardTitle>
                <CardDescription>Weight: 15%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Term 3 exam:</span>
                  <span>Pending (weight: 10%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Project:</span>
                  <span>Pending (weight: 5%)</span>
                </div>
                <hr />
                <div className="text-gray-500 font-medium">Term Average: Not Available</div>
                <div>Status: Upcoming</div>
                <Button variant="link" className="text-blue-500 p-0">+ Add Assessment</Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Projection */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Projection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>Current Overall Grade: 68%</div>
                <div>To achieve final pass (50%): Need minimum 23% in remaining assessments</div>
                <div>To achieve distinction (75%): Need minimum 85% in remaining assessments</div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Calculate Required Marks
                </Button>
              </CardContent>
            </Card>

            {/* Academic Support */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-yellow-600 font-medium">Your progress is good!</div>
                <div>No intervention needed at this time</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-4">
        <p className="text-gray-400">© 2025 ModuleTracker - Ngwana-Tiyani</p>
      </footer>
    </div>
  );
};

export default Dashboard;
