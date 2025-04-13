
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Award, 
  User, 
  ShoppingCart, 
  CheckCircle,
  Star 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import coursesData from '@/data/coursesData';
import { useCart } from '@/context/CartContext';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cart, purchasedCourses } = useCart();
  
  const course = coursesData.find(course => course.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isInCart = cart.items.some(item => item.course.id === course.id);
  const isOwned = purchasedCourses.some(c => c.id === course.id);
  
  const renderCourseContent = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Course Content</h3>
        <p className="text-muted-foreground">{course.lessons.length} lessons • {course.duration} total</p>
        
        <div className="border rounded-lg divide-y">
          {course.lessons.map((lesson, index) => (
            <div key={lesson.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {lesson.duration}
                    </p>
                  </div>
                </div>
                {isOwned ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/course-content/${course.id}?lesson=${lesson.id}`}>
                      View
                    </Link>
                  </Button>
                ) : (
                  <Badge variant="outline">Preview</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                  {course.category}
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {course.title}
                </h1>
                <p className="text-white/80 text-lg">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="ml-1">({course.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <span>{course.instructor}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    <Award className="h-3 w-3 mr-1" />
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <div className="aspect-video mb-6 overflow-hidden rounded-md bg-gray-100">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-baseline">
                      {course.discountPrice ? (
                        <>
                          <span className="text-3xl font-bold">${course.discountPrice.toFixed(2)}</span>
                          <span className="text-lg text-muted-foreground line-through ml-2">
                            ${course.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {isOwned ? (
                      <Button className="w-full" asChild>
                        <Link to={`/course-content/${course.id}`}>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Go to Course
                        </Link>
                      </Button>
                    ) : isInCart ? (
                      <Button className="w-full" asChild>
                        <Link to="/cart">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Go to Cart
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => addToCart(course)}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Full lifetime access</p>
                      <p>Access on all devices</p>
                      <p>Certificate of completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Course Description</h2>
                <div className="prose max-w-none">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl.
                  </p>
                  <p>
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl.
                  </p>
                  <h3>Who this course is for:</h3>
                  <ul>
                    <li>Beginners who want to learn the basics</li>
                    <li>Intermediate users looking to advance their skills</li>
                    <li>Professionals seeking to stay current with best practices</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              {renderCourseContent()}
              
              <Separator />
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg" alt={course.instructor} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor}</h3>
                    <p className="text-muted-foreground">Professional Instructor</p>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="sticky top-20">
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-lg">Course Includes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{course.duration} of video content</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                      <span>{course.lessons.length} lessons</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <span>Q&A support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
