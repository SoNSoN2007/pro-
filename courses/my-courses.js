// My Courses Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    new MyCoursesManager();
});

class MyCoursesManager {
    constructor() {
        this.loadMyCourses();
        this.renderCourses();
        this.setupEventListeners();
        this.updateCartBadge();
        this.currentFilter = 'all';
    }

    loadMyCourses() {
        // Get purchased courses from localStorage
        const savedCourses = localStorage.getItem('myCourses');
        if (savedCourses) {
            try {
                this.myCourses = JSON.parse(savedCourses);
            } catch (error) {
                console.error('Failed to parse my courses from localStorage:', error);
                this.myCourses = [];
            }
        } else {
            this.myCourses = [];

            // For demo purposes, add some courses if none exist
            if (this.myCourses.length === 0) {
                this.myCourses = [{
                        id: '1',
                        title: 'Complete Web Development Bootcamp',
                        instructor: 'Sarah Johnson',
                        instructorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                        price: 89.99,
                        discountPrice: 19.99,
                        rating: 4.8,
                        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
                        category: 'Web Development',
                        level: 'Beginner',
                        duration: '40 hours',
                        progress: 25
                    },
                    {
                        id: '2',
                        title: 'Advanced JavaScript: From Fundamentals to Frameworks',
                        instructor: 'Michael Chen',
                        instructorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                        price: 119.99,
                        discountPrice: 49.99,
                        rating: 4.7,
                        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
                        category: 'JavaScript',
                        level: 'Intermediate',
                        duration: '35 hours',
                        progress: 75
                    },
                    {
                        id: '3',
                        title: 'UI/UX Design Masterclass',
                        instructor: 'Emma Rodriguez',
                        instructorAvatar: 'https://randomuser.me/api/portraits/women/56.jpg',
                        price: 69.99,
                        discountPrice: null,
                        rating: 4.9,
                        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
                        category: 'Design',
                        level: 'Beginner',
                        duration: '25 hours',
                        progress: 0
                    },
                    {
                        id: '4',
                        title: 'Data Science & Machine Learning with Python',
                        instructor: 'James Wilson',
                        instructorAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
                        price: 149.99,
                        discountPrice: 79.99,
                        rating: 4.6,
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
                        category: 'Data Science',
                        level: 'Advanced',
                        duration: '50 hours',
                        progress: 10
                    },
                    {
                        id: '5',
                        title: 'Mobile App Development with React Native',
                        instructor: 'David Kim',
                        instructorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                        price: 129.99,
                        discountPrice: 59.99,
                        rating: 4.7,
                        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop',
                        category: 'App Development',
                        level: 'Intermediate',
                        duration: '30 hours',
                        progress: 45
                    },
                    {
                        id: '6',
                        title: 'Python for Data Analysis and Visualization',
                        instructor: 'Lisa Taylor',
                        instructorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
                        price: 99.99,
                        discountPrice: 39.99,
                        rating: 4.8,
                        image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?q=80&w=600&auto=format&fit=crop',
                        category: 'Data Science',
                        level: 'Intermediate',
                        duration: '28 hours',
                        progress: 100
                    },
                    {
                        id: '7',
                        title: 'Full-Stack Web Development with MERN Stack',
                        instructor: 'Robert Johnson',
                        instructorAvatar: 'https://randomuser.me/api/portraits/men/35.jpg',
                        price: 139.99,
                        discountPrice: 69.99,
                        rating: 4.9,
                        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
                        category: 'Web Development',
                        level: 'Advanced',
                        duration: '45 hours',
                        progress: 60
                    }
                ];
                localStorage.setItem('myCourses', JSON.stringify(this.myCourses));
            }
        }
    }

