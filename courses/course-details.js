/**
 * Course Details Page JavaScript
 * This script handles loading dynamic course data on the course details page
 * based on the course ID passed in the URL
 */

// Use the same course data as in courses.js for consistency
const coursesData = [{
        id: '1',
        title: 'Complete Web Development Bootcamp',
        instructor: 'Sarah Johnson',
        price: 89.99,
        discountPrice: 19.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
        category: 'Web Development',
        level: 'beginner',
        duration: '62 hours',
        isFeatured: true,
        description: "Learn web development from scratch with HTML, CSS, JavaScript and modern frameworks. This comprehensive bootcamp takes you from beginner to job-ready developer in just a few months.",
        students: 124582,
        language: "English",
        lastUpdated: "January 2023",
        requirements: [
            "A computer (Windows, Mac, or Linux) with internet access",
            "No prior programming experience needed - we'll teach you everything from scratch",
            "Basic computer skills and a passion for learning web development"
        ],
        outcomes: [
            "Build professional, responsive websites using HTML5, CSS3 and JavaScript",
            "Create dynamic web applications with modern JavaScript frameworks",
            "Develop backend APIs using Node.js and Express",
            "Work with databases including SQL and MongoDB"
        ],
        targetAudience: [
            "Beginners with no prior coding experience who want to become web developers",
            "Designers looking to expand their skills into development",
            "Anyone wanting to learn modern web technologies"
        ]
    },
    {
        id: '2',
        title: 'Advanced JavaScript: From Fundamentals to Frameworks',
        instructor: 'Michael Chen',
        price: 119.99,
        discountPrice: 49.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
        category: 'JavaScript',
        level: 'intermediate',
        duration: '42 hours',
        isFeatured: true,
        description: "Take your JavaScript skills to the next level with advanced concepts, design patterns, and modern frameworks. Learn how to build complex applications with React, Vue, and Angular.",
        students: 89345,
        language: "English",
        lastUpdated: "March 2023",
        requirements: [
            "Basic JavaScript knowledge (variables, functions, loops, etc.)",
            "Familiarity with HTML and CSS",
            "A code editor and modern web browser"
        ],
        outcomes: [
            "Master advanced JavaScript concepts like closures, prototypes, and ES6+ features",
            "Build single-page applications with React, Vue, or Angular",
            "Implement state management solutions like Redux or Vuex",
            "Write clean, maintainable JavaScript code using modern best practices"
        ],
        targetAudience: [
            "Web developers who want to deepen their JavaScript knowledge",
            "Developers transitioning to front-end development",
            "Students who have completed a basic web development course"
        ]
    },
    {
        id: '3',
        title: 'UI/UX Design Masterclass',
        instructor: 'Emma Rodriguez',
        price: 69.99,
        discountPrice: null,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
        category: 'Design',
        level: 'beginner',
        duration: '28 hours',
        isFeatured: false,
        description: "Learn the principles and practices of effective UI/UX design. Create beautiful interfaces that users love with Figma, Adobe XD, and industry-standard tools and workflows.",
        students: 52167,
        language: "English",
        lastUpdated: "November 2022",
        requirements: [
            "No prior design experience needed",
            "Access to Figma (free plan is sufficient) or Adobe XD",
            "Basic computer skills"
        ],
        outcomes: [
            "Design beautiful, intuitive user interfaces for web and mobile applications",
            "Conduct user research and implement user-centered design principles",
            "Create wireframes, prototypes, and high-fidelity mockups",
            "Build a professional design portfolio to showcase your skills"
        ],
        targetAudience: [
            "Aspiring UI/UX designers looking to start their career",
            "Web developers who want to improve their design skills",
            "Graphic designers transitioning to digital product design"
        ]
    },
    {
        id: '4',
        title: 'Data Science & Machine Learning with Python',
        instructor: 'James Wilson',
        price: 149.99,
        discountPrice: 79.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
        category: 'Data Science',
        level: 'advanced',
        duration: '56 hours',
        isFeatured: true,
        description: "Master the tools and techniques of data science and machine learning. Learn Python, pandas, scikit-learn, TensorFlow, and more to analyze data and build predictive models.",
        students: 78523,
        language: "English",
        lastUpdated: "February 2023",
        requirements: [
            "Basic Python programming knowledge",
            "Familiarity with mathematical concepts (linear algebra, calculus, statistics)",
            "A computer with at least 8GB of RAM"
        ],
        outcomes: [
            "Analyze and visualize data using Python and its powerful libraries",
            "Build and evaluate machine learning models for various applications",
            "Implement deep learning algorithms with TensorFlow and Keras",
            "Apply data science techniques to real-world problems"
        ],
        targetAudience: [
            "Software developers looking to move into data science",
            "Professionals working with data who want to leverage machine learning",
            "Students with a background in mathematics, statistics, or computer science"
        ]
    },
    {
        id: '5',
        title: 'iOS App Development with Swift',
        instructor: 'Alex Turner',
        price: 129.99,
        discountPrice: 59.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?q=80&w=600&auto=format&fit=crop',
        category: 'Mobile Development',
        level: 'intermediate',
        duration: '38 hours',
        isFeatured: false,
        description: "Build iOS apps using Swift and Xcode. Learn SwiftUI, UIKit, Core Data, and everything you need to publish your apps to the App Store.",
        students: 45329,
        language: "English",
        lastUpdated: "April 2023",
        requirements: [
            "A Mac computer running macOS Catalina or later",
            "Xcode 12 or newer (free from the Mac App Store)",
            "Basic programming knowledge (any language)"
        ],
        outcomes: [
            "Build complete iOS applications using Swift and SwiftUI",
            "Work with UIKit, Core Data, and other essential iOS frameworks",
            "Implement common app features like networking, persistence, and authentication",
            "Publish your apps to the App Store"
        ],
        targetAudience: [
            "Developers who want to create iOS applications",
            "Programmers looking to expand their mobile development skills",
            "Entrepreneurs who want to build their own iOS apps"
        ]
    },
    {
        id: '6',
        title: 'React Native for Mobile Developers',
        instructor: 'Lily Chen',
        price: 99.99,
        discountPrice: 39.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop',
        category: 'Mobile Development',
        level: 'intermediate',
        duration: '32 hours',
        isFeatured: false,
        description: "Build cross-platform mobile apps for iOS and Android using React Native. Learn to create a single codebase that works on multiple platforms.",
        students: 67892,
        language: "English",
        lastUpdated: "December 2022",
        requirements: [
            "Basic knowledge of JavaScript and React",
            "Familiarity with ES6+ syntax",
            "A computer with Node.js and npm installed"
        ],
        outcomes: [
            "Build mobile apps for iOS and Android with a single codebase",
            "Implement native-like UI components with React Native",
            "Integrate with device features like camera, geolocation, and notifications",
            "Deploy your apps to the App Store and Google Play"
        ],
        targetAudience: [
            "Web developers who want to build mobile apps",
            "React developers looking to expand into mobile development",
            "Mobile developers seeking more efficient cross-platform solutions"
        ]
    }
];

class CourseDetailsManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            this.loadCourseData();
            this.setupEventListeners();
            this.updateCartBadge();
            this.initializeCurriculumSections();
        } catch (error) {
            console.error('Error initializing course details:', error);
        }
    }

    initializeCurriculumSections() {
        try {
            // Hide all section content initially
            document.querySelectorAll('.section-content').forEach(content => {
                content.style.display = 'none';
            });

            // Set initial state of icons
            document.querySelectorAll('.toggle-section i').forEach(icon => {
                icon.className = 'fas fa-chevron-down';
            });
        } catch (error) {
            console.error('Error initializing curriculum sections:', error);
        }
    }

    loadCourseData() {
        try {
            // Get course ID from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = urlParams.get('id');

            if (!courseId) {
                console.warn('No course ID found in URL. Using default course data.');
                return;
            }

            // Find the course data
            const course = coursesData.find(c => c.id === courseId);

            if (!course) {
                console.warn(`Course with ID ${courseId} not found. Using default course data.`);
                return;
            }

            // Update page title
            document.title = `${course.title} - Dream Coach`;

            // Update course details throughout the page
            this.updateCourseHeader(course);
            this.updateCourseSidebar(course);
            this.updateCourseOverview(course);
        } catch (error) {
            console.error('Error loading course data:', error);
        }
    }

    updateCourseHeader(course) {
        try {
            // Update main course info
            const titleEl = document.querySelector('.course-title');
            if (titleEl) titleEl.textContent = course.title;

            // Update course subtitle based on the category
            const subtitleEl = document.querySelector('.course-subtitle');
            if (subtitleEl) {
                subtitleEl.textContent = `Master ${course.category} with this comprehensive course designed for ${course.level} level students.`;
            }

            // Update instructor info
            const instructorNamesEl = document.querySelector('.instructor-names');
            if (instructorNamesEl) instructorNamesEl.textContent = course.instructor;

            // Update rating
            const ratingValueEl = document.querySelector('.course-rating .rating-value');
            if (ratingValueEl) ratingValueEl.textContent = course.rating.toFixed(1);

            // Update course preview image
            const previewImageEl = document.querySelector('.preview-image-container img');
            if (previewImageEl) previewImageEl.src = course.image;
        } catch (error) {
            console.error('Error updating course header:', error);
        }
    }

    updateCourseSidebar(course) {
        try {
            // Update price
            const currentPriceEl = document.querySelector('.current-price');
            if (currentPriceEl) {
                currentPriceEl.textContent = `$${(course.discountPrice || course.price).toFixed(2)}`;
            }

            const originalPriceEl = document.querySelector('.original-price');
            if (originalPriceEl) {
                if (course.discountPrice) {
                    originalPriceEl.textContent = `$${course.price.toFixed(2)}`;
                    originalPriceEl.style.display = 'inline';

                    // Calculate and update discount percentage
                    const discountBadgeEl = document.querySelector('.discount-badge');
                    if (discountBadgeEl) {
                        const discountPercentage = Math.round(((course.price - course.discountPrice) / course.price) * 100);
                        discountBadgeEl.textContent = `${discountPercentage}% OFF`;
                    }
                } else {
                    originalPriceEl.style.display = 'none';
                    const discountBadgeEl = document.querySelector('.discount-badge');
                    if (discountBadgeEl) discountBadgeEl.style.display = 'none';
                }
            }

            // Update course meta details
            const durationEl = document.querySelector('.meta-item:nth-child(1) .meta-value');
            if (durationEl) durationEl.textContent = course.duration;

            const levelEl = document.querySelector('.meta-item:nth-child(2) .meta-value');
            if (levelEl) levelEl.textContent = course.level.charAt(0).toUpperCase() + course.level.slice(1);

            const studentsEl = document.querySelector('.meta-item:nth-child(3) .meta-value');
            if (studentsEl && course.students) {
                studentsEl.textContent = course.students.toLocaleString();
            }
        } catch (error) {
            console.error('Error updating course sidebar:', error);
        }
    }

    updateCourseOverview(course) {
        try {
            // Update course description
            const descriptionEl = document.querySelector('.course-description-full');
            if (descriptionEl && course.description) {
                // Create paragraphs from description
                const paragraphs = course.description.split('\n\n');
                descriptionEl.innerHTML = '';
                paragraphs.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    descriptionEl.appendChild(p);
                });
            }

            // Update learning outcomes
            if (course.outcomes && course.outcomes.length > 0) {
                const outcomesGrid = document.querySelector('.learning-outcomes-grid');
                if (outcomesGrid) {
                    outcomesGrid.innerHTML = '';
                    course.outcomes.forEach(outcome => {
                        const outcomeItem = document.createElement('div');
                        outcomeItem.className = 'learning-outcome-item';
                        outcomeItem.innerHTML = `
                            <div class="outcome-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="outcome-text">${outcome}</div>
                        `;
                        outcomesGrid.appendChild(outcomeItem);
                    });
                }
            }

            // Update target audience
            if (course.targetAudience && course.targetAudience.length > 0) {
                const audienceList = document.querySelector('.target-audience-list');
                if (audienceList) {
                    audienceList.innerHTML = '';
                    course.targetAudience.forEach(audience => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <i class="fas fa-arrow-right"></i>
                            <span>${audience}</span>
                        `;
                        audienceList.appendChild(li);
                    });
                }
            }

            // Update requirements
            if (course.requirements && course.requirements.length > 0) {
                const requirementsList = document.querySelector('.requirements-list');
                if (requirementsList) {
                    requirementsList.innerHTML = '';
                    course.requirements.forEach(requirement => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <i class="fas fa-check"></i>
                            <span>${requirement}</span>
                        `;
                        requirementsList.appendChild(li);
                    });
                }
            }
        } catch (error) {
            console.error('Error updating course overview:', error);
        }
    }

    setupEventListeners() {
        try {
            // Tab functionality
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and panels
                    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));

                    // Add active class to clicked tab and corresponding panel
                    tab.classList.add('active');
                    const tabId = tab.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Curriculum section toggle
            document.querySelectorAll('.curriculum-header').forEach(header => {
                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.toggle-section i');

                    // Toggle content visibility
                    if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        icon.className = 'fas fa-chevron-up';
                    } else {
                        content.style.display = 'none';
                        icon.className = 'fas fa-chevron-down';
                    }
                });
            });

            // Add to cart functionality
            const addToCartBtn = document.querySelector('.btn-add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', this.handleAddToCart.bind(this));
            }

            // Buy now functionality
            const buyNowBtn = document.querySelector('.btn-buy-now');
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', this.handleBuyNow.bind(this));
            }

            // Copy link functionality
            const copyLinkBtn = document.querySelector('.btn-copy-link');
            if (copyLinkBtn) {
                copyLinkBtn.addEventListener('click', this.handleCopyLink.bind(this));
            }
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    handleAddToCart() {
        try {
            // Get course ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = urlParams.get('id');

            if (!courseId) {
                console.error('No course ID found in URL');
                alert('An error occurred. Please try again.');
                return;
            }

            // Find course data
            const course = coursesData.find(c => c.id === courseId);
            if (!course) {
                console.error(`Course with ID ${courseId} not found`);
                alert('An error occurred. Please try again.');
                return;
            }

            // Get existing cart from localStorage or initialize a new one
            let cart;
            try {
                const savedCart = localStorage.getItem('courseCart');
                cart = savedCart ? JSON.parse(savedCart) : {
                    items: [],
                    totalItems: 0,
                    totalPrice: 0
                };
            } catch (storageError) {
                console.error('Error accessing localStorage:', storageError);
                cart = {
                    items: [],
                    totalItems: 0,
                    totalPrice: 0
                };
            }

            // Check if course is already in cart
            const existingItem = cart.items.find(item => item.courseId === courseId);

            if (!existingItem) {
                // Add new course to cart
                cart.items.push({
                    courseId: courseId,
                    quantity: 1
                });

                // Update totals
                cart.totalItems += 1;
                cart.totalPrice += (course.discountPrice || course.price);

                // Save to localStorage
                try {
                    localStorage.setItem('courseCart', JSON.stringify(cart));
                } catch (storageError) {
                    console.error('Error saving to localStorage:', storageError);
                }

                // Update cart badge
                this.updateCartBadge();

                // Show confirmation
                alert('Course added to cart!');
            } else {
                alert('This course is already in your cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred. Please try again.');
        }
    }

    handleBuyNow() {
        try {
            // First add to cart
            this.handleAddToCart();

            // Then redirect to checkout page
            window.location.href = 'cart.html';
        } catch (error) {
            console.error('Error with buy now:', error);
        }
    }

    handleCopyLink() {
        try {
            // Get the current URL
            const url = window.location.href;

            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = url;
            document.body.appendChild(tempInput);

            // Select and copy the URL
            tempInput.select();
            document.execCommand('copy');

            // Remove the temporary element
            document.body.removeChild(tempInput);

            // Show confirmation
            alert('Link copied to clipboard!');
        } catch (error) {
            console.error('Error copying link:', error);
            alert('Failed to copy link. Please try again.');
        }
    }

    updateCartBadge() {
        try {
            const cartBadge = document.getElementById('cartBadge');
            if (!cartBadge) return;

            let cartData = { totalItems: 0 };
            try {
                const savedCart = localStorage.getItem('courseCart');
                if (savedCart) {
                    cartData = JSON.parse(savedCart);
                }
            } catch (storageError) {
                console.error('Error accessing localStorage:', storageError);
            }

            cartBadge.textContent = cartData.totalItems || 0;
        } catch (error) {
            console.error('Error updating cart badge:', error);
        }
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseDetailsManager();
});