
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Clock, Users, Target, CheckCircle } from "lucide-react";

const StudyTips = () => {
  const [completedTips, setCompletedTips] = useState<number[]>([]);

  const studyTips = [
    {
      id: 1,
      title: "Active Learning Techniques",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Engage with material through summarizing, questioning, and teaching others.",
      details: [
        "Create summary notes after each study session",
        "Ask yourself questions about the material",
        "Explain concepts to a friend or family member",
        "Use flashcards for key terms and concepts",
        "Practice problems without looking at solutions first"
      ]
    },
    {
      id: 2,
      title: "Time Management",
      icon: <Clock className="w-5 h-5" />,
      description: "Structure your study time effectively with proven scheduling techniques.",
      details: [
        "Use the Pomodoro Technique (25 min study, 5 min break)",
        "Create a weekly study schedule",
        "Prioritize assignments by due date and difficulty",
        "Block out specific times for each subject",
        "Include buffer time for unexpected tasks"
      ]
    },
    {
      id: 3,
      title: "Group Study Benefits",
      icon: <Users className="w-5 h-5" />,
      description: "Collaborate with peers to enhance understanding and motivation.",
      details: [
        "Form study groups with 3-5 committed students",
        "Assign different topics to group members",
        "Quiz each other on key concepts",
        "Share different perspectives on complex topics",
        "Keep groups focused and on-task"
      ]
    },
    {
      id: 4,
      title: "Goal Setting",
      icon: <Target className="w-5 h-5" />,
      description: "Set SMART goals to track progress and maintain motivation.",
      details: [
        "Set Specific, Measurable, Achievable, Relevant, Time-bound goals",
        "Break large goals into smaller, manageable tasks",
        "Track your progress weekly",
        "Reward yourself for achieving milestones",
        "Adjust goals based on your performance"
      ]
    }
  ];

  const markAsCompleted = (tipId: number) => {
    if (!completedTips.includes(tipId)) {
      setCompletedTips([...completedTips, tipId]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {studyTips.map((tip) => (
        <Card key={tip.id} className="bg-white/90 backdrop-blur shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              {tip.icon}
              {tip.title}
              {completedTips.includes(tip.id) && (
                <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{tip.description}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {tip.icon}
                    {tip.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <p className="text-gray-600">{tip.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Strategies:</h4>
                    <ul className="space-y-1">
                      {tip.details.map((detail, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    onClick={() => markAsCompleted(tip.id)}
                    disabled={completedTips.includes(tip.id)}
                    className="w-full"
                  >
                    {completedTips.includes(tip.id) ? "Completed ✓" : "Mark as Read"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudyTips;
