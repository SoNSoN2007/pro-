document.addEventListener('DOMContentLoaded', function() {
    // Get all code input elements
    const codeInputs = document.querySelectorAll('.code-input');
    const form = document.getElementById('verificationForm');
    const resendButton = document.getElementById('resendCode');
    const countdownElement = document.getElementById('countdown');

    // Initialize countdown
    let timeLeft = 60;
    let countdownTimer;

    // Start countdown
    startCountdown();

    // Auto-focus and navigate between inputs
    codeInputs.forEach((input, index) => {
        // Focus on input when clicked
        input.addEventListener('click', function() {
            this.select();
        });

        // Handle input
        input.addEventListener('input', function() {
            // If a digit is entered
            if (this.value.length === 1) {
                // Move to next input if available
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
        });

        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                // Move to previous input if current is empty and backspace is pressed
                codeInputs[index - 1].focus();
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect verification code
        let verificationCode = '';
        codeInputs.forEach(input => {
            verificationCode += input.value;
        });

        // Validate code length
        if (verificationCode.length !== 6) {
            alert('Please enter all 6 digits of the verification code');
            return;
        }

        // Here you would typically send the code to your server for verification
        // For demo purposes, we'll just show an alert
        alert(`Verification code ${verificationCode} submitted successfully!`);

        // Redirect to next page or show success message
        // window.location.href = 'success.html';
    });

    // Handle resend code
    resendButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Check if countdown is still active
        if (timeLeft > 0) {
            return;
        }

        // Reset inputs
        codeInputs.forEach(input => {
            input.value = '';
        });
        codeInputs[0].focus();

        // Simulate sending a new code
        alert('A new verification code has been sent to your email');

        // Reset and restart countdown
        timeLeft = 60;
        startCountdown();
    });

    // Countdown function
    function startCountdown() {
        // Clear any existing timer
        if (countdownTimer) {
            clearInterval(countdownTimer);
        }

        // Disable resend button initially
        resendButton.style.opacity = '0.5';
        resendButton.style.pointerEvents = 'none';

        // Update countdown every second
        countdownTimer = setInterval(function() {
            timeLeft--;
            countdownElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                resendButton.style.opacity = '1';
                resendButton.style.pointerEvents = 'auto';
            }
        }, 1000);
    }

    // Paste functionality
    document.addEventListener('paste', function(e) {
        // Get pasted data
        let pastedData = (e.clipboardData || window.clipboardData).getData('text');

        // Check if pasted data is a 6-digit number
        if (/^\d{6}$/.test(pastedData)) {
            e.preventDefault();

            // Fill in the inputs with the pasted code
            for (let i = 0; i < Math.min(6, pastedData.length); i++) {
                codeInputs[i].value = pastedData[i];
            }

            // Focus on the last input
            codeInputs[Math.min(5, pastedData.length - 1)].focus();
        }
    });
});