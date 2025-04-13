class CourseContentManager {
    constructor() {
        // DOM elements
        this.sidebar = document.querySelector('.course-content-sidebar');
        this.mainContent = document.querySelector('.course-main-content');
        this.lessonContainer = document.querySelector('.lessons-container');
        this.lessonContent = document.querySelector('.lesson-content');
        this.courseTitle = document.querySelector('.course-title');
        this.lessonsCountEl = document.querySelector('.lessons-count');
        this.completionPercentageEl = document.querySelector('.completion-percentage');
        this.progressFill = document.querySelector('.progress-fill');
        this.prevButton = document.querySelector('.btn-prev');
        this.nextButton = document.querySelector('.btn-next');

        // Course data
        this.courseId = this.getCourseIdFromUrl();
        this.course = null;
        this.lessons = [];
        this.currentLessonIndex = 0;
        this.progress = 0;
        this.completedLessons = [];

        // Initialize the page
        this.init();

        // Event listeners
        this.prevButton.addEventListener('click', () => this.navigateLesson('prev'));
        this.nextButton.addEventListener('click', () => this.navigateLesson('next'));
    }

    async init() {
        try {
            // Load course data
            await this.loadCourseData();

            // Render the course content
            this.renderCourseSidebar();

            // Load saved progress from local storage
            this.loadProgress();

            // Select the first lesson by default or the last viewed lesson
            this.selectLesson(this.currentLessonIndex);
        } catch (error) {
            console.error('Failed to initialize course content:', error);
            this.showError('Failed to load course content. Please try again later.');
        }
    }

    getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1'; // Default to course 1 if no ID provided
    }

    async loadCourseData() {
        try {
            // In a real application, this would fetch data from an API
            // For now, we'll use mock data similar to the React component's data structure
            const response = await fetch('courses.json');
            if (!response.ok) {
                throw new Error('Failed to fetch course data');
            }

            const coursesData = await response.json();
            this.course = coursesData.find(course => course.id === this.courseId);

            if (!this.course) {
                throw new Error('Course not found');
            }

            this.lessons = this.course.lessons;
            this.courseTitle.textContent = this.course.title;
        } catch (error) {
            console.error('Error loading course data:', error);

            // Fallback to mock data if fetch fails
            this.mockCourseData();
        }
    }

    mockCourseData() {
        // Mock data for testing
        this.course = {
            id: '1',
            title: 'Complete Web Development Bootcamp',
            instructor: 'Dr. Jennifer Lee',
            description: 'Learn HTML, CSS, JavaScript, React, Node.js and more.',
            lessons: [{
                    id: '1-1',
                    title: 'Introduction to HTML',
                    duration: '45m',
                    content: '<h1>Introduction to HTML</h1><p>HTML is the standard markup language for web pages. In this lesson, we will cover the basics of HTML structure, tags, attributes, and how to create your first web page.</p><div class="video-placeholder"><img src="https://via.placeholder.com/800x450" alt="Video Placeholder"/><div class="play-button"><i class="fas fa-play"></i></div></div>'
                },
                {
                    id: '1-2',
                    title: 'CSS Fundamentals',
                    duration: '1h 15m',
                    content: '<h1>CSS Fundamentals</h1><p>Learn how to style your HTML documents with CSS. This lesson covers selectors, properties, values, the box model, positioning, and responsive design principles.</p><div class="video-placeholder"><img src="https://via.placeholder.com/800x450" alt="Video Placeholder"/><div class="play-button"><i class="fas fa-play"></i></div></div>'
                },
                {
                    id: '1-3',
                    title: 'JavaScript Basics',
                    duration: '2h',
                    content: '<h1>JavaScript Basics</h1><p>Introduction to JavaScript programming. We\'ll cover variables, data types, functions, loops, conditionals, and DOM manipulation.</p><div class="video-placeholder"><img src="https://via.placeholder.com/800x450" alt="Video Placeholder"/><div class="play-button"><i class="fas fa-play"></i></div></div>'
                },
                {
                    id: '1-4',
                    title: 'Building Interactive Web Pages',
                    duration: '1h 30m',
                    content: '<h1>Building Interactive Web Pages</h1><p>Learn how to combine HTML, CSS, and JavaScript to create interactive web pages. This lesson covers event handling, form validation, and dynamic content updates.</p><div class="video-placeholder"><img src="https://via.placeholder.com/800x450" alt="Video Placeholder"/><div class="play-button"><i class="fas fa-play"></i></div></div>'
                }
            ]
        };

        this.lessons = this.course.lessons;
        this.courseTitle.textContent = this.course.title;
    }

    renderCourseSidebar() {
        this.lessonContainer.innerHTML = '';
        const template = document.getElementById('lessonItemTemplate');

        this.lessons.forEach((lesson, index) => {
            const clone = template.content.cloneNode(true);
            const lessonItem = clone.querySelector('.lesson-item');

            // Set lesson data
            lessonItem.dataset.index = index;
            lessonItem.querySelector('.lesson-number').textContent = index + 1;
            lessonItem.querySelector('.lesson-title').textContent = lesson.title;
            lessonItem.querySelector('.lesson-duration span').textContent = lesson.duration;

            // Add click event to select lesson
            lessonItem.addEventListener('click', () => this.selectLesson(index));

            this.lessonContainer.appendChild(clone);
        });

        // Update lessons count
        this.lessonsCountEl.textContent = `${this.lessons.length} lessons`;
    }

    selectLesson(index) {
        // Update current lesson index
        this.currentLessonIndex = index;

        // Update UI for active lesson
        const lessonItems = this.lessonContainer.querySelectorAll('.lesson-item');
        lessonItems.forEach(item => item.classList.remove('active'));

        if (lessonItems[index]) {
            lessonItems[index].classList.add('active');
        }

        // Update lesson content
        const lesson = this.lessons[index];
        if (lesson) {
            this.lessonContent.innerHTML = lesson.content;

            // Mark lesson as viewed
            if (!this.completedLessons.includes(lesson.id)) {
                this.completedLessons.push(lesson.id);
                this.updateProgress();
                this.saveProgress();
            }
        }

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    navigateLesson(direction) {
        if (direction === 'prev' && this.currentLessonIndex > 0) {
            this.selectLesson(this.currentLessonIndex - 1);
        } else if (direction === 'next' && this.currentLessonIndex < this.lessons.length - 1) {
            this.selectLesson(this.currentLessonIndex + 1);
        }
    }

    updateNavigationButtons() {
        this.prevButton.disabled = this.currentLessonIndex === 0;
        this.nextButton.disabled = this.currentLessonIndex === this.lessons.length - 1;
    }

    updateProgress() {
        this.progress = Math.round((this.completedLessons.length / this.lessons.length) * 100);
        this.completionPercentageEl.textContent = `${this.progress}% completed`;
        this.progressFill.style.width = `${this.progress}%`;
    }

    loadProgress() {
        const savedData = localStorage.getItem(`course_progress_${this.courseId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            this.completedLessons = data.completedLessons || [];
            this.currentLessonIndex = data.lastViewedIndex || 0;
            this.updateProgress();
        }
    }

    saveProgress() {
        const data = {
            completedLessons: this.completedLessons,
            lastViewedIndex: this.currentLessonIndex,
            timestamp: Date.now()
        };
        localStorage.setItem(`course_progress_${this.courseId}`, JSON.stringify(data));
    }

    showError(message) {
        this.lessonContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the Course Content Manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CourseContentManager();
});