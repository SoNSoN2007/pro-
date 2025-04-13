// Sample course data
// Define the courses
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites.",
    duration: 8,
    price: 199,
    instructor: "Alex Johnson",
    topic: "Web Development",
    category: "Development",
    tools: ["HTML", "CSS", "JavaScript"],
    rating: 4.5,
    level: "Beginner"
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Introduction to Python, Pandas, and data visualization.",
    duration: 10,
    price: 249,
    instructor: "Maria Garcia",
    topic: "Data Science",
    category: "Development",
    tools: ["Python", "Pandas", "Matplotlib"],
    rating: 4.2,
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build cross-platform apps with React Native.",
    duration: 12,
    price: 299,
    instructor: "Sam Wilson",
    topic: "Mobile Development",
    category: "Development",
    tools: ["React Native", "JavaScript", "iOS"],
    rating: 4.8,
    level: "Advanced"
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    description: "Comprehensive guide to SEO, social media, and content marketing.",
    duration: 6,
    price: 179,
    instructor: "Sarah Thompson",
    topic: "Digital Marketing",
    category: "Marketing",
    tools: ["Google Analytics", "SEMrush", "Canva"],
    rating: 4.7,
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Financial Analysis Fundamentals",
    description: "Master financial modeling and valuation techniques.",
    duration: 8,
    price: 299,
    instructor: "Michael Chen",
    topic: "Finance",
    category: "Business",
    tools: ["Excel", "Tableau", "QuickBooks"],
    rating: 4.6,
    level: "Intermediate"
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description: "Create user-centered designs with Figma and Adobe XD.",
    duration: 6,
    price: 229,
    instructor: "Emma Wilson",
    topic: "Design",
    category: "Design",
    tools: ["Figma", "Adobe XD", "Sketch"],
    rating: 4.9,
    level: "Beginner"
  },
  {
    id: 7,
    title: "Music Production Essentials",
    description: "Produce professional music using Ableton Live.",
    duration: 10,
    price: 349,
    instructor: "Carlos Santana",
    topic: "Music Production",
    category: "Music",
    tools: ["Ableton Live", "Logic Pro", "FL Studio"],
    rating: 4.8,
    level: "Advanced"
  },
  {
    id: 8,
    title: "Yoga Teacher Training",
    description: "Complete guide to yoga instruction and practice.",
    duration: 12,
    price: 499,
    instructor: "Priya Sharma",
    topic: "Yoga",
    category: "Health & Fitness",
    tools: ["Yoga Mat", "Meditation", "Anatomy"],
    rating: 4.9,
    level: "Intermediate"
  },
  {
    id: 9,
    title: "Photography Mastery",
    description: "From basics to advanced lighting techniques.",
    duration: 8,
    price: 279,
    instructor: "James Robertson",
    topic: "Photography",
    category: "Photography & Video",
    tools: ["Lightroom", "Photoshop", "Premiere Pro"],
    rating: 4.7,
    level: "Beginner"
  },
  {
    id: 10,
    title: "Project Management Professional",
    description: "PMI-aligned project management certification prep.",
    duration: 10,
    price: 399,
    instructor: "Linda Carter",
    topic: "Project Management",
    category: "Business",
    tools: ["Jira", "Trello", "Asana"],
    rating: 4.5,
    level: "Advanced"
  },
  {
    id: 11,
    title: "Graphic Design Bootcamp",
    description: "Master Adobe Creative Suite for professional designs.",
    duration: 8,
    price: 299,
    instructor: "David Kim",
    topic: "Graphic Design",
    category: "Design",
    tools: ["Photoshop", "Illustrator", "InDesign"],
    rating: 4.6,
    level: "Intermediate"
  },
  {
    id: 12,
    title: "Social Media Marketing",
    description: "Strategies for Instagram, TikTok, and YouTube growth.",
    duration: 6,
    price: 199,
    instructor: "Sophia Martinez",
    topic: "Social Media",
    category: "Marketing",
    tools: ["Canva", "Hootsuite", "Buffer"],
    rating: 4.4,
    level: "Beginner"
  },
  {
    id: 13,
    title: "iOS Development with SwiftUI",
    description: "Build native iOS apps using modern Swift techniques.",
    duration: 10,
    price: 349,
    instructor: "Brian Foster",
    topic: "Mobile Development",
    category: "Development",
    tools: ["Swift", "Xcode", "Core Data"],
    rating: 4.8,
    level: "Advanced"
  },
  {
    id: 14,
    title: "Cloud Computing with AWS",
    description: "Master cloud infrastructure and services using Amazon Web Services.",
    duration: 10,
    price: 349,
    instructor: "Raj Patel",
    topic: "Cloud Computing",
    category: "Development",
    tools: ["AWS", "EC2", "S3", "Lambda"],
    rating: 4.7,
    level: "Intermediate"
  },
  {
    id: 15,
    title: "Cybersecurity Fundamentals",
    description: "Essential skills for network security and ethical hacking.",
    duration: 8,
    price: 299,
    instructor: "Natalie Wong",
    topic: "Cybersecurity",
    category: "IT & Software",
    tools: ["Wireshark", "Nmap", "Metasploit"],
    rating: 4.6,
    level: "Beginner"
  },
  {
    id: 16,
    title: "Artificial Intelligence Basics",
    description: "Introduction to machine learning and neural networks.",
    duration: 12,
    price: 399,
    instructor: "Omar Ahmed",
    topic: "AI Development",
    category: "Data Science",
    tools: ["Python", "TensorFlow", "Keras"],
    rating: 4.8,
    level: "Advanced"
  },
  {
    id: 17,
    title: "Game Development with Unity",
    description: "Create 3D games using Unity game engine.",
    duration: 10,
    price: 329,
    instructor: "Sophie Martin",
    topic: "Game Development",
    category: "Development",
    tools: ["Unity", "C#", "3D Modeling"],
    rating: 4.5,
    level: "Intermediate"
  },
  {
    id: 18,
    title: "DevOps with Docker & Kubernetes",
    description: "Containerization and orchestration for modern development.",
    duration: 8,
    price: 359,
    instructor: "James Cooper",
    topic: "DevOps",
    category: "Development",
    tools: ["Docker", "Kubernetes", "CI/CD"],
    rating: 4.7,
    level: "Advanced"
  },
  {
    id: 19,
    title: "Data Science with Python",
    description: "Data analysis and machine learning using Python.",
    duration: 10,
    price: 349,
    instructor: "Emily Thompson",
    topic: "Data Science",
    category: "Data Science",
    tools: ["Python", "NumPy", "Pandas"],
    rating: 1,
    level: "Intermediate"
  }

];




