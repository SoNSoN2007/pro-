
import React, { useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2,
  PlayCircle,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import coursesData, { Lesson } from '@/data/coursesData';
import { useCart } from '@/context/CartContext';
import CourseContentSidebar from '@/components/CourseContentSidebar';

const CourseContent = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const initialLessonId = searchParams.get('lesson');
  const { purchasedCourses } = useCart();
  const navigate = useNavigate();
  
  // Find the course
  const course = coursesData.find(course => course.id === id);
  
  // Check if the user has purchased this course
  const isOwned = purchasedCourses.some(c => c.id === id);
  
  // If the course doesn't exist or user hasn't purchased it, redirect
  if (!course) {
    navigate('/my-courses');
    return null;
  }
  
  if (!isOwned) {
    navigate(`/course/${id}`);
    return null;
  }
  
  // State for current lesson
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    if (initialLessonId) {
      const index = course.lessons.findIndex(lesson => lesson.id === initialLessonId);
      return index !== -1 ? index : 0;
    }
    return 0;
  });
  
  // State for sidebar visibility on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const currentLesson = course.lessons[currentLessonIndex];
  
  // Handle navigation between lessons
  const goToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setSidebarOpen(false);
    }
  };
  
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setSidebarOpen(false);
    }
  };
  
  const selectLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setSidebarOpen(false);
  };
  
  // Calculate mock progress (in a real app, this would come from user data)
  const progress = Math.round((currentLessonIndex / (course.lessons.length - 1)) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 md:hidden shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        {/* Course Content Sidebar */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <Link to="/my-courses" className="text-primary hover:text-primary/80 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <span className="text-sm">My Courses</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <CourseContentSidebar 
              title={course.title}
              lessons={course.lessons}
              currentLessonIndex={currentLessonIndex}
              onSelectLesson={selectLesson}
              progress={progress}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {currentLesson.duration}
              </div>
            </div>
            
            <div className="mb-8 bg-gray-100 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="bg-white/90 p-6 rounded-lg shadow-lg">
                    <PlayCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Video content would appear here in a real application</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p>{currentLesson.content}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl.</p>
              <p>Some key points from this lesson:</p>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.</li>
                <li>Quis aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget aliquam.</li>
              </ul>
              <blockquote>
                "The best way to learn is by doing. Practice makes perfect." - Programming wisdom
              </blockquote>
            </div>
            
            <Separator className="my-8" />
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousLesson}
                disabled={currentLessonIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Button>
              
              <Button 
                onClick={goToNextLesson}
                disabled={currentLessonIndex === course.lessons.length - 1}
              >
                Next Lesson
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;

// Helper component for the clock icon
const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
