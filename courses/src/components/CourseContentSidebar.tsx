
import React from 'react';
import { Clock, PlayCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lesson } from '@/data/coursesData';
import { Progress } from '@/components/ui/progress';

interface CourseContentSidebarProps {
  title: string;
  lessons: Lesson[];
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
  progress?: number;
}

const CourseContentSidebar: React.FC<CourseContentSidebarProps> = ({
  title,
  lessons,
  currentLessonIndex,
  onSelectLesson,
  progress = 0
}) => {
  return (
    <div className="w-full max-w-md h-full flex flex-col bg-white border-r overflow-hidden">
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <h2 className="font-semibold text-lg">Course Contents</h2>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {lessons.length} lessons
          </span>
          <span className="text-xs text-muted-foreground">
            {progress}% completed
          </span>
        </div>
        <Progress value={progress} className="h-1 mt-2" />
      </div>
      
      <div className="overflow-y-auto flex-1 p-2">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(index)}
            className={cn(
              "w-full text-left p-3 rounded-md my-1 flex items-start group hover:bg-gray-50 transition-colors",
              currentLessonIndex === index 
                ? "bg-primary/5 border border-primary/20" 
                : "border border-transparent"
            )}
          >
            <div className="mr-3 mt-0.5">
              {currentLessonIndex === index ? (
                <div className="bg-primary rounded-full h-6 w-6 flex items-center justify-center">
                  <PlayCircle className="h-3.5 w-3.5 text-white" />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm line-clamp-2">
                {lesson.title}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </div>
            </div>
            <ChevronRight className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              currentLessonIndex === index ? "transform rotate-90" : ""
            )} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseContentSidebar;
