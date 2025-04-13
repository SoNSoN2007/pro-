
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import coursesData from '@/data/coursesData';

const Index = () => {
  const featuredCourses = coursesData.filter(course => course.isFeatured);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Expand Your Skills with Online Courses
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                Discover high-quality courses taught by industry experts. Learn at your own pace and achieve your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link to="/courses">
                    Explore Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <Link to="/my-courses">
                    My Learning
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="absolute -top-4 -left-4 h-72 w-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 h-72 w-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
                <img
                  src="/placeholder.svg"
                  alt="Online Learning Platform"
                  className="relative rounded-lg border border-gray-200/20 backdrop-blur-sm bg-white/10 shadow-lg p-6"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-1">
                Our most popular and highly-rated courses
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link to="/courses">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Our Platform?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 text-white mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Instructors</h3>
                    <p className="text-muted-foreground">Learn from industry professionals with years of experience.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 text-white mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Flexible Learning</h3>
                    <p className="text-muted-foreground">Study at your own pace, anytime and anywhere.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 text-white mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Practical Projects</h3>
                    <p className="text-muted-foreground">Apply your knowledge with hands-on exercises and real-world projects.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary rounded-full p-1 text-white mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Lifetime Access</h3>
                    <p className="text-muted-foreground">Pay once and access your course content forever.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <img
                  src="/placeholder.svg"
                  alt="Student learning online"
                  className="rounded-lg shadow-lg"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <h3 className="font-bold">CourseCart</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Empowering learners worldwide with high-quality education.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Support</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Testimonials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CourseCart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
