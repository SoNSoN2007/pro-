// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
            // Initialize theme toggle
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', function() {
                    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);

                    // Update icon
                    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
                    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
                    this.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
                });
            }

            // Apply saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
                if (themeToggle) {
                    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
                    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
                    themeToggle.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
                }
            }

            // Profile dropdown functionality
            const profileDropdown = document.querySelector('.profile-dropdown');

            if (profileDropdown) {
                profileDropdown.addEventListener('click', function(e) {
                    this.classList.toggle('active');
                    e.stopPropagation();
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                if (profileDropdown) {
                    profileDropdown.classList.remove('active');
                }
            });

            // More button functionality
            const moreBtns = document.querySelectorAll('.more-btn');

            moreBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    // Get the closest section to determine context
                    const section = this.closest('.linkedin-card');
                    if (section) {
                        const sectionHeader = section.querySelector('.linkedin-card-header h2');
                        const sectionTitle = sectionHeader ? sectionHeader.textContent.trim() : 'this section';
                        // Create a custom dropdown for the more button
                        const dropdown = document.createElement('div');
                        dropdown.className = 'more-dropdown';
                        dropdown.innerHTML = `
                    <ul>
                        <li><i class="fas fa-pen"></i> Edit ${sectionTitle}</li>
                        <li><i class="fas fa-eye-slash"></i> Hide ${sectionTitle}</li>
                        <li><i class="fas fa-share"></i> Share ${sectionTitle}</li>
                    </ul>
                `;

                        // Remove any existing dropdowns
                        const existingDropdowns = document.querySelectorAll('.more-dropdown');
                        existingDropdowns.forEach(d => d.remove());

                        // Add the dropdown near the button
                        this.appendChild(dropdown);

                        // Auto-close after clicking anywhere else
                        document.addEventListener('click', function closeDropdown(e) {
                            if (!e.target.closest('.more-btn')) {
                                dropdown.remove();
                                document.removeEventListener('click', closeDropdown);
                            }
                        });

                        // Prevent dropdown from closing when clicking the button that opened it
                        e.stopPropagation();
                    } else {
                        alert('More options will be available soon!');
                    }
                });
            });

            // Dynamic contact button functionality
            const contactBtns = document.querySelectorAll('.contact-btn');

            contactBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Create and display contact modal
                    createContactModal();
                });
            });

            // Message button functionality
            const messageBtns = document.querySelectorAll('.message-btn');

            messageBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Create and display message modal
                    createMessageModal();
                });
            });

            // Show all activities functionality
            const showAllLinks = document.querySelectorAll('.show-all');

            showAllLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Find the parent card
                    const card = this.closest('.linkedin-card');
                    if (card) {
                        // Toggle expanded class
                        card.classList.toggle('expanded');

                        // Update link text based on expanded state
                        if (card.classList.contains('expanded')) {
                            this.innerHTML = 'Show less <i class="fas fa-arrow-up"></i>';

                            // If this is the activities section, load more activities
                            if (card.querySelector('.activity-feed')) {
                                loadMoreActivities(card.querySelector('.activity-feed'));
                            }
                        } else {
                            // Reset to original text
                            const cardHeader = card.querySelector('.linkedin-card-header h2');
                            const cardType = cardHeader ? cardHeader.textContent.trim().toLowerCase() : 'all';
                            this.innerHTML = `Show all ${cardType} <i class="fas fa-arrow-right"></i>`;
                        }
                    } else {
                        alert('All content will be shown soon!');
                    }
                });
            });

            // Connect buttons functionality
            const connectBtns = document.querySelectorAll('.connect-btn');

            connectBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const memberItem = this.closest('.member-item');
                    if (memberItem) {
                        // Visual feedback
                        this.innerHTML = '<i class="fas fa-check"></i> Requested';
                        this.classList.add('requested');
                        this.disabled = true;

                        // Show toast notification
                        showToast('Connection request sent!');
                    }
                });
            });

            // Skill endorsement functionality
            const skillItems = document.querySelectorAll('.skill-item');

            skillItems.forEach(item => {
                item.addEventListener('click', function() {
                    const endorseButton = document.createElement('button');
                    endorseButton.className = 'endorse-btn';
                    endorseButton.innerHTML = '<i class="fas fa-plus"></i> Endorse';

                    // Remove any existing endorse buttons
                    const existingButtons = document.querySelectorAll('.endorse-btn');
                    existingButtons.forEach(b => b.remove());

                    this.appendChild(endorseButton);

                    endorseButton.addEventListener('click', function(e) {
                        e.stopPropagation();

                        // Update the count
                        const countElement = item.querySelector('.endorsement-count');
                        if (countElement) {
                            const currentCount = parseInt(countElement.textContent);
                            countElement.textContent = currentCount + 1;
                        }

                        // Update progress bar
                        const progressBar = item.querySelector('.skill-progress');
                        if (progressBar) {
                            const currentWidth = progressBar.style.width;
                            const newWidth = Math.min(parseInt(currentWidth) + 2, 100);
                            progressBar.style.width = `${newWidth}%`;
                        }

                        // Change button to endorsed
                        endorseButton.innerHTML = '<i class="fas fa-check"></i> Endorsed';
                        endorseButton.classList.add('endorsed');

                        // Show toast notification
                        showToast('Skill endorsed!');

                        // Remove the button after a short delay
                        setTimeout(() => {
                            endorseButton.remove();
                        }, 2000);
                    });

                    // Auto-close after clicking anywhere else
                    document.addEventListener('click', function closeEndorse(e) {
                        if (!e.target.closest('.skill-item')) {
                            endorseButton.remove();
                            document.removeEventListener('click', closeEndorse);
                        }
                    });
                });
            });

            // Helper functions
            function createContactModal() {
                // Create modal overlay
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';

                // Create modal content
                const modal = document.createElement('div');
                modal.className = 'contact-modal';
                modal.innerHTML = `
            <div class="modal-header">
                <h3>Contact John Anderson</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="contact-form">
                    <div class="form-group">
                        <label for="contact-subject">Subject</label>
                        <input type="text" id="contact-subject" placeholder="Enter subject" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" placeholder="Enter your message here..." rows="5" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="send-btn">Send Message</button>
                    </div>
                </form>
            </div>
        `;

                // Append modal to overlay, and overlay to body
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                // Add event listeners
                overlay.querySelector('.close-modal').addEventListener('click', () => {
                    overlay.remove();
                });

                overlay.querySelector('.cancel-btn').addEventListener('click', () => {
                    overlay.remove();
                });

                overlay.querySelector('#contact-form').addEventListener('submit', (e) => {
                    e.preventDefault();

                    // Get form values
                    const subject = document.getElementById('contact-subject').value;
                    const message = document.getElementById('contact-message').value;

                    // Show success message
                    overlay.innerHTML = `
                <div class="contact-modal success-modal">
                    <div class="modal-header">
                        <h3>Message Sent!</h3>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <p>Your message has been sent to John Anderson.</p>
                        <p>You can expect a response within 24-48 hours.</p>
                        <button class="ok-btn">OK</button>
                    </div>
                </div>
            `;

                    // Add event listeners to new elements
                    overlay.querySelector('.close-modal').addEventListener('click', () => {
                        overlay.remove();
                    });

                    overlay.querySelector('.ok-btn').addEventListener('click', () => {
                        overlay.remove();
                    });

                    // Show toast notification
                    showToast('Message sent successfully!');
                });

                // Close modal when clicking on overlay (not modal content)
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                    }
                });

                // Focus first input field
                setTimeout(() => {
                    document.getElementById('contact-subject').focus();
                }, 100);
            }

            function createMessageModal() {
                // Create modal overlay
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';

                // Create modal content
                const modal = document.createElement('div');
                modal.className = 'message-modal';
                modal.innerHTML = `
            <div class="modal-header">
                <h3>New Message</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="recipient">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" alt="John Anderson" class="recipient-avatar">
                    <div class="recipient-info">
                        <h4>John Anderson</h4>
                        <p>Senior IT Specialist & Leadership Coach</p>
                    </div>
                </div>
                <form id="message-form">
                    <div class="form-group">
                        <textarea id="message-text" placeholder="Type your message here..." rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="attachment-btn"><i class="fas fa-paperclip"></i></button>
                        <button type="submit" class="send-btn"><i class="fas fa-paper-plane"></i> Send</button>
                    </div>
                </form>
            </div>
        `;

                // Append modal to overlay, and overlay to body
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                // Add event listeners
                overlay.querySelector('.close-modal').addEventListener('click', () => {
                    overlay.remove();
                });

                overlay.querySelector('.attachment-btn').addEventListener('click', () => {
                    alert('Attachment functionality coming soon!');
                });

                overlay.querySelector('#message-form').addEventListener('submit', (e) => {
                    e.preventDefault();

                    // Get message text
                    const messageText = document.getElementById('message-text').value;

                    // Show success message
                    overlay.innerHTML = `
                <div class="message-modal success-modal">
                    <div class="modal-header">
                        <h3>Message Sent!</h3>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <p>Your message has been sent successfully.</p>
                        <button class="ok-btn">OK</button>
                    </div>
                </div>
            `;

                    // Add event listeners to new elements
                    overlay.querySelector('.close-modal').addEventListener('click', () => {
                        overlay.remove();
                    });

                    overlay.querySelector('.ok-btn').addEventListener('click', () => {
                        overlay.remove();
                    });

                    // Show toast notification
                    showToast('Message sent successfully!');
                });

                // Close modal when clicking on overlay (not modal content)
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.remove();
                    }
                });

                // Focus the message text area
                setTimeout(() => {
                    document.getElementById('message-text').focus();
                }, 100);
            }

            function loadMoreActivities(activityFeed) {
                // Sample data for additional activities
                const activities = [{
                        name: 'John Anderson',
                        action: 'published an article',
                        time: '1 week ago',
                        text: 'Check out my latest article on "Effective Leadership in IT Teams" - learn how to build high-performing tech teams through better communication and trust.',
                        imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3'
                    },
                    {
                        name: 'John Anderson',
                        action: 'commented on a post',
                        time: '2 weeks ago',
                        text: 'Great insights on cloud migration strategies! I\'d add that having a clear rollback plan is essential for any major infrastructure change.',
                        imageSrc: null
                    }
                ];

                // Create HTML for new activities
                const activityHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-avatar">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" alt="John Anderson">
                </div>
                <div class="activity-content">
                    <div class="activity-header">
                        <span class="activity-name">${activity.name}</span>
                        <span class="activity-action">${activity.action}</span>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                    <p class="activity-text">${activity.text}</p>
                    ${activity.imageSrc ? `<img src="${activity.imageSrc}" alt="Activity Image" class="activity-image">` : ''}
                    <div class="activity-actions">
                        <div class="activity-action-btn">
                            <i class="fas fa-thumbs-up"></i> Like
                        </div>
                        <div class="activity-action-btn">
                            <i class="fas fa-comment"></i> Comment
                        </div>
                        <div class="activity-action-btn">
                            <i class="fas fa-share"></i> Share
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Append new activities to feed
        activityFeed.innerHTML += activityHTML;
    }

    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Add visible class (for animation)
        setTimeout(() => {
            toast.classList.add('visible');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});