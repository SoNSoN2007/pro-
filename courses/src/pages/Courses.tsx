
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import CourseFilter from '@/components/CourseFilter';
import { Slider } from '@/components/ui/slider';
import coursesData from '@/data/coursesData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 150]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(coursesData.map(course => course.category))];
    return uniqueCategories.map(category => ({
      label: category,
      value: category,
    }));
  }, []);
  
  // Define level options
  const levelOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];
  
  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      
      // Level filter
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      
      // Price filter (using the discounted price if available)
      const coursePrice = course.discountPrice || course.price;
      const matchesPrice = coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [searchTerm, categoryFilter, levelFilter, priceRange]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Browse All Courses</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h2 className="font-semibold mb-4">Filters</h2>
                
                <div className="space-y-6">
                  <CourseFilter
                    title="Category"
                    options={categories}
                    selectedValue={categoryFilter}
                    onChange={setCategoryFilter}
                  />
                  
                  <CourseFilter
                    title="Level"
                    options={levelOptions}
                    selectedValue={levelFilter}
                    onChange={setLevelFilter}
                  />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Price Range</p>
                    <Slider
                      defaultValue={[0, 150]}
                      max={150}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course Results */}
            <div className="lg:col-span-3">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No courses found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
                    Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
