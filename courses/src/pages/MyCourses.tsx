
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { BookOpen, Clock, Star, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MyCourses = () => {
  const { purchasedCourses } = useCart();
  
  if (purchasedCourses.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <BookOpen className="h-24 w-24 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">You don't have any courses yet</h1>
            <p className="text-muted-foreground mb-6">
              Browse our courses catalog and start your learning journey today!
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <h1 className="text-2xl font-bold mb-8">My Learning</h1>
          
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search your courses..."
                className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button asChild variant="secondary">
                      <Link to={`/course-content/${course.id}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2">
                    {course.category}
                  </Badge>
                </div>
                
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">
                    <Link to={`/course-content/${course.id}`} className="hover:text-primary">
                      {course.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.instructor}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/course-content/${course.id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCourses;