let currentFilteredCourses = []; // Stores filtered results


// Define the filter function
function filterCourses(filterOption, filterValue) {
  const filteredCourses = courses.filter(course => {
    if (filterOption === "category") {
      return course.category === filterValue;
    } else if (filterOption === "tools") {
      return course.tools.includes(filterValue);
    } else if (filterOption === "rating") {
      const ratingValue = parseFloat(filterValue.replace(" Star", ""));
      return course.rating >= ratingValue;
    } else if (filterOption === "level") {
      return course.level === filterValue;
    }
  });
  return filteredCourses;
}

// Replace your existing filter button click handler with this:

// 1. First, get reference to the filter button
const filterButton = document.querySelector('.filter-button');

// 2. Add click event listener
filterButton.addEventListener('click', () => {
  // Show loading state (optional)
  document.querySelector('.courses-grid').classList.add('loading');
  
  // Apply all active filters
  applyFilters();
  
  // Remove loading state after short delay
  setTimeout(() => {
    document.querySelector('.courses-grid').classList.remove('loading');
  }, 300);
});

// 3. Add event listeners for all filter checkboxes
document.querySelectorAll('.filter-list input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    // When any filter checkbox changes, reapply filters
    applyFilters();
  });
});

const coursesPerPage = 6;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', displayCourses);
function displayCourses() {
  const courseGridElement = document.querySelector(".courses-grid");
  if (!courseGridElement) return;

  // Clear existing courses
  courseGridElement.innerHTML = "";

  // Determine which courses to display
  const coursesToDisplay = currentFilteredCourses.length > 0 
    ? currentFilteredCourses 
    : courses;

  // Calculate pagination slice
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = coursesToDisplay.slice(startIndex, endIndex);

  // Display courses
  paginatedCourses.forEach(course => {
    const article = document.createElement("article");
    article.className = "course-card";
    article.innerHTML = `
      <h2 class="course-title">${course.title}</h2>
      <p class="course-description">${course.description}</p>
      <div class="course-meta">
        <span class="course-duration">Duration: ${course.duration} weeks</span>
        <span class="course-price">Price: $${course.price}</span>
        <span class="course-instructor">Instructor: ${course.instructor}</span>
        <span class="course-topic">Topic: ${course.topic}</span>
        <span class="course-category">Category: ${course.category}</span>
        <span class="course-tools">Tools: ${course.tools.join(", ")}</span>
        <span class="course-rating">Rating: ${course.rating} Star</span>
        <span class="course-level">Level: ${course.level}</span>
      </div>
      <a href="course-details.html?id=${course.id}" class="course-details-btn">View Details</a>
    `;
    courseGridElement.appendChild(article);
  });

  // Update pagination controls
  displayPagination();
}
document.querySelector('.search-input').addEventListener('input', applyFilters);