    updateCartBadge() {
        // Update cart badge count from localStorage
        const savedCart = localStorage.getItem('courseCart');
        if (savedCart) {
            try {
                const cart = JSON.parse(savedCart);
                const badge = document.getElementById('cartBadge');
                if (badge) {
                    badge.textContent = cart.totalItems || 0;
                }
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error);
            }
        }
    }

    renderCourses(courses = null) {
        const coursesToRender = courses || this.getFilteredCourses();
        const emptyCoursesState = document.getElementById('emptyCoursesState');
        const myCoursesContent = document.getElementById('myCoursesContent');
        const coursesGrid = document.getElementById('coursesGrid');

        // Show empty state or courses content based on courses
        if (this.myCourses.length === 0) {
            emptyCoursesState.classList.remove('hidden');
            myCoursesContent.classList.add('hidden');
            return;
        } else {
            emptyCoursesState.classList.add('hidden');
            myCoursesContent.classList.remove('hidden');
        }

        // Clear existing courses
        coursesGrid.innerHTML = '';

        // If no courses match the current filter
        if (coursesToRender.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <div class="empty-courses">
                    <i data-lucide="filter-x" class="empty-courses-icon"></i>
                    <h1>No courses match the current filter</h1>
                    <p>Try a different filter or search term</p>
                    <button class="btn btn-primary" id="clearFilterBtn">Clear Filters</button>
                </div>
            `;
            coursesGrid.appendChild(noResults);

            // Add event listener to clear filter
            const clearFilterBtn = document.getElementById('clearFilterBtn');
            if (clearFilterBtn) {
                clearFilterBtn.addEventListener('click', () => {
                    document.getElementById('courseSearchInput').value = '';
                    this.setActiveFilter('all');
                    this.renderCourses();
                });
            }

            // Initialize Lucide icons for newly added elements
            lucide.createIcons();
            return;
        }

        // Add each course to the grid
        coursesToRender.forEach((course, index) => {
            const template = document.getElementById('courseCardTemplate');
            const clone = document.importNode(template.content, true);
            const card = clone.querySelector('.course-card');

            // Add animation delay
            card.style.animationDelay = `${index * 0.05}s`;

            // Set course image
            const img = clone.querySelector('.course-image');
            img.src = course.image;
            img.alt = course.title;

            // Set course badge
            const badge = clone.querySelector('.course-badge');
            badge.textContent = course.category;

            // Set course level
            const level = clone.querySelector('.course-level');
            level.textContent = course.level;

            // Apply different colors based on level
            if (course.level === 'Beginner') {
                level.style.backgroundColor = 'rgba(16, 185, 129, 0.8)'; // Green
            } else if (course.level === 'Intermediate') {
                level.style.backgroundColor = 'rgba(245, 158, 11, 0.8)'; // Amber
            } else if (course.level === 'Advanced') {
                level.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'; // Red
            }

            // Set rating
            const ratingValue = clone.querySelector('.rating-value');
            ratingValue.textContent = course.rating;

            // Set duration
            const durationValue = clone.querySelector('.duration-value');
            durationValue.textContent = course.duration;

            // Set title
            const titleLink = clone.querySelector('.course-title-link');
            titleLink.textContent = course.title;
            titleLink.href = `course-content.html?id=${course.id}`;

            // Set instructor
            const instructorName = clone.querySelector('.instructor-name');
            instructorName.textContent = course.instructor;

            // Set instructor avatar
            const instructorAvatar = clone.querySelector('.instructor-avatar');
            instructorAvatar.src = course.instructorAvatar || 'https://randomuser.me/api/portraits/lego/0.jpg';
            instructorAvatar.alt = course.instructor;

            // Set progress
            const progressValue = clone.querySelector('.progress-value');
            const progressFill = clone.querySelector('.progress-fill');
            const progress = course.progress || 0;
            progressValue.textContent = `${progress}%`;
            progressFill.style.width = `${progress}%`;

            // Add completed badge if progress is 100%
            if (progress === 100) {
                const completedBadge = document.createElement('div');
                completedBadge.className = 'course-completed';
                completedBadge.innerHTML = `
                    <i data-lucide="check" width="12" height="12"></i>
                    Completed
                `;
                completedBadge.style.position = 'absolute';
                completedBadge.style.bottom = '0.75rem';
                completedBadge.style.right = '0.75rem';
                completedBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.9)';
                completedBadge.style.color = 'white';
                completedBadge.style.padding = '0.25rem 0.5rem';
                completedBadge.style.borderRadius = '9999px';
                completedBadge.style.fontSize = '0.7rem';
                completedBadge.style.fontWeight = '600';
                completedBadge.style.display = 'flex';
                completedBadge.style.alignItems = 'center';
                completedBadge.style.gap = '0.25rem';
                completedBadge.style.zIndex = '10';
                clone.querySelector('.course-image-container').appendChild(completedBadge);
            }

            // Set continue button text based on progress
            const continueBtn = clone.querySelector('.continue-btn');
            if (progress === 0) {
                continueBtn.innerHTML = '<i data-lucide="play"></i> Start Learning';
            } else if (progress === 100) {
                continueBtn.innerHTML = '<i data-lucide="rotate-cw"></i> Review Course';
            } else {
                continueBtn.innerHTML = '<i data-lucide="book-open"></i> Continue Learning';
            }

            // Set continue links
            const contentLink = clone.querySelector('.course-content-link');
            contentLink.href = `course-content.html?id=${course.id}`;
            continueBtn.href = `course-content.html?id=${course.id}`;

            coursesGrid.appendChild(clone);
        });

        // Initialize Lucide icons for newly added elements
        lucide.createIcons();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('courseSearchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.searchTerm = searchTerm;
                this.renderCourses(this.getFilteredCourses());
            });
        }

        // Filter buttons
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    this.setActiveFilter(filter);
                    this.renderCourses();
                });
            });
        }
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;

        // Update active button UI
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    getFilteredCourses() {
        let filteredCourses = [...this.myCourses];

        // Apply search filter if there's a search term
        if (this.searchTerm) {
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(this.searchTerm) ||
                course.instructor.toLowerCase().includes(this.searchTerm) ||
                course.category.toLowerCase().includes(this.searchTerm) ||
                course.level.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply status filter
        if (this.currentFilter !== 'all') {
            if (this.currentFilter === 'inProgress') {
                filteredCourses = filteredCourses.filter(course =>
                    course.progress > 0 && course.progress < 100
                );
            } else if (this.currentFilter === 'notStarted') {
                filteredCourses = filteredCourses.filter(course =>
                    course.progress === 0
                );
            } else if (this.currentFilter === 'completed') {
                filteredCourses = filteredCourses.filter(course =>
                    course.progress === 100
                );
            }
        }

        return filteredCourses;
    }

    filterCourses(searchTerm) {
        this.searchTerm = searchTerm;
        this.renderCourses(this.getFilteredCourses());
    }

    updateCourseProgress(courseId, progress) {
        const courseIndex = this.myCourses.findIndex(course => course.id === courseId);
        if (courseIndex !== -1) {
            this.myCourses[courseIndex].progress = progress;
            localStorage.setItem('myCourses', JSON.stringify(this.myCourses));
            this.renderCourses();
        }
    }
}