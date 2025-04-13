// Video Call Functionality using Jitsi Meet
document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const videoCallBtn = document.querySelector('.action-btn[title="Video Call"]');
            const chatContainer = document.querySelector('.chat-main');
            const videoCallContainer = document.querySelector('.video-call-container');
            const endCallBtn = document.querySelector('.control-btn.end-call');
            const micBtn = document.querySelector('.control-btn.mic');
            const cameraBtn = document.querySelector('.control-btn.camera');
            const videoChatInput = document.querySelector('.video-chat-input input');
            const videoChatSendBtn = document.querySelector('.video-chat-input button');
            const videoChatMessages = document.querySelector('.video-chat-messages');
            const contactsToggleBtn = document.querySelector('.contacts-header .toggle-btn');
            const contactsList = document.querySelector('.contacts-list');
            const fullscreenBtn = document.createElement('button');
            fullscreenBtn.className = 'control-btn fullscreen';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            fullscreenBtn.title = 'Toggle Fullscreen';

            if (document.querySelector('.video-controls')) {
                document.querySelector('.video-controls').appendChild(fullscreenBtn);
            }

            let jitsiApi = null;
            let isMicMuted = false;
            let isCameraOff = false;
            let isFullscreen = false;
            let callInProgress = false;
            let participantsMap = new Map();
            let roomName = '';

            // Notification function
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `video-notification ${type}`;
                notification.textContent = message;
                videoCallContainer.appendChild(notification);

                setTimeout(() => {
                    notification.classList.add('show');
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            notification.remove();
                        }, 300);
                    }, 3000);
                }, 100);
            }

            // Initialize Jitsi Meet API with error handling
            function initJitsiMeet() {
                try {
                    const domain = 'meet.jit.si';
                    roomName = 'dreamcoach_' + Math.random().toString(36).substring(2, 15);

                    const options = {
                        roomName: roomName,
                        width: '100%',
                        height: '100%',
                        parentNode: document.querySelector('#jitsiContainer'),
                        interfaceConfigOverwrite: {
                            TOOLBAR_BUTTONS: [
                                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                                'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                                'security'
                            ],
                            SHOW_JITSI_WATERMARK: false,
                            SHOW_WATERMARK_FOR_GUESTS: false,
                            DEFAULT_BACKGROUND: '#1a1a1a',
                            DEFAULT_REMOTE_DISPLAY_NAME: 'Dream Coach User',
                            TOOLBAR_ALWAYS_VISIBLE: false,
                            MOBILE_APP_PROMO: false
                        },
                        configOverwrite: {
                            startWithAudioMuted: false,
                            startWithVideoMuted: false,
                            disableDeepLinking: true,
                            prejoinPageEnabled: false,
                            enableClosePage: false,
                            disableInviteFunctions: false
                        }
                    };

                    return new JitsiMeetExternalAPI(domain, options);
                } catch (error) {
                    console.error('Failed to initialize Jitsi Meet:', error);
                    showNotification('Failed to initialize video call. Please try again.', 'error');
                    return null;
                }
            }

            // Start video call with loading indicator
            function startVideoCall() {
                if (callInProgress) return;

                // Show loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'video-loading';
                loadingIndicator.innerHTML = '<div class="spinner"></div><p>Connecting to video call...</p>';
                videoCallContainer.appendChild(loadingIndicator);

                // Show video call container
                videoCallContainer.classList.add('active');
                callInProgress = true;

                // Initialize Jitsi Meet if not already initialized
                if (!jitsiApi) {
                    jitsiApi = initJitsiMeet();

                    if (!jitsiApi) {
                        loadingIndicator.remove();
                        videoCallContainer.classList.remove('active');
                        callInProgress = false;
                        return;
                    }

                    // Add event listeners for Jitsi Meet API events
                    jitsiApi.addListener('videoConferenceJoined', (info) => {
                        console.log('Video conference joined', info);
                        loadingIndicator.remove();

                        // Add current user to participants list
                        const userName = 'You (John Doe)';
                        const userId = info.id;
                        addParticipant(userId, userName, 'https://ui-avatars.com/api/?name=John+Doe&background=random', true);

                        showNotification('You joined the video call');

                        // Enable invite functionality
                        if (document.querySelector('.invite-btn')) {
                            document.querySelector('.invite-btn').addEventListener('click', shareInviteLink);
                        }
                    });

                    jitsiApi.addListener('participantJoined', (participant) => {
                        console.log('Participant joined:', participant);
                        // Add participant to the list
                        const displayName = participant.displayName || 'Guest User';
                        addParticipant(
                            participant.id,
                            displayName,
                            'https://ui-avatars.com/api/?name=' + displayName.replace(/\s+/g, '+') + '&background=random'
                        );
                        showNotification(`${displayName} joined the call`);
                    });

                    jitsiApi.addListener('participantLeft', (participant) => {
                        console.log('Participant left:', participant);
                        // Remove participant from the list
                        const displayName = participantsMap.get(participant.id) ? participantsMap.get(participant.id).name : 'Guest User';
                        removeParticipant(participant.id);
                        showNotification(`${displayName} left the call`);
                    });

                    jitsiApi.addListener('audioMuteStatusChanged', (muted) => {
                        isMicMuted = muted.muted;
                        if (isMicMuted) {
                            micBtn.classList.add('disabled');
                        } else {
                            micBtn.classList.remove('disabled');
                        }
                    });

                    jitsiApi.addListener('videoMuteStatusChanged', (muted) => {
                        isCameraOff = muted.muted;
                        if (isCameraOff) {
                            cameraBtn.classList.add('disabled');
                        } else {
                            cameraBtn.classList.remove('disabled');
                        }
                    });

                    jitsiApi.addListener('readyToClose', () => {
                        endVideoCall();
                    });

                    jitsiApi.addListener('connectionEstablished', () => {
                        showNotification('Connection established');
                    });

                    jitsiApi.addListener('connectionFailed', () => {
                        showNotification('Connection failed, please check your internet connection', 'error');
                    });

                    jitsiApi.addListener('deviceListChanged', (devices) => {
                        console.log('Available devices:', devices);
                    });
                }

                // Add demo participants for UI demonstration (only in demo mode)
                const isDemoMode = true; // Set to false in production
                if (isDemoMode) {
                    setTimeout(() => {
                        addParticipant('demo-user-1', 'Medina Rose', 'https://ui-avatars.com/api/?name=Medina+Rose&background=random');
                        addParticipant('demo-user-2', 'Alex Johnson', 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random');
                    }, 2000);
                }
            }

            // End video call with confirmation
            function endVideoCall() {
                if (!callInProgress) return;

                // Dispose Jitsi Meet API
                if (jitsiApi) {
                    jitsiApi.dispose();
                    jitsiApi = null;
                }

                // Hide video call container
                videoCallContainer.classList.remove('active');

                // Exit fullscreen if active
                if (isFullscreen) toggleFullscreen();

                // Clear participants list
                document.querySelector('.participants-list').innerHTML = '';
                participantsMap.clear();

                // Reset mic and camera buttons
                micBtn.classList.remove('disabled');
                cameraBtn.classList.remove('disabled');
                isMicMuted = false;
                isCameraOff = false;
                callInProgress = false;

                // Clear chat messages
                videoChatMessages.innerHTML = '';

                showNotification('Video call ended');
            }

            // Toggle microphone with visual feedback
            function toggleMic() {
                if (!jitsiApi || !callInProgress) return;

                try {
                    jitsiApi.executeCommand('toggleAudio');

                    // UI will be updated via the audioMuteStatusChanged event
                    showNotification(isMicMuted ? 'Microphone turned on' : 'Microphone turned off');
                } catch (error) {
                    console.error('Failed to toggle microphone:', error);
                    showNotification('Failed to toggle microphone', 'error');
                }
            }

            // Toggle camera with visual feedback
            function toggleCamera() {
                if (!jitsiApi || !callInProgress) return;

                try {
                    jitsiApi.executeCommand('toggleVideo');

                    // UI will be updated via the videoMuteStatusChanged event
                    showNotification(isCameraOff ? 'Camera turned on' : 'Camera turned off');
                } catch (error) {
                    console.error('Failed to toggle camera:', error);
                    showNotification('Failed to toggle camera', 'error');
                }
            }

            // Toggle fullscreen mode
            function toggleFullscreen() {
                if (!videoCallContainer) return;

                isFullscreen = !isFullscreen;

                if (isFullscreen) {
                    if (videoCallContainer.requestFullscreen) {
                        videoCallContainer.requestFullscreen();
                    } else if (videoCallContainer.webkitRequestFullscreen) {
                        videoCallContainer.webkitRequestFullscreen();
                    } else if (videoCallContainer.msRequestFullscreen) {
                        videoCallContainer.msRequestFullscreen();
                    }
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }

            // Share invite link
            function shareInviteLink() {
                const inviteLink = `https://meet.jit.si/${roomName}`;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(inviteLink)
                        .then(() => {
                            showNotification('Invite link copied to clipboard');
                        })
                        .catch(err => {
                            console.error('Could not copy text: ', err);
                            showInviteLinkModal(inviteLink);
                        });
                } else {
                    showInviteLinkModal(inviteLink);
                }
            }

            // Show invite link modal for browsers without clipboard API
            function showInviteLinkModal(link) {
                const modal = document.createElement('div');
                modal.className = 'invite-modal';
                modal.innerHTML = `
            <div class="invite-modal-content">
                <h3>Invite Others</h3>
                <p>Share this link with others to join the call:</p>
                <input type="text" readonly value="${link}" class="invite-link-input">
                <div class="invite-modal-buttons">
                    <button class="modal-close-btn">Close</button>
                </div>
            </div>
        `;

                document.body.appendChild(modal);

                const closeBtn = modal.querySelector('.modal-close-btn');
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                });

                const linkInput = modal.querySelector('.invite-link-input');
                linkInput.addEventListener('click', () => {
                    linkInput.select();
                });
            }

            // Add participant to the list with improved UI
            function addParticipant(id, name, avatar, isYou = false) {
                const participantsList = document.querySelector('.participants-list');

                // Store participant data
                participantsMap.set(id, { name, avatar, isYou });

                const participantItem = document.createElement('div');
                participantItem.className = 'participant-item';
                participantItem.dataset.participantId = id;
                participantItem.innerHTML = `
            <img src="${avatar}" alt="${name}" class="participant-avatar">
            <div class="participant-info">
                <div class="participant-name">${name} ${isYou ? '(You)' : ''}</div>
                <div class="participant-status">
                    <span class="status-indicator online"></span>
                    Online
                </div>
            </div>
            ${!isYou ? `
            <div class="participant-actions">
                <button class="participant-action-btn mute-participant" title="Mute">
                    <i class="fas fa-microphone-slash"></i>
                </button>
            </div>` : ''}
        `;
        participantsList.appendChild(participantItem);

        // Add event listeners for participant actions
        if (!isYou) {
            const muteBtn = participantItem.querySelector('.mute-participant');
            if (muteBtn) {
                muteBtn.addEventListener('click', () => {
                    if (jitsiApi) {
                        jitsiApi.executeCommand('muteParticipant', id);
                        showNotification(`Muted ${name}`);
                    }
                });
            }
        }

        // Update participant count
        updateParticipantCount();
    }

    // Remove participant from the list
    function removeParticipant(participantId) {
        const participantItem = document.querySelector(`.participant-item[data-participant-id="${participantId}"]`);
        if (participantItem) {
            participantItem.remove();
        }
        
        // Remove from map
        participantsMap.delete(participantId);
        
        // Update participant count
        updateParticipantCount();
    }

    // Update participant count
    function updateParticipantCount() {
        const count = document.querySelectorAll('.participant-item').length;
        const countElement = document.querySelector('.participants-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    // Send chat message in video call with improved UX
    function sendVideoChatMessage() {
        const messageText = videoChatInput.value.trim();
        if (!messageText) return;
        
        // Add message to chat with timestamp
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageElement = document.createElement('div');
        messageElement.className = 'video-chat-message sent';
        messageElement.innerHTML = `
            <div class="message-content">${messageText}</div>
            <div class="message-timestamp">${timestamp}</div>
        `;
        videoChatMessages.appendChild(messageElement);

        // Clear input
        videoChatInput.value = '';

        // Scroll to bottom
        videoChatMessages.scrollTop = videoChatMessages.scrollHeight;

        // Send message via Jitsi if available
        if (jitsiApi) {
            try {
                jitsiApi.executeCommand('sendEndpointTextMessage', '', messageText);
            } catch (error) {
                console.warn('Could not send message via Jitsi API:', error);
            }
        }

        // For demo: Simulate received message after random time (0.5-2 seconds)
        const isDemoMode = true; // Set to false in production
        if (isDemoMode) {
            setTimeout(() => {
                const responses = [
                    "I can see you clearly now.",
                    "The audio quality is great!",
                    "Let's discuss the project details.",
                    "Can you share your screen?",
                    "This video call feature is awesome!",
                    "Could you please speak a bit louder?",
                    "I'm taking notes of our conversation.",
                    "That's a great idea!",
                    "Let me think about that for a moment."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                const randomName = ["Medina", "Alex"][Math.floor(Math.random() * 2)];
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const responseElement = document.createElement('div');
                responseElement.className = 'video-chat-message received';
                responseElement.innerHTML = `
                    <div class="message-sender">${randomName}</div>
                    <div class="message-content">${randomResponse}</div>
                    <div class="message-timestamp">${timestamp}</div>
                `;
                videoChatMessages.appendChild(responseElement);

                // Scroll to bottom
                videoChatMessages.scrollTop = videoChatMessages.scrollHeight;
            }, 500 + Math.random() * 1500);
        }
    }

    // Check if device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Optimize UI for mobile devices
    function optimizeForMobile() {
        if (isMobileDevice()) {
            document.body.classList.add('mobile-device');
            
            // Add swipe gestures for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            videoCallContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            videoCallContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipeGesture();
            });
            
            function handleSwipeGesture() {
                const swipeThreshold = 100;
                if (touchEndX - touchStartX > swipeThreshold) {
                    // Swipe right - show participants
                    document.querySelector('.video-participants').classList.add('visible');
                } else if (touchStartX - touchEndX > swipeThreshold) {
                    // Swipe left - hide participants
                    document.querySelector('.video-participants').classList.remove('visible');
                }
            }
        }
    }

    // Event listeners
    if (videoCallBtn) {
        videoCallBtn.addEventListener('click', startVideoCall);
    }

    if (endCallBtn) {
        endCallBtn.addEventListener('click', () => {
            // Show confirmation for ending call
            if (confirm('Are you sure you want to end the call?')) {
                endVideoCall();
            }
        });
    }

    if (micBtn) {
        micBtn.addEventListener('click', toggleMic);
    }

    if (cameraBtn) {
        cameraBtn.addEventListener('click', toggleCamera);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    if (videoChatSendBtn) {
        videoChatSendBtn.addEventListener('click', sendVideoChatMessage);
    }

    if (videoChatInput) {
        videoChatInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendVideoChatMessage();
                event.preventDefault();
            }
        });
    }
    
    // Add invite button if not already present
    if (!document.querySelector('.invite-btn') && document.querySelector('.video-controls')) {
        const inviteBtn = document.createElement('button');
        inviteBtn.className = 'control-btn invite-btn';
        inviteBtn.innerHTML = '<i class="fas fa-user-plus"></i>';
        inviteBtn.title = 'Invite Others';
        document.querySelector('.video-controls').appendChild(inviteBtn);
    }
    
    // Handle visibility change (for background tab optimization)
    document.addEventListener('visibilitychange', () => {
        if (jitsiApi && callInProgress) {
            if (document.hidden) {
                // Page is hidden
                jitsiApi.executeCommand('setVideoQuality', 180); // Lower quality
            } else {
                // Page is visible
                jitsiApi.executeCommand('setVideoQuality', 720); // Higher quality
            }
        }
    });
    
    // Handle network status changes
    window.addEventListener('online', () => {
        if (callInProgress) {
            showNotification('Network connection restored');
        }
    });
    
    window.addEventListener('offline', () => {
        if (callInProgress) {
            showNotification('Network connection lost', 'error');
        }
    });
    
    // Initialize
    optimizeForMobile();
    
    // Add CSS for new elements if needed
    const style = document.createElement('style');
    style.textContent = `
        .video-notification {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            transition: transform 0.3s ease;
        }
        .video-notification.show {
            transform: translateX(-50%) translateY(0);
        }
        .video-notification.error {
            background: rgba(220, 53, 69, 0.9);
        }
        .video-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            text-align: center;
            color: white;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.2);
            border-top-color: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: spin 1s infinite linear;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .invite-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        .invite-modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
        }
        .invite-link-input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .invite-modal-buttons {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
        .modal-close-btn {
            padding: 8px 16px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .video-chat-message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 8px;
            max-width: 80%;
            position: relative;
        }
        .video-chat-message.sent {
            background-color: #dcf8c6;
            color: #000;
            margin-left: auto;
        }
        .video-chat-message.received {
            background-color: #f1f0f0;
            color: #000;
            margin-right: auto;
        }
        .message-sender {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .message-timestamp {
            font-size: 0.7rem;
            color: #888;
            text-align: right;
            margin-top: 5px;
        }
        .participant-status .status-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
        }
        .status-indicator.online {
            background-color: #28a745;
        }
        .participant-actions {
            margin-left: auto;
        }
        .participant-action-btn {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            padding: 5px;
        }
        .participant-action-btn:hover {
            color: #555;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .video-controls {
                padding: 5px;
            }
            .control-btn {
                margin: 0 3px;
            }
            .video-participants {
                position: absolute;
                right: -250px;
                transition: right 0.3s ease;
                height: 100%;
                z-index: 10;
            }
            .video-participants.visible {
                right: 0;
            }
            .video-chat-messages {
                max-height: 150px;
            }
        }
    `;
    document.head.appendChild(style);
});