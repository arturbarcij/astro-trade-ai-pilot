
import { useState } from "react";
import { Book, Bookmark, CheckCircle, ChevronRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock tutorial data
const tutorials = [
  {
    id: 1,
    title: "Introduction to Trading",
    description: "Learn the basics of stock trading and market fundamentals",
    level: "Beginner",
    duration: "15 min",
    completed: true,
    progress: 100,
    category: "basics"
  },
  {
    id: 2,
    title: "Technical Analysis Fundamentals",
    description: "Understanding charts, trends and indicators",
    level: "Intermediate",
    duration: "25 min",
    completed: false,
    progress: 60,
    category: "technical"
  },
  {
    id: 3,
    title: "Fundamental Analysis",
    description: "Learn how to evaluate companies using financial metrics",
    level: "Intermediate",
    duration: "30 min",
    completed: false,
    progress: 20,
    category: "fundamental"
  },
  {
    id: 4,
    title: "Risk Management Strategies",
    description: "Learn how to protect your capital and manage position sizing",
    level: "Advanced",
    duration: "20 min",
    completed: false,
    progress: 0,
    category: "strategy"
  },
  {
    id: 5,
    title: "Portfolio Diversification",
    description: "How to build a diversified portfolio across sectors and asset classes",
    level: "Intermediate",
    duration: "22 min",
    completed: false,
    progress: 0,
    category: "strategy"
  },
  {
    id: 6,
    title: "Understanding Market Cycles",
    description: "Learn about economic cycles and their impact on markets",
    level: "Advanced",
    duration: "35 min",
    completed: false,
    progress: 0,
    category: "fundamental"
  }
];

const LearnPage = () => {
  const [currentTab, setCurrentTab] = useState("all");
  
  // Filter tutorials based on tab
  const filteredTutorials = currentTab === "all" 
    ? tutorials 
    : tutorials.filter(t => t.category === currentTab);
  
  // Calculate overall progress
  const overallProgress = Math.round(
    tutorials.reduce((acc, curr) => acc + curr.progress, 0) / tutorials.length
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-silver bg-clip-text text-transparent">Learn Trading</h1>
          <p className="text-silver">Expand your knowledge with our curated tutorials</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bookmark size={16} />
          Saved Courses
        </Button>
      </div>

      {/* Progress card */}
      <div className="glass-card p-4 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Your Learning Journey</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Track your progress through our comprehensive trading curriculum
          </p>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm">{overallProgress}% Complete</span>
            <span className="text-xs text-muted-foreground">{tutorials.filter(t => t.completed).length}/{tutorials.length} lessons</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Button className="gap-2">
            <PlayCircle size={16} />
            Continue Learning
          </Button>
          <Button variant="outline" className="gap-2">
            <Star size={16} />
            Popular Courses
          </Button>
        </div>
      </div>

      {/* Tutorial categories */}
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="bg-space p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            All Topics
          </TabsTrigger>
          <TabsTrigger value="basics" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Basics
          </TabsTrigger>
          <TabsTrigger value="technical" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Technical
          </TabsTrigger>
          <TabsTrigger value="fundamental" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Fundamental
          </TabsTrigger>
          <TabsTrigger value="strategy" className="data-[state=active]:bg-space-accent/20 data-[state=active]:text-cosmic">
            Strategy
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tutorial cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div key={tutorial.id} className="glass-card hover:shadow-cosmic/10 transition-shadow duration-300 group">
            <div className="h-40 bg-space-light/40 relative flex items-center justify-center">
              <Book size={48} className="text-space-accent/30" />
              {tutorial.completed && (
                <div className="absolute top-3 right-3 bg-gain/20 text-gain p-1 rounded-full">
                  <CheckCircle size={16} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                <Button variant="secondary" className="mb-4 gap-2">
                  <PlayCircle size={16} />
                  {tutorial.progress > 0 ? "Continue" : "Start"}
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-space-light text-silver">
                  {tutorial.level}
                </span>
                <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
              </div>
              <h3 className="font-medium mb-1">{tutorial.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
              {tutorial.progress > 0 && (
                <div className="relative pt-2">
                  <Progress value={tutorial.progress} className="h-1" />
                  <span className="text-xs text-muted-foreground absolute right-0 top-0">{tutorial.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