// Add sort change handler
document.getElementById('sort').addEventListener('change', applyFilters);

function displayPagination() {
  const paginationElement = document.getElementById("pagination");
  if (!paginationElement) return;

  // Determine which courses we're paginating through
  const totalCourses = currentFilteredCourses.length > 0 
    ? currentFilteredCourses.length 
    : courses.length;
  
  const totalPages = Math.ceil(totalCourses / coursesPerPage);
  paginationElement.innerHTML = '';

  // Previous Button
  if (currentPage > 1) {
    const prevBtn = createPageButton("«", () => {
      currentPage--;
      displayCourses();
    });
    paginationElement.appendChild(prevBtn);
  }

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = createPageButton(i, () => {
      currentPage = i;
      displayCourses();
    });
    if (i === currentPage) pageBtn.classList.add("active");
    paginationElement.appendChild(pageBtn);
  }

  // Next Button
  if (currentPage < totalPages) {
    const nextBtn = createPageButton("»", () => {
      currentPage++;
      displayCourses();
    });
    paginationElement.appendChild(nextBtn);
  }
}

function createPageButton(label, onClick) {
  const btn = document.createElement("button");
  btn.innerHTML = label;
  btn.className = "pagination-btn";
  btn.onclick = onClick;
  return btn;
}


// New combined filter function
// Modified applyFilters function using data attributes
function applyFilters() {
  const activeFilters = {
    categories: [],
    tools: [],
    ratings: [],
    levels: []
  };

  // Collect all checked filters using data attributes
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    const filterType = checkbox.dataset.filterType;
    const filterValue = checkbox.dataset.filterValue;

    switch(filterType) {
      case 'category':
        activeFilters.categories.push(filterValue);
        break;
      case 'tool':
        activeFilters.tools.push(filterValue);
        break;
      case 'rating':
        activeFilters.ratings.push(filterValue);
        break;
      case 'course-level':
        activeFilters.levels.push(filterValue);
        break;
    }
  });

  // Filter courses
  let filtered = courses.filter(course => {
    return (
      (activeFilters.categories.length === 0 || activeFilters.categories.includes(course.category)) &&
      (activeFilters.tools.length === 0 || activeFilters.tools.some(tool => course.tools.includes(tool))) &&
      (activeFilters.ratings.length === 0 || activeFilters.ratings.some(rating => {
        const numericRating = parseFloat(rating.replace(" Star", "").replace(" & up", ""));
        return rating.includes("& up") ? course.rating >= numericRating : course.rating === numericRating;
      })) &&
      (activeFilters.levels.length === 0 || activeFilters.levels.includes(course.level))
    );
  });

  // Apply search
  const searchTerm = document.querySelector('.search-input').value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  const sortBy = document.getElementById('sort').value;
  switch(sortBy) {
    case 'Newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
    case 'Popular':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'Trending':
      filtered.sort((a, b) => b.id - a.id); // Temporary implementation
      break;
  }

  // Update global filtered courses and reset pagination
  currentFilteredCourses = filtered;
  currentPage = 1;
  
  // Render results
  displayCourses();
}
document.addEventListener('DOMContentLoaded', displayCourses);
