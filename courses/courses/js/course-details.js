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
    level: "Beginner",
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
    level: "Intermediate",
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
    level: "Advanced",
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    description:
      "Comprehensive guide to SEO, social media, and content marketing.",
    duration: 6,
    price: 179,
    instructor: "Sarah Thompson",
    topic: "Digital Marketing",
    category: "Marketing",
    tools: ["Google Analytics", "SEMrush", "Canva"],
    rating: 4.7,
    level: "Intermediate",
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
    level: "Intermediate",
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
    level: "Beginner",
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
    level: "Advanced",
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
    level: "Intermediate",
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
    level: "Beginner",
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
    level: "Advanced",
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
    level: "Intermediate",
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
    level: "Beginner",
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
    level: "Advanced",
  },
  {
    id: 14,
    title: "Cloud Computing with AWS",
    description:
      "Master cloud infrastructure and services using Amazon Web Services.",
    duration: 10,
    price: 349,
    instructor: "Raj Patel",
    topic: "Cloud Computing",
    category: "Development",
    tools: ["AWS", "EC2", "S3", "Lambda"],
    rating: 4.7,
    level: "Intermediate",
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
    level: "Beginner",
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
    level: "Advanced",
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
    level: "Intermediate",
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
    level: "Advanced",
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
    level: "Intermediate",
  },
];
// Get ID from URL
function getCourseIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

// Render course details
// Update the renderCourseDetails function
function renderCourseDetails(course) {
  const container = document.getElementById("course-details");
  const container2 = document.getElementById("pricedetails");

  // Add container existence check
  if (!container) {
    console.error("Course details container not found!");
    return;
  }

  if (!container2) {
    console.error("Price details container not found!");
    return;
  } 

  if (!course) {
    container.innerHTML = `<p class="error">Course not found.</p>`;
    return;
  }

  if (isNaN(course.id)) {
    container.innerHTML = `<p class="error">Invalid course ID.</p>`;
    return;
  }

  container2.innerHTML = `<div class="text-3xl font-bold text-gray-900">$50.00</div>
                          <div class="text-lg text-gray-500 line-through">$ ${course.price}</div>`;

  container.innerHTML = `
     <nav class="text-sm mb-4">
                        <a href="#" class="text-gray-500">Home</a>
                    </nav>
                    
<h1 class="text-3xl font-bold text-gray-900 mb-4">${course.title}</h1>                    
                    <p class="text-gray-600 mb-6">${course.description}</p>
                    
                    <div class="flex items-center mb-8">
                        <div class="flex -space-x-2">
                            <img src="https://dummyimage.com/40x40/00B2FF/FFFFFF.png&text=DR" alt="Instructor 1" class="h-10 w-10 rounded-full border-2 border-white">
                            <img src="https://dummyimage.com/40x40/6366F1/FFFFFF.png&text=KW" alt="Instructor 2" class="h-10 w-10 rounded-full border-2 border-white">
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-900">Daniel Russell • Krista Watson</p>
                            <div class="flex items-center">
                                <div class="flex text-yellow-400">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                                <span class="ml-2 text-sm text-gray-600">4.8 (512 reviews)</span>
                            </div>
                        </div>
                    </div>

                    <img src="https://dummyimage.com/800x400/F3F4F6/000000.png&text=Complete+Website+Responsive+Design+Course" alt="Course Preview" class="rounded-xl w-full mb-8 shadow-lg">

                    <div class="border-b border-gray-200 pb-4">
                        <div class="flex space-x-8">
                            <button class="text-primary font-medium border-b-2 border-primary pb-4">Overview</button>
                            <button class="text-gray-500 hover:text-gray-700">Curriculum</button>
                            <button class="text-gray-500 hover:text-gray-700">Instructor</button>
                            <button class="text-gray-500 hover:text-gray-700">Reviews</button>
                        </div>
                    </div>

                    <div class="py-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <p class="text-gray-600 mb-4">
                            It gives you a huge self-satisfaction when you look at your work and say, "I made that". I love that feeling when I'm done working on something. What I love to do is step back, look at the final result with a smile, and have this little "yeah right" moment. It's especially satisfying when I have just made $5,000.
                        </p>
                        <p class="text-gray-600">
                            I did feel that's why I got into this. I fell in love of Web Design, which I do now, but for the 4-5 years I do. I have see many ways you can achieve this lifestyle. This is my way. This is how I achieved a lifestyle I've been fantasizing about for five years. Just I'm going to share with you all, what, why and how it works. Web Design is complicated. That's exactly what makes it kind of black for everyone.
                        </p>
                    </div>
  `;
}
// Initialize
// Update the initialization code
document.addEventListener("DOMContentLoaded", () => {
  const courseId = getCourseIdFromURL();

  // Handle invalid/missing ID
  if (!courseId || isNaN(courseId)) {
    const container = document.getElementById("course-details");
    if (container)
      container.innerHTML = `<p class="error">Invalid course ID</p>`;
    return;
  }

  const selectedCourse = courses.find((c) => c.id === courseId);

  if (selectedCourse) {
    renderCourseDetails(selectedCourse);
  } else {
    const container = document.getElementById("course-details");
    if (container)
      container.innerHTML = `<p class="error">Course not found</p>`;
  }
});
