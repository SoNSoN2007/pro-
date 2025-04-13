document.addEventListener("DOMContentLoaded", function() {
    // Cache DOM elements with error handling
    const elements = {
        createPostInput: document.querySelector(".create-post input"),
        postOptions: document.querySelectorAll(".post-options button"),
        mediaUpload: document.getElementById("media-upload"),
        mediaPreview: document.getElementById("media-preview"),
        postInput: document.getElementById("post-input"),
        emojiPicker: document.getElementById("emoji-picker"),
        emojiButton: document.querySelector(".emoji-button"),
        postsContainer: document.querySelector(".posts"),
        header: document.querySelector("header"),
        themeToggle: document.querySelector(".theme-toggle")
    };

    // Theme toggle functionality with performance optimizations
    if (elements.themeToggle) {
        // Apply the saved theme on page load without animation
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        // Throttled theme toggle handler to prevent rapid toggles
        let isThemeChanging = false;
        elements.themeToggle.addEventListener('click', function() {
            // Prevent multiple rapid toggles
            if (isThemeChanging) return;
            isThemeChanging = true;

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Optimize by using requestAnimationFrame
            requestAnimationFrame(() => {
                // Add transitioning class for animation
                document.body.classList.add('theme-transitioning');

                // Set the new theme
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                // Update the theme toggle icon
                updateThemeIcon(newTheme);

                // Add subtle animation to the toggle button
                elements.themeToggle.classList.add('animating');

                // Use timeout to remove animation classes after transitions complete
                setTimeout(() => {
                    elements.themeToggle.classList.remove('animating');
                    document.body.classList.remove('theme-transitioning');
                    isThemeChanging = false;
                }, 300); // Match the CSS transition duration
            });
        });
    }

    // Optimized function to update the theme toggle icon
    function updateThemeIcon(theme) {
        if (!elements.themeToggle) return;

        // Cache icon SVGs as constants outside the function for better performance
        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

        // Batch DOM operations
        requestAnimationFrame(() => {
            elements.themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
            elements.themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }

    // Constants
    const ANIMATION_DURATION = 2000; // ms

    // Helper functions for media previews with improved accessibility
    function createImagePreview(src) {
        return `
        <div class="preview-container">
          <img src="${src}" alt="Image preview" class="preview-media">
          <button class="remove-media" aria-label="Remove media" tabindex="0">×</button>
        </div>
      `;
    }

    function createVideoPreview(src) {
        return `
        <div class="preview-container">
          <video src="${src}" controls class="preview-media" aria-label="Video preview"></video>
          <button class="remove-media" aria-label="Remove media" tabindex="0">×</button>
        </div>
      `;
    }

    // Function to remove media preview with improved error handling
    function removeMedia() {
        if (!elements.mediaPreview) return;

        try {
            elements.mediaPreview.style.display = "none";
            elements.mediaPreview.innerHTML = "";

            if (elements.mediaUpload) {
                elements.mediaUpload.value = ""; // Clear the file input
            }

            // Focus back on the post input for better UX
            if (elements.postInput) {
                elements.postInput.focus();
            }
        } catch (error) {
            console.error("Error removing media:", error);
        }
    }

    // Function to create a new post element with improved sanitization and accessibility
    function createNewPost(content, mediaSrc, mediaType) {
        try {
            const post = document.createElement("div");
            post.className = "post";
            post.setAttribute("role", "article");

            // Sanitize content to prevent XSS
            const sanitizedContent = document.createTextNode(content).textContent;

            // Build media HTML safely
            let mediaHTML = "";
            if (mediaSrc && mediaType) {
                if (mediaType === "img") {
                    const img = document.createElement("img");
                    img.src = mediaSrc;
                    img.alt = "Post media";
                    img.setAttribute("loading", "lazy"); // Add lazy loading

                    const postImageDiv = document.createElement("div");
                    postImageDiv.className = "post-image";
                    postImageDiv.appendChild(img);

                    const postContentDiv = document.createElement("div");
                    postContentDiv.className = "post-content";
                    postContentDiv.appendChild(postImageDiv);

                    mediaHTML = postContentDiv.outerHTML;
                } else {
                    const video = document.createElement("video");
                    video.src = mediaSrc;
                    video.controls = true;
                    video.style.width = "100%";
                    video.style.maxHeight = "500px";
                    video.style.objectFit = "cover";
                    video.setAttribute("preload", "metadata"); // Only preload metadata for better performance
                    video.setAttribute("aria-label", "Post video content");

                    const postContentDiv = document.createElement("div");
                    postContentDiv.className = "post-content";
                    postContentDiv.appendChild(video);

                    mediaHTML = postContentDiv.outerHTML;
                }
            }

            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            post.innerHTML = `
          <div class="post-header">
            <div class="user-avatar">
              <img src="https://i.pravatar.cc/150?img=32" alt="Your profile picture">
            </div>
            <div class="post-info">
              <h4>You</h4>
              <span>${timestamp}</span>
            </div>
          </div>
          <div class="post-text">
            <p>${sanitizedContent}</p>
          </div>
          ${mediaHTML}
          <div class="post-stats">
            <div class="reactions">
              <span>❤️ 0</span>
              <span>💬 0 comments</span>
              <span>🔄 0 shares</span>
            </div>
          </div>
          <div class="post-actions-buttons">
            <button aria-label="Like post" tabindex="0"><i class="far fa-thumbs-up"></i> Like</button>
            <button aria-label="Comment on post" tabindex="0"><i class="far fa-comment"></i> Comment</button>
            <button aria-label="Share post" tabindex="0"><i class="fas fa-share"></i> Share</button>
          </div>
        `;

            // Add event listeners to the new post's buttons
            initNewPostInteractions(post);

            return post;
        } catch (error) {
            console.error("Error creating new post:", error);
            // Return a fallback simple post if there's an error
            const errorPost = document.createElement("div");
            errorPost.className = "post";
            errorPost.innerHTML = `
                <div class="post-text">
                    <p>${content}</p>
                </div>
                <div class="post-stats">
                    <div class="reactions">
                        <span>Posted just now</span>
                    </div>
                </div>
            `;
            return errorPost;
        }
    }

    // Post input focus and blur effects using classes instead of inline styles with improved accessibility
    if (elements.createPostInput) {
        elements.createPostInput.addEventListener("focus", function() {
            this.classList.add("input-focused");
        });

        elements.createPostInput.addEventListener("blur", function() {
            this.classList.remove("input-focused");
        });

        // Post creation function with error handling
        function submitPost(input) {
            if (!input || input.value.trim() === "") return false;

            try {
                const mediaElement = elements.mediaPreview ? elements.mediaPreview.querySelector(".preview-media") : null;
                let mediaSrc = null;
                let mediaType = null;

                if (mediaElement) {
                    mediaSrc = mediaElement.src;
                    mediaType = mediaElement.tagName.toLowerCase();
                }

                const newPost = createNewPost(input.value.trim(), mediaSrc, mediaType);

                if (elements.postsContainer) {
                    // Add animation class for smooth appearance
                    newPost.classList.add("post-appear");
                    elements.postsContainer.insertBefore(newPost, elements.postsContainer.firstChild);

                    // Announce to screen readers that post was created
                    const announcement = document.createElement("div");
                    announcement.setAttribute("role", "status");
                    announcement.setAttribute("aria-live", "polite");
                    announcement.className = "sr-only";
                    announcement.textContent = "Post created successfully";
                    document.body.appendChild(announcement);

                    // Remove announcement after it's been read
                    setTimeout(() => announcement.remove(), 1000);
                }

                input.value = "";
                removeMedia();
                return true;
            } catch (error) {
                console.error("Error submitting post:", error);
                return false;
            }
        }

        // Post creation on Enter key press with debounce
        let isSubmitting = false;
        elements.createPostInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter" && this.value.trim() !== "" && !isSubmitting) {
                e.preventDefault(); // Prevent default Enter behavior
                isSubmitting = true;

                const success = submitPost(this);

                // Reset submission state after a short delay
                setTimeout(() => {
                    isSubmitting = false;
                }, success ? 500 : 100); // Longer delay if successful to prevent double posts
            }
        });

        // Add a submit button for mobile accessibility
        if (elements.postOptions) {
            const submitButton = document.createElement("button");
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Post';
            submitButton.className = "submit-post-btn";
            submitButton.setAttribute("aria-label", "Submit post");
            submitButton.addEventListener("click", function() {
                if (elements.createPostInput.value.trim() !== "" && !isSubmitting) {
                    isSubmitting = true;

                    const success = submitPost(elements.createPostInput);

                    setTimeout(() => {
                        isSubmitting = false;
                    }, success ? 500 : 100);
                }
            });

            // Add to post options if it exists
            const postOptionsContainer = document.querySelector(".post-options");
            if (postOptionsContainer) {
                postOptionsContainer.appendChild(submitButton);
            }
        }
    }

    // Post options hover effects using classes instead of inline styles with keyboard accessibility
    if (elements.postOptions) {
        elements.postOptions.forEach(button => {
            // Mouse events
            button.addEventListener("mouseenter", function() {
                this.classList.add("option-hover");
            });

            button.addEventListener("mouseleave", function() {
                this.classList.remove("option-hover");
            });

            // Keyboard accessibility
            button.addEventListener("focus", function() {
                this.classList.add("option-hover");
            });

            button.addEventListener("blur", function() {
                this.classList.remove("option-hover");
            });

            // Make sure all buttons have proper tabindex
            if (!button.hasAttribute("tabindex")) {
                button.setAttribute("tabindex", "0");
            }
        });
    }

    // Handle media upload with improved error handling, file size validation, and accessibility
    if (elements.mediaUpload && elements.mediaPreview) {
        elements.mediaUpload.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // File size validation (max 10MB)
            const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > MAX_FILE_SIZE) {
                // Create a more accessible error message
                const errorMessage = document.createElement("div");
                errorMessage.className = "error-message";
                errorMessage.setAttribute("role", "alert");
                errorMessage.textContent = "File is too large. Maximum size is 10MB.";

                // Insert error message before the media preview
                if (elements.mediaPreview.parentNode) {
                    elements.mediaPreview.parentNode.insertBefore(errorMessage, elements.mediaPreview);

                    // Remove the error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                }

                removeMedia();
                return;
            }

            // Show loading indicator
            elements.mediaPreview.style.display = "block";
            elements.mediaPreview.innerHTML = '<div class="loading-media">Loading media...</div>';

            const reader = new FileReader();

            reader.onload = function(e) {
                let previewHTML = "";

                try {
                    if (file.type.startsWith("image/")) {
                        previewHTML = createImagePreview(e.target.result);
                    } else if (file.type.startsWith("video/")) {
                        previewHTML = createVideoPreview(e.target.result);
                    } else {
                        throw new Error("Unsupported media type. Please upload an image or video file.");
                    }

                    elements.mediaPreview.innerHTML = previewHTML;

                    // Add event listeners to the remove button
                    const removeButton = elements.mediaPreview.querySelector(".remove-media");
                    if (removeButton) {
                        // Click event
                        removeButton.addEventListener("click", removeMedia);

                        // Keyboard accessibility
                        removeButton.addEventListener("keydown", function(e) {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                removeMedia();
                            }
                        });
                    }

                    // Announce to screen readers that media was uploaded
                    const announcement = document.createElement("div");
                    announcement.setAttribute("role", "status");
                    announcement.setAttribute("aria-live", "polite");
                    announcement.className = "sr-only";
                    announcement.textContent = `${file.type.startsWith("image/") ? "Image" : "Video"} uploaded successfully`;
                    document.body.appendChild(announcement);

                    // Remove announcement after it's been read
                    setTimeout(() => announcement.remove(), 1000);
                } catch (error) {
                    console.error("Media preview error:", error);

                    // Create a more accessible error message
                    const errorMessage = document.createElement("div");
                    errorMessage.className = "error-message";
                    errorMessage.setAttribute("role", "alert");
                    errorMessage.textContent = error.message || "Error displaying media.";

                    elements.mediaPreview.innerHTML = '';
                    elements.mediaPreview.appendChild(errorMessage);

                    // Remove the error message and media preview after 5 seconds
                    setTimeout(() => {
                        removeMedia();
                    }, 5000);
                }
            };

            reader.onerror = function() {
                console.error("FileReader error:", reader.error);

                // Create a more accessible error message
                const errorMessage = document.createElement("div");
                errorMessage.className = "error-message";
                errorMessage.setAttribute("role", "alert");
                errorMessage.textContent = "Error reading file. Please try again.";

                elements.mediaPreview.innerHTML = '';
                elements.mediaPreview.appendChild(errorMessage);

                // Remove the error message after 5 seconds
                setTimeout(() => {
                    removeMedia();
                }, 5000);
            };

            // Add timeout for large files
            const fileReadTimeout = setTimeout(() => {
                if (reader.readyState < 2) { // Still loading
                    reader.abort();

                    const errorMessage = document.createElement("div");
                    errorMessage.className = "error-message";
                    errorMessage.setAttribute("role", "alert");
                    errorMessage.textContent = "File loading timed out. Please try a smaller file.";

                    elements.mediaPreview.innerHTML = '';
                    elements.mediaPreview.appendChild(errorMessage);

                    setTimeout(() => {
                        removeMedia();
                    }, 5000);
                }
            }, 10000); // 10 second timeout

            try {
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("Error starting file read:", error);
                clearTimeout(fileReadTimeout);
                removeMedia();
            }
        });
    }

    // Handle emoji picker with improved implementation
    if (elements.emojiButton && elements.emojiPicker) {
        const emojis = [
            "😀", "😂", "😊", "😍", "🥰", "😎", "🤔", "😴", "😭", "😡", "👍", "👎", "❤️", "💔", "🎉"
        ];

        // Initialize emoji picker content once
        elements.emojiPicker.innerHTML = emojis
            .map(emoji => `<span class="emoji" role="button" tabindex="0" aria-label="Add emoji ${emoji}">${emoji}</span>`)
            .join("");

        // Add event listeners to all emoji elements
        elements.emojiPicker.querySelectorAll(".emoji").forEach(span => {
            span.addEventListener("click", () => {
                if (elements.postInput) {
                    elements.postInput.value += span.textContent;
                    elements.postInput.focus();
                    toggleEmojiPicker(false);
                }
            });

            // Keyboard accessibility
            span.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (elements.postInput) {
                        elements.postInput.value += span.textContent;
                        elements.postInput.focus();
                        toggleEmojiPicker(false);
                    }
                }
            });
        });

        elements.emojiButton.addEventListener("click", function(e) {
            e.preventDefault();
            toggleEmojiPicker();
        });

        // Toggle emoji picker visibility
        function toggleEmojiPicker(forceState) {
            const newState = forceState !== undefined ?
                forceState :
                (elements.emojiPicker.style.display === "none" || !elements.emojiPicker.style.display);

            elements.emojiPicker.style.display = newState ? "block" : "none";

            if (newState) {
                const firstEmoji = elements.emojiPicker.querySelector(".emoji");
                if (firstEmoji) firstEmoji.focus();
            }
        }

        // Close emoji picker when clicking outside
        document.addEventListener("click", function(e) {
            if (
                elements.emojiPicker &&
                !e.target.closest("#emoji-picker") &&
                !e.target.closest(".emoji-button")
            ) {
                toggleEmojiPicker(false);
            }
        });
    }

    // Initialize components
    function initPostCreation() {
        // This function now just serves as a namespace for post creation functionality
        // All the actual functionality has been moved to the appropriate scope
    }

    function initFriendRequests() {
        const confirmButtons = document.querySelectorAll(".btn-confirm");
        const deleteButtons = document.querySelectorAll(".btn-delete");

        confirmButtons.forEach(button => {
            button.addEventListener("click", function() {
                const request = this.closest(".request-item");
                if (!request) return;

                const notification = document.createElement("p");
                notification.textContent = "Friend request accepted!";
                notification.className = "request-notification";

                // Replace content with notification
                request.innerHTML = "";
                request.appendChild(notification);

                // Remove after animation duration
                setTimeout(() => {
                    request.classList.add("fade-out");
                    setTimeout(() => {
                        request.remove();
                    }, 300); // Fade out animation duration
                }, 2000);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const request = this.closest(".request-item");
                if (!request) return;

                request.classList.add("fade-out");
                setTimeout(() => {
                    request.remove();
                }, 300); // Animation duration
            });
        });
    }

    function initHeaderScroll(header) {
        if (!header) return;

        // Improved throttling for better performance
        let lastScrollY = window.scrollY;
        let ticking = false;
        let scrollThreshold = 10; // Only trigger class change after scrolling this many pixels

        // Add scroll event listener with throttling for better performance
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScrollY = window.scrollY;

                    // Only update if we've scrolled enough to matter
                    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                        // Add/remove header classes based on scroll direction
                        if (currentScrollY > lastScrollY && currentScrollY > 50) {
                            // Scrolling down & not at the top
                            header.classList.add('header-hidden');
                        } else {
                            // Scrolling up or at the top
                            header.classList.remove('header-hidden');
                        }

                        lastScrollY = currentScrollY;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    function initPostInteractions() {
        document.querySelectorAll(".post-actions-buttons button").forEach(attachPostButtonEvents);
    }

    function initNewPostInteractions(post) {
        if (!post) return;
        post.querySelectorAll(".post-actions-buttons button").forEach(attachPostButtonEvents);
    }

    function attachPostButtonEvents(button) {
        button.addEventListener("click", function() {
            const action = this.textContent.trim();

            if (action.includes("Like")) {
                this.classList.toggle("liked");
                const icon = this.querySelector("i");

                if (this.classList.contains("liked")) {
                    this.style.color = "#1877f2";
                    if (icon) {
                        icon.classList.remove("far");
                        icon.classList.add("fas");
                    }
                    this.setAttribute("aria-label", "Unlike post");
                } else {
                    this.style.color = "#65676b";
                    if (icon) {
                        icon.classList.remove("fas");
                        icon.classList.add("far");
                    }
                    this.setAttribute("aria-label", "Like post");
                }

                // Update reaction count (future enhancement)
                const reactionsEl = this.closest(".post").querySelector(".reactions span:first-child");
                if (reactionsEl) {
                    const currentCount = parseInt(reactionsEl.textContent.match(/\d+/) || "0");
                    const newCount = this.classList.contains("liked") ? currentCount + 1 : Math.max(0, currentCount - 1);
                    reactionsEl.textContent = `❤️ ${newCount}`;
                }
            }
        });
    }

    function initLazyLoading() {
        // Use Intersection Observer for efficient lazy loading
        if (!('IntersectionObserver' in window)) return;

        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute("loading");
                        img.removeAttribute("data-src");
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: "100px" // Start loading 100px before image enters viewport
        });

        images.forEach(img => imageObserver.observe(img));
    }

    function initSmoothScroll() {
        document.querySelectorAll(".trending-item").forEach(topic => {
            topic.addEventListener("click", function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        });
    }

    function initSearchAndCart() {
        const searchBtn = document.querySelector(".search-btn");
        if (searchBtn) {
            searchBtn.addEventListener("click", function(e) {
                e.preventDefault();
                console.log("Search clicked");
                // Implement your search functionality here
            });
        }

        const cartBtn = document.querySelector(".cart-btn");
        if (cartBtn) {
            cartBtn.addEventListener("click", function(e) {
                e.preventDefault();
                console.log("Cart clicked");
                // Implement your cart functionality here
            });
        }
    }

    function initKeyboardNavigation() {
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                const dropdown = document.querySelector(".dropdown-content");
                if (dropdown && dropdown.style.visibility === "visible") {
                    dropdown.style.visibility = "hidden";
                    dropdown.style.opacity = "0";
                }

                // Also close emoji picker
                const emojiPicker = document.getElementById("emoji-picker");
                if (emojiPicker && emojiPicker.style.display === "block") {
                    emojiPicker.style.display = "none";
                }
            }
        });
    }

    // Initialize all components
    initPostCreation();
    initFriendRequests();
    initHeaderScroll(elements.header);
    initPostInteractions();
    initLazyLoading();
    initSmoothScroll();
    initSearchAndCart();
    initKeyboardNavigation();
});

// Live video function (exposed to global scope)
window.startLiveVideo = function() {
    alert("Live video feature coming soon!");
};