document.addEventListener('DOMContentLoaded', function() {
    // Profile dropdown functionality
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        if (profileDropdown) {
            profileDropdown.classList.remove('active');
        }
    });

    // Search functionality
    const searchForm = document.querySelector('.search-bar');
    const searchInput = searchForm ? searchForm.querySelector('input') : null;
    const searchButton = searchForm ? searchForm.querySelector('button') : null;

    if (searchForm && searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                // In a real application, this would redirect to search results
                // For now, just log the search term
                console.log('Searching for:', searchTerm);

                // Example of filtering courses (would be implemented with actual data)
                filterCourses(searchTerm);
            }
        });

        // Allow search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Course enrollment button functionality
    const enrollButtons = document.querySelectorAll('.course button');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.closest('.course').querySelector('h3').textContent;
            alert(`You've enrolled in "${courseName}"! (This is a demo alert)`);
            // In a real application, this would add the course to cart or redirect to checkout
        });
    });

    // Category click functionality
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.querySelector('span').textContent;
            // In a real application, this would redirect to category page
            console.log('Category selected:', categoryName);
            alert(`Viewing ${categoryName} courses! (This is a demo alert)`);
        });
    });

    // Example function to filter courses (would be implemented with actual data)
    function filterCourses(searchTerm) {
        const courses = document.querySelectorAll('.course');
        let found = false;

        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            const description = course.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                course.style.display = 'block';
                found = true;
            } else {
                course.style.display = 'none';
            }
        });

        // Show message if no courses found
        const noResultsMsg = document.getElementById('no-results');
        if (!found) {
            if (!noResultsMsg) {
                const msg = document.createElement('p');
                msg.id = 'no-results';
                msg.textContent = `No courses found matching "${searchTerm}"`;
                msg.style.textAlign = 'center';
                msg.style.padding = '2rem';
                msg.style.color = '#666';
                document.querySelector('.featured-courses').appendChild(msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
});