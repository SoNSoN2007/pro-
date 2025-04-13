/**
 * Theme Toggle Script for Courses Pages
 * This script handles theme switching functionality for the courses section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add data-theme attribute to html element if not present
    const htmlElement = document.documentElement;
    if (!htmlElement.hasAttribute('data-theme')) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    // Create the theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        createThemeToggle();
    }

    // Get theme toggle button (might be newly created or existing)
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    if (!themeToggleBtn) {
        console.error('Theme toggle button not found');
        return;
    }

    // Icons for the theme toggle button
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    // Get current theme from localStorage or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set the initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update button icon based on current theme
    updateThemeToggleIcon(currentTheme);

    // Add click event listener to theme toggle button
    themeToggleBtn.addEventListener('click', toggleTheme);

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        try {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Set the new theme
            document.documentElement.setAttribute('data-theme', newTheme);

            try {
                localStorage.setItem('theme', newTheme);
            } catch (storageError) {
                console.error('Error saving theme to localStorage:', storageError);
            }

            // Update button icon
            updateThemeToggleIcon(newTheme);
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    }

    /**
     * Update the theme toggle icon based on the current theme
     * @param {string} theme - The current theme ('light' or 'dark')
     */
    function updateThemeToggleIcon(theme) {
        try {
            themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
            themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        } catch (error) {
            console.error('Error updating theme icon:', error);
        }
    }

    /**
     * Create and insert the theme toggle button
     */
    function createThemeToggle() {
        try {
            // Create the button
            const themeToggleBtn = document.createElement('button');
            themeToggleBtn.className = 'theme-toggle';
            themeToggleBtn.id = 'themeToggleBtn';
            themeToggleBtn.setAttribute('title', 'Toggle Dark Mode');
            themeToggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');

            // Add initial icon
            const currentTheme = localStorage.getItem('theme') || 'light';
            themeToggleBtn.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;

            // Insert button in the navigation
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.insertBefore(themeToggleBtn, navLinks.firstChild);
            }
        } catch (error) {
            console.error('Error creating theme toggle button:', error);
        }
    }
});