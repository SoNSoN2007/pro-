// AI Chatbot Configuration
const CHATBOT_CONFIG = {
    apiKey: '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', // Replace with your actual API key
    apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions', // Replace with your actual API endpoint
    modelName: 'qwen/qwen-2.5-7b-instruct:free', // Optional: specify which model to use
    maxTokens: 800 // Increased from 200 to allow for more detailed responses
};

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
            // Initialize theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);

            // Add theme toggle event listener
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    setTheme(newTheme);
                });
            }

            const chatListContainer = document.querySelector('.chat-list');
            const chatMessagesContainer = document.querySelector('.chat-messages');
            const messageInput = document.querySelector('.input-container input');
            const sendButton = document.querySelector('.send-btn');
            const filterButtons = document.querySelectorAll('.chat-filters button');
            const chatHeaderName = document.querySelector('.chat-header .chat-info h3');
            const chatHeaderAvatar = document.querySelector('.chat-header .profile-pic');
            const chatHeaderStatus = document.querySelector('.chat-header .status');

            // Search elements
            const sidebarSearchInput = document.querySelector('.search-bar input');
            const chatSearchBtn = document.getElementById('chat-search-btn');
            const chatSearchContainer = document.querySelector('.chat-search-container');
            const chatSearchInput = document.getElementById('chat-search-input');
            const chatSearchClose = document.querySelector('.chat-search-close');
            const searchResultsCount = document.querySelector('.search-results-count');
            const searchPrevBtn = document.querySelector('.search-prev');
            const searchNextBtn = document.querySelector('.search-next');

            const chatList = [{
                    name: 'John Smith',
                    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
                    messages: [
                        { text: "Hi Clint! I need help with my resume.", type: "sent", important: false, read: false },
                        { text: "Sure, John! Let's work on your resume today.", type: "received", important: false, read: false }
                    ],
                    time: '10:30',
                    unread: 1,
                    online: true,
                    blocked: false,
                    important: false
                },
                {
                    name: 'Sarah Johnson',
                    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
                    messages: [
                        { text: "Can we go over my interview prep next?", type: "sent", important: false, read: false },
                        { text: "Absolutely! I'll help you prep for the interview.", type: "received", important: false, read: false }
                    ],
                    time: '09:15',
                    unread: 0,
                    online: false,
                    important: false
                },
                {
                    name: 'Mark Williams',
                    avatar: 'https://ui-avatars.com/api/?name=Mark+Williams&background=random',
                    messages: [
                        { text: "I received great feedback on the job applications!", type: "sent", important: false, read: false },
                        { text: "That's awesome, Mark! Keep up the great work.", type: "received", important: false, read: false }
                    ],
                    time: 'Yesterday',
                    unread: 2,
                    online: true,
                    important: false
                },
                {
                    name: 'DreamCoach AI',
                    avatar: 'https://ui-avatars.com/api/?name=Dream+Coach&background=0D8ABC',
                    messages: [
                        { text: "Hello! I'm DreamCoach, your AI career advisor. I'm here to help with resume writing, interview preparation, job search strategies, and career planning. How can I support your professional journey today?", type: "received", important: false, read: true }
                    ],
                    time: 'Now',
                    unread: 0,
                    online: true,
                    isAI: true,
                    important: false
                },
                {
                    name: 'Emma Davis',
                    avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=random',
                    messages: [
                        { text: "Can we schedule a career coaching call?", type: "sent", important: false, read: false },
                        { text: "Of course, Emma! When would be a good time for you?", type: "received", important: false, read: false }
                    ],
                    time: 'Yesterday',
                    unread: 0,
                    online: false,
                    important: false
                }
            ];

            // Load saved chat history from localStorage if available
            const savedAIChat = localStorage.getItem('dreamCoachAIChatHistory');
            if (savedAIChat) {
                try {
                    const parsedAIChat = JSON.parse(savedAIChat);
                    // Find the AI Chatbot in our default list
                    const aiChatIndex = chatList.findIndex(chat => chat.isAI);
                    if (aiChatIndex !== -1 && parsedAIChat.messages) {
                        chatList[aiChatIndex].messages = parsedAIChat.messages;
                    }
                } catch (error) {
                    console.error('Error loading saved chat history:', error);
                }
            }

            // Function to render the chat list with animations
            function renderChatList(filter = 'all') {
                chatListContainer.innerHTML = ''; // Clear chat list

                // Apply filter to chatList
                let filteredChats = [...chatList];

                if (filter === 'unread') {
                    filteredChats = chatList.filter(chat => chat.unread > 0);
                } else if (filter === 'important') {
                    filteredChats = chatList.filter(chat => chat.important);
                }

                filteredChats.forEach(chat => {
                            const chatItem = document.createElement('div');
                            chatItem.className = 'chat-item';

                            // Add visual indicator for important chats
                            if (chat.important) {
                                chatItem.classList.add('important-chat');
                            }

                            const lastMessage = chat.messages.length > 0 ?
                                chat.messages[chat.messages.length - 1].text : '';

                            chatItem.innerHTML = `
                <div class="chat-item-content">
                    <img src="${chat.avatar}" alt="${chat.name}" class="profile-pic">
                    <div class="chat-item-info">
                        <h4>${chat.name} ${chat.isAI ? '<span class="ai-badge">AI</span>' : ''} ${chat.important ? '<span class="important-badge">★</span>' : ''}</h4>
                        <p>${lastMessage}</p>
                    </div>
                    <div class="chat-item-meta">
                        <span class="time">${chat.time}</span>
                        ${chat.unread > 0 ? `<span class="unread-count">${chat.unread}</span>` : ''}
                    </div>
                </div>
            `;
            chatListContainer.appendChild(chatItem);

            // Add click event to each chat item
            chatItem.addEventListener('click', () => {
                openChat(chat);
                chat.unread = 0; // Mark messages as read
                renderChatList(filter);
            });
        });
        
        // Add message when no chats match the filter
        if (filteredChats.length === 0) {
            const noChatsMessage = document.createElement('div');
            noChatsMessage.className = 'no-chats-message';
            noChatsMessage.textContent = filter === 'unread' ? 
                'No unread messages' : 
                (filter === 'important' ? 'No important chats' : 'No chats available');
            chatListContainer.appendChild(noChatsMessage);
        }
    }

    // Function to create and show a loading animation
    function showLoadingAnimation(container, messageType = 'received') {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = `message typing ${messageType}`;
        typingIndicator.innerHTML = `
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="loading-text">Processing</span>
        `;
        container.appendChild(typingIndicator);
        container.scrollTop = container.scrollHeight;
        
        // Start the loading text animation
        let loadingText = typingIndicator.querySelector('.loading-text');
        let loadingDots = '';
        const loadingInterval = setInterval(() => {
            loadingDots = loadingDots.length >= 3 ? '' : loadingDots + '.';
            loadingText.textContent = messageType === 'sent' ? 'Sending' + loadingDots : 'Processing' + loadingDots;
        }, 500);
        
        return { element: typingIndicator, interval: loadingInterval };
    }
    
    // Function to remove loading animation
    function hideLoadingAnimation(container, loadingInfo) {
        if (loadingInfo) {
            clearInterval(loadingInfo.interval);
            if (loadingInfo.element && loadingInfo.element.parentNode === container) {
                container.removeChild(loadingInfo.element);
            }
        }
    }

    // Function to add a message to the chat
    function addMessage(text, type, important = false) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        if (type === 'system') {
            message.style.backgroundColor = '#f8f9fa';
            message.style.color = '#6c757d';
            message.style.textAlign = 'center';
            message.style.fontStyle = 'italic';
        }
        
        // Format links in messages
        const formattedText = text.replace(/https?:\/\/[^\s]+/g, url => `<a href="${url}" target="_blank">${url}</a>`);
        message.innerHTML = formattedText;
        
        if (important) {
            message.classList.add('important-message');
            message.style.fontWeight = 'bold';
            message.style.borderLeft = '3px solid gold';
        }
        
        // Add a subtle animation for new messages
        message.style.opacity = '0';
        message.style.transform = 'translateY(10px)';
        
        chatMessagesContainer.appendChild(message);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        
        // Trigger animation
        setTimeout(() => {
            message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 10);
    }

    // Function to open a chat
    function openChat(chat) {
        // Update the chat header with the new name and avatar
        chatHeaderName.textContent = chat.name;
        chatHeaderAvatar.src = chat.avatar;
        chatHeaderStatus.textContent = chat.blocked ? "Blocked" : (chat.online ? "Online" : "Offline");
        chatHeaderStatus.style.color = chat.blocked ? '#ff4444' : '';

        // Update block button text
        const blockUserBtn = document.getElementById('block-user');
        if (blockUserBtn && !chat.isAI) {
            blockUserBtn.innerHTML = chat.blocked ? '<i class="fas fa-unlock"></i> Unblock User' : '<i class="fas fa-ban"></i> Block User';
            blockUserBtn.title = chat.blocked ? 'Unblock User' : 'Block User';
        }

        // Update important button text
        const addImportantBtn = document.getElementById('add-important');
        if (addImportantBtn) {
            addImportantBtn.innerHTML = chat.important ? 
                '<i class="fas fa-star"></i> Remove from Important' : 
                '<i class="fas fa-star"></i> Add to Important';
        }

        // Clear the current chat messages
        chatMessagesContainer.innerHTML = '';

        // Add each message to the chat window
        chat.messages.forEach((message, index) => {
            if (!chat.blocked || message.type === 'system' || message.type === 'sent') {
                setTimeout(() => {
                    addMessage(message.text, message.type, message.important);
                }, index * 100); // Stagger each message by 100ms
            }
        });
        
        // If this is the AI chatbot and it's the first time opening it, show additional welcome message
        if (chat.isAI && chat.messages.length <= 1) {
            setTimeout(() => {
                const welcomeMessage = "I'm specialized in career development and can help with resume reviews, interview preparation, job search strategies, career transitions, and professional growth planning. What specific career challenge are you facing today?";
                chat.messages.push({ text: welcomeMessage, type: "received", important: false, read: true });
                addMessage(welcomeMessage, "received");
            }, chat.messages.length * 100 + 500);
        }

        // Update input state for blocked chats
        if (chat.blocked && !chat.isAI) {
            messageInput.disabled = true;
            sendButton.disabled = true;
            messageInput.placeholder = "You cannot send messages to this user";
        } else {
            messageInput.disabled = false;
            sendButton.disabled = false;
            messageInput.placeholder = "Type your message...";
        }

        // Focus the input field if not disabled
        if (!messageInput.disabled) {
            messageInput.focus();
        }
        
        // Mark all messages as read when opening the chat
        chat.messages.forEach(message => {
            message.read = true;
        });
        chat.unread = 0;
        
        // Re-render chat list to update unread counts
        const activeFilter = document.querySelector('.chat-filters button.active').textContent.toLowerCase();
        renderChatList(activeFilter);
    }

    // Function to call AI chatbot API with enhanced system prompt
    async function callAIChatbotAPI(message) {
        // Check if API key is configured and valid
        if (!CHATBOT_CONFIG.apiKey || CHATBOT_CONFIG.apiKey.startsWith('sk-or-') === false) {
            return "Please configure a valid API key.";
        }
        
        // Show loading animation for received message
        const loadingInfo = showLoadingAnimation(chatMessagesContainer, 'received');
        
        try {
            // Career coach system prompt
            const systemPrompt = `You are DreamCoach, an empathetic and insightful career coach. Your purpose is to help individuals navigate their professional development, job searches, and career transitions.

PERSONALITY:
- Supportive and encouraging, but honest and realistic
- Thoughtful and reflective, considering the whole person
- Structured and methodical in your approach to career planning
- Knowledgeable about diverse industries and roles

EXPERTISE AREAS:
- Resume and cover letter improvement
- Interview preparation and technique
- Career path planning and exploration
- Professional networking strategies
- Work-life balance and burnout prevention

INTERACTION APPROACH:
1. Begin by understanding the person's current situation and goals
2. Ask thoughtful questions that help them gain new insights
3. Provide specific, actionable advice rather than generic suggestions
4. Share relevant resources, techniques, or frameworks when helpful
5. Encourage reflection and self-discovery
6. Follow up on previous conversations and celebrate progress

LIMITATIONS:
- Avoid making promises about specific job outcomes
- Don't provide legal or financial advice
- Acknowledge when specialized knowledge might be needed

FORMAT YOUR RESPONSES:
- Keep responses concise but meaningful (within ${CHATBOT_CONFIG.maxTokens} tokens)
- For advice: Provide clear, step-by-step guidance
- For feedback: Balance constructive criticism with positive reinforcement
- For exercises: Give clear instructions and explain the purpose
- Always end with an encouraging note or a thoughtful question to continue the conversation`;
            
            try {
                // Make API call to the chatbot service using the configuration
                const response = await fetch(CHATBOT_CONFIG.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${CHATBOT_CONFIG.apiKey}`,
                        'HTTP-Referer': 'http://localhost', // Required by OpenRouter
                        'X-Title': 'DreamCoach AI'          // Optional but helpful
                    },
                    body: JSON.stringify({
                        model: CHATBOT_CONFIG.modelName,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: message }
                        ],
                        max_tokens: CHATBOT_CONFIG.maxTokens
                    })
                });
                
                // Hide loading animation
                hideLoadingAnimation(chatMessagesContainer, loadingInfo);
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                
                const data = await response.json();
                return data.choices?.[0]?.message?.content || "No response from AI.";
            } catch (fetchError) {
                console.error('Network error calling AI chatbot API:', fetchError);
                throw fetchError;
            }
        } catch (error) {
            console.error('Error calling AI chatbot API:', error);
            // Hide loading animation if there was an error
            hideLoadingAnimation(chatMessagesContainer, loadingInfo);
            return "Sorry, I'm having trouble connecting right now. Please try again later.";
        }
    }
    
    // Function to toggle message importance
    function toggleMessageImportance(message, messageElement) {
        message.important = !message.important;
        if (message.important) {
            messageElement.classList.add('important-message');
            messageElement.style.fontWeight = 'bold';
            messageElement.style.borderLeft = '3px solid gold';
        } else {
            messageElement.classList.remove('important-message');
            messageElement.style.fontWeight = '';
            messageElement.style.borderLeft = '';
        }
    }
    
    // Send message function
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const activeChat = chatList.find(chat => chat.name === chatHeaderName.textContent);
            
            // Check if message should be marked as important
            const checkForImportant = messageText.toLowerCase().includes('important') || 
                                     messageText.toLowerCase().includes('urgent') || 
                                     messageText.toLowerCase().includes('priority');
            
            // Add the sent message to the active chat
            activeChat.messages.push({ 
                text: messageText, 
                type: 'sent', 
                important: checkForImportant, 
                read: true 
            });
            
            // Save AI chat history if this is the AI chatbot
            if (activeChat.isAI) {
                localStorage.setItem('dreamCoachAIChatHistory', JSON.stringify(activeChat));
            }

            // Add sent message to the chat window
            addMessage(messageText, 'sent', checkForImportant);

            // Clear input
            messageInput.value = '';
            
            // Show sending animation
            const sendingLoadingInfo = showLoadingAnimation(chatMessagesContainer, 'sent');
            
            // Hide sending animation after a short delay
            setTimeout(() => {
                hideLoadingAnimation(chatMessagesContainer, sendingLoadingInfo);
            }, 800);

            // Check if this is the AI chatbot
            if (activeChat.isAI) {
                // Call the AI chatbot API
                callAIChatbotAPI(messageText).then(response => {
                    // Add received message to the chat
                    activeChat.messages.push({ text: response, type: 'received', important: false, read: true });
                    addMessage(response, 'received');
                    
                    // Save AI chat history after receiving response
                    localStorage.setItem('dreamCoachAIChatHistory', JSON.stringify(activeChat));
                });
            } else {
                // For regular chats, show loading animation and simulate received message
                const regularChatLoadingInfo = showLoadingAnimation(chatMessagesContainer, 'received');
                
                // Simulate received message after 1 second
                setTimeout(() => {
                    // Hide loading animation
                    hideLoadingAnimation(chatMessagesContainer, regularChatLoadingInfo);
                    
                    const randomResponse = [
                        "Great job! Let's keep improving your CV.",
                        "I'll get back to you soon with more interview tips.",
                        "That sounds great! Keep it up.",
                        "Let me check and get back to you soon.",
                        "Perfect! Thanks for the update."
                    ][Math.floor(Math.random() * 5)];

                    // Add received message to the chat
                    const newMessage = { text: randomResponse, type: 'received', important: false, read: true };
                    activeChat.messages.push(newMessage);
                    addMessage(randomResponse, 'received');
                    
                    // Increase unread count for other chats
                    chatList.forEach(chat => {
                        if (chat.name === activeChat.name) {
                            // This is the active chat, so no unread messages
                            return;
                        }
                        
                        // For demo purposes, randomly mark some messages as unread
                        if (Math.random() > 0.7) {
                            chat.unread += 1;
                        }
                    });
                    
                    // Update chat list to reflect unread changes
                    const activeFilter = document.querySelector('.chat-filters button.active').textContent.toLowerCase();
                    renderChatList(activeFilter);
                }, 1000);
            }
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Handle "Enter" key to send message
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.textContent.toLowerCase();
            const searchQuery = sidebarSearchInput.value;
            renderChatList(filter, searchQuery);
        });
    });
    
    // Sidebar search functionality
    sidebarSearchInput.addEventListener('input', function() {
        const searchQuery = this.value;
        const activeFilter = document.querySelector('.chat-filters button.active').textContent.toLowerCase();
        renderChatList(activeFilter, searchQuery);
    });

    // Initial render of the chat list
    renderChatList('all');

    // Settings dropdown click handler
    const settingsDropdownBtn = document.querySelector('.settings-dropdown .action-btn');
    const settingsDropdown = document.querySelector('.settings-dropdown');

    // Toggle dropdown on click instead of hover
    if (settingsDropdownBtn && settingsDropdown) {
        settingsDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            settingsDropdown.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (settingsDropdown && !settingsDropdown.contains(e.target) && 
            !e.target.matches('.settings-dropdown .action-btn')) {
            settingsDropdown.classList.remove('active');
        }
    });

    // Handle New Button functionality
    const newButton = document.getElementById('new-button');
    if (newButton) {
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your custom functionality here
            alert('New button clicked!');
        });
    }

    // Handle Delete Chat functionality
    const deleteChatBtn = document.getElementById('delete-chat');
    if (deleteChatBtn) {
        deleteChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Get the current active chat name
            const currentChatName = chatHeaderName.textContent;

            // Find the chat in the list and remove it
            const chatIndex = chatList.findIndex(chat => chat.name === currentChatName);
            if (chatIndex !== -1) {
                // Confirm before deleting
                if (confirm(`Are you sure you want to delete the chat with ${currentChatName}?`)) {
                    chatList.splice(chatIndex, 1);

                    // Re-render the chat list
                    const activeFilter = document.querySelector('.chat-filters button.active').textContent.toLowerCase();
                    renderChatList(activeFilter);

                    // Clear the current chat area
                    chatMessagesContainer.innerHTML = '';
                    chatHeaderName.textContent = '';
                    chatHeaderStatus.textContent = '';
                    chatHeaderAvatar.src = '';

                    // Close the dropdown
                    settingsDropdown.classList.remove('active');
                }
            }
        });
    }

    // Clear chat functionality
    const clearChatBtn = document.getElementById('clear-chat');
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const activeChat = chatList.find(chat => chat.name === chatHeaderName.textContent);
            if (activeChat) {
                // Clear all messages except the first one for AI chatbot
                if (activeChat.isAI && activeChat.messages.length > 0) {
                    const firstMessage = activeChat.messages[0];
                    activeChat.messages = [firstMessage];
                } else {
                    activeChat.messages = [];
                }
                
                // Clear the chat window
                chatMessagesContainer.innerHTML = '';
                
                // Add confirmation message
                const confirmationMessage = "Conversation has been cleared.";
                addMessage(confirmationMessage, "system");
                activeChat.messages.push({ text: confirmationMessage, type: "system", important: false, read: true });
                
                // Save AI chat history if this is the AI chatbot
                if (activeChat.isAI) {
                    localStorage.setItem('dreamCoachAIChatHistory', JSON.stringify(activeChat));
                }
                
                // Close the dropdown
                settingsDropdown.classList.remove('active');
            }
        });
    }

    // Handle Block/Unblock User functionality
    const blockUserBtn = document.getElementById('block-user');
    if (blockUserBtn) {
        blockUserBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentChatName = chatHeaderName.textContent;
            const activeChat = chatList.find(chat => chat.name === currentChatName);

            if (activeChat && !activeChat.isAI) {
                // Toggle blocked status with confirmation
                const newBlockedStatus = !activeChat.blocked;
                const action = newBlockedStatus ? 'block' : 'unblock';

                if (confirm(`Are you sure you want to ${action} ${currentChatName}?`)) {
                    // Update the blocked status for the active chat
                    activeChat.blocked = newBlockedStatus;
                    blockUserBtn.innerHTML = activeChat.blocked ? '<i class="fas fa-unlock"></i> Unblock User' : '<i class="fas fa-ban"></i> Block User';
                    blockUserBtn.title = activeChat.blocked ? 'Unblock User' : 'Block User';
                    chatHeaderStatus.textContent = activeChat.blocked ? 'Blocked' : (activeChat.online ? 'Online' : 'Offline');
                    chatHeaderStatus.style.color = activeChat.blocked ? '#ff4444' : '';

                    // Update input state
                    messageInput.disabled = activeChat.blocked;
                    sendButton.disabled = activeChat.blocked;
                    messageInput.placeholder = activeChat.blocked ? 
                        "You cannot send messages to this user" : 
                        "Type your message...";

                    // Show confirmation message
                    const confirmationMessage = activeChat.blocked ?
                        `${currentChatName} has been blocked. Their messages will be hidden.` :
                        `${currentChatName} has been unblocked. Their messages are now visible.`;

                    // Add system message
                    addMessage(confirmationMessage, 'system');
                    activeChat.messages.push({ text: confirmationMessage, type: "system", important: false, read: true });

                    // Re-render messages to reflect blocked status
                    chatMessagesContainer.innerHTML = '';
                    activeChat.messages.forEach((message, index) => {
                        if (!activeChat.blocked || message.type === 'system' || message.type === 'sent') {
                            setTimeout(() => {
                                addMessage(message.text, message.type, message.important);
                            }, index * 100);
                        }
                    });

                    // Close the dropdown
                    if (settingsDropdown) {
                        settingsDropdown.classList.remove('active');
                    }
                }
            }
        });
    }

    // Handle Add to Important functionality
    const addImportantBtn = document.getElementById('add-important');
    if (addImportantBtn) {
        addImportantBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentChatName = chatHeaderName.textContent;
            const activeChat = chatList.find(chat => chat.name === currentChatName);
        
            if (activeChat) {
                // Toggle important status
                activeChat.important = !activeChat.important;
                addImportantBtn.innerHTML = activeChat.important ? 
                    '<i class="fas fa-star"></i> Remove from Important' : 
                    '<i class="fas fa-star"></i> Add to Important';
        
                // Add or remove the visual indicator on the chat header
                if (activeChat.important) {
                    // Add a star or other visual indicator to the chat header
                    if (!chatHeaderName.querySelector('.important-indicator')) {
                        const importantIndicator = document.createElement('span');
                        importantIndicator.className = 'important-indicator';
                        importantIndicator.textContent = ' ★';
                        importantIndicator.style.color = 'gold';
                        chatHeaderName.appendChild(importantIndicator);
                    }
                } else {
                    // Remove the visual indicator
                    const indicator = chatHeaderName.querySelector('.important-indicator');
                    if (indicator) {
                        chatHeaderName.removeChild(indicator);
                    }
                }
                
                // Show confirmation message
                const confirmationMessage = activeChat.important ?
                    `${currentChatName} has been added to Important.` :
                    `${currentChatName} has been removed from Important.`;
        
                addMessage(confirmationMessage, 'system');
                activeChat.messages.push({ text: confirmationMessage, type: "system", important: false, read: true });
                
                // Re-render the chat list to reflect changes
                const activeFilter = document.querySelector('.chat-filters button.active').textContent.toLowerCase();
                renderChatList(activeFilter);
        
                // Close the dropdown
                settingsDropdown.classList.remove('active');
            }
        });
    }
    
    // Add CSS for unread and important styling
    const style = document.createElement('style');
    style.textContent = `
        .important-chat {
            background-color: rgba(255, 215, 0, 0.1);
        }
        .important-badge {
            color: gold;
            margin-left: 5px;
        }
        .important-message {
            border-left: 3px solid gold;
            padding-left: 10px;
        }
        .unread-count {
            background-color: #4CAF50;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
        }
        .no-chats-message {
            text-align: center;
            padding: 20px;
            color: #6c757d;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listener for contacts toggle button in video call
    const contactsToggleBtn = document.querySelector('.contacts-header .toggle-btn');
    const contactsList = document.querySelector('.contacts-list');
    
    if (contactsToggleBtn && contactsList) {
        contactsToggleBtn.addEventListener('click', function() {
            contactsList.classList.toggle('collapsed');
            const icon = contactsToggleBtn.querySelector('i');
            if (icon) {
                if (contactsList.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            }
        });
    }

    // Open AI chat by default
    const aiChat = chatList.find(chat => chat.isAI);
    if (aiChat) {
        openChat(aiChat);
    }
    
    // In-chat search functionality
    let searchResults = [];
    let currentResultIndex = -1;
    
    // Toggle chat search bar
    chatSearchBtn.addEventListener('click', function() {
        chatSearchContainer.style.display = chatSearchContainer.style.display === 'none' ? 'flex' : 'none';
        if (chatSearchContainer.style.display === 'flex') {
            chatSearchInput.focus();
        } else {
            // Clear search when closing
            clearChatSearch();
        }
    });
    
    // Close chat search
    chatSearchClose.addEventListener('click', function() {
        chatSearchContainer.style.display = 'none';
        clearChatSearch();
    });
    
    // Search in current chat messages
    chatSearchInput.addEventListener('input', function() {
        const searchQuery = this.value.trim().toLowerCase();
        if (searchQuery === '') {
            clearChatSearch();
            return;
        }
        
        searchInCurrentChat(searchQuery);
    });
    
    // Navigate to previous search result
    searchPrevBtn.addEventListener('click', function() {
        if (currentResultIndex > 0) {
            currentResultIndex--;
            highlightCurrentResult();
        }
    });
    
    // Navigate to next search result
    searchNextBtn.addEventListener('click', function() {
        if (currentResultIndex < searchResults.length - 1) {
            currentResultIndex++;
            highlightCurrentResult();
        }
    });
    
    // Function to search in current chat
    function searchInCurrentChat(query) {
        // Clear previous results
        clearHighlights();
        searchResults = [];
        currentResultIndex = -1;
        
        // Get current chat name
        const currentChatName = chatHeaderName.textContent;
        const activeChat = chatList.find(chat => chat.name === currentChatName);
        
        if (!activeChat) return;
        
        // Get all message elements
        const messageElements = chatMessagesContainer.querySelectorAll('.message');
        
        // Find matches in messages
        messageElements.forEach((element, index) => {
            const messageText = element.textContent.toLowerCase();
            if (messageText.includes(query)) {
                searchResults.push({
                    element: element,
                    index: index
                });
            }
        });
        
        // Update search results count
        updateSearchResultsCount();
        
        // Highlight first result if available
        if (searchResults.length > 0) {
            currentResultIndex = 0;
            highlightCurrentResult();
        }
    }
    
    // Function to update search results count
    function updateSearchResultsCount() {
        if (searchResults.length === 0) {
            searchResultsCount.textContent = 'No results found';
            searchPrevBtn.disabled = true;
            searchNextBtn.disabled = true;
        } else {
            searchResultsCount.textContent = `${currentResultIndex + 1} of ${searchResults.length} results`;
            searchPrevBtn.disabled = currentResultIndex <= 0;
            searchNextBtn.disabled = currentResultIndex >= searchResults.length - 1;
        }
    }
    
    // Function to highlight current search result
    function highlightCurrentResult() {
        if (currentResultIndex >= 0 && currentResultIndex < searchResults.length) {
            // Clear previous highlights
            clearHighlights();
            
            // Highlight current result
            const currentResult = searchResults[currentResultIndex];
            currentResult.element.classList.add('highlighted');
            
            // Scroll to the highlighted message
            currentResult.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Update search results count
            updateSearchResultsCount();
        }
    }
    
    // Function to clear highlights
    function clearHighlights() {
        const highlightedElements = chatMessagesContainer.querySelectorAll('.highlighted');
        highlightedElements.forEach(element => {
            element.classList.remove('highlighted');
        });
    }
    
    // Function to clear chat search
    function clearChatSearch() {
        chatSearchInput.value = '';
        clearHighlights();
        searchResults = [];
        currentResultIndex = -1;
        searchResultsCount.textContent = '';
        searchPrevBtn.disabled = true;
        searchNextBtn.disabled = true;
    }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
let searchTimeout;

// Debounced search function
function handleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const chatItems = document.querySelectorAll('.chat-item');

        chatItems.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const lastMessage = item.querySelector('p').textContent.toLowerCase();
            const matchesSearch = name.includes(searchTerm) || lastMessage.includes(searchTerm);

            // Add/remove animation classes
            if (matchesSearch) {
                item.style.display = '';
                item.style.animation = 'slideIn 0.3s ease-out';
            } else {
                item.style.display = 'none';
            }
        });

        // Show no results message if needed
        const noResultsMsg = document.querySelector('.no-results-message') || document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.textContent = 'No chats found';

        const visibleChats = Array.from(chatItems).some(item => item.style.display !== 'none');
        if (!visibleChats && searchTerm) {
            chatListContainer.appendChild(noResultsMsg);
        } else if (noResultsMsg.parentNode) {
            noResultsMsg.remove();
        }
    }, 300); // Debounce delay
}

// Add search event listener
searchInput.addEventListener('input', handleSearch);