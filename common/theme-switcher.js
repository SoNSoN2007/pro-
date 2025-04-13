/**
 * Theme Switcher for Dream Coach Project
 * This script handles theme switching functionality across all pages
 * Enhanced version with automatic theme toggle creation and improved theme persistence
 */

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update all theme toggle icons
    const themeToggles = document.querySelectorAll('.theme-toggle');
    if (themeToggles.length > 0) {
        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

        themeToggles.forEach(toggle => {
            toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
            toggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }
}

// Function to add click event listeners to theme toggle buttons
function setupThemeToggleListeners() {
    const themeToggles = document.querySelectorAll('.theme-toggle');

    themeToggles.forEach(toggle => {
        // Remove any existing listeners to prevent duplicates
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);

        // Add click event listener
        newToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    });
}

// Function to add theme toggle button to the page if none exists
function addThemeToggle() {
    // Check if a theme toggle already exists
    if (document.querySelector('.theme-toggle')) {
        return;
    }

    // Create theme toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'theme-toggle-container';

    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';

    // Set initial icon based on current theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    themeToggle.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;
    themeToggle.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Add the toggle button to the container
    toggleContainer.appendChild(themeToggle);

    // Check if a theme toggle container already exists
    const existingContainer = document.querySelector('.theme-toggle-container');
    if (existingContainer) {
        return; // Don't add another one
    }

    // Add the container to the body
    document.body.appendChild(toggleContainer);
}

// Apply theme immediately to prevent flash of unthemed content
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add theme toggle button to the page if needed
    addThemeToggle();

    // Set up click listeners for all toggle buttons (including those in nav)
    setupThemeToggleListeners();
});