// Dream Coach Profile Page Script - LinkedIn Style

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggleBtn');
    if (themeToggle) {
        // Set initial icon based on current theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.body.parentElement.setAttribute('data-theme', currentTheme);

        // Update button appearance
        updateThemeToggleButton(currentTheme);

        // Add click event listener
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.parentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update button appearance
            updateThemeToggleButton(newTheme);
        });
    }

    // Function to update theme toggle button
    function updateThemeToggleButton(theme) {
        if (!themeToggle) return;

        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

        themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    // Apply saved theme on initial load
    function applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.parentElement.setAttribute('data-theme', savedTheme);

        // If there's a toggle button, update it
        if (themeToggle) {
            updateThemeToggleButton(savedTheme);
        }
    }

    // Apply theme immediately to prevent flash of wrong theme
    applyInitialTheme();

    // Profile dropdown functionality
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            this.classList.toggle('active');
            e.stopPropagation();
        });

        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            profileDropdown.classList.remove('active');
        });
    }

    // "Show more" buttons functionality
    const showMoreButtons = document.querySelectorAll('.show-more button');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isExpanded = icon.classList.contains('fa-chevron-up');

            if (isExpanded) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.textContent = this.textContent.replace('Show less', 'Show all');
                icon.outerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.textContent = this.textContent.replace('Show all', 'Show less');
                icon.outerHTML = '<i class="fas fa-chevron-up"></i>';
            }

            // Here you would toggle visibility of hidden items
            // For a real implementation, you would get the parent section and toggle additional items
        });
    });

    // Like button functionality
    const likeButtons = document.querySelectorAll('.interaction-btn:nth-child(1)');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--primary-color)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = 'var(--text-secondary)';
            }
        });
    });

    // Edit profile buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Here you would implement edit functionality
            // This could open a modal or redirect to an edit page
            alert('Edit functionality would open here');
        });
    });

    // Connect button functionality
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(button => {
        if (!button.classList.contains('primary')) {
            button.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-check"></i> Connected';
                this.classList.add('connected');
                this.disabled = true;
            });
        }
    });

    // Profile avatar and cover image edit buttons
    const avatarEditBtn = document.querySelector('.avatar-edit-btn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function() {
            // Here you would implement image upload functionality
            alert('Profile picture upload functionality would open here');
        });
    }

    const coverEditBtn = document.querySelector('.edit-cover-btn');
    if (coverEditBtn) {
        coverEditBtn.addEventListener('click', function() {
            // Here you would implement image upload functionality
            alert('Cover image upload functionality would open here');
        });
    }

    // More action button
    const moreBtn = document.querySelector('.more-btn');
    if (moreBtn) {
        moreBtn.addEventListener('click', function() {
            // Here you would show a dropdown with more actions
            alert('More actions dropdown would show here');
        });
    }
});