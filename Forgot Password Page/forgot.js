document.addEventListener('DOMContentLoaded', function() {
    // Add focus animation to input field
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    emailInput.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const submitBtn = document.querySelector('.submit-btn');

    // Validate email
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Show loading state
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Simulate API call with timeout
    setTimeout(function() {
        // Hide loading state
        submitBtn.innerHTML = 'Send Reset Link';
        submitBtn.disabled = false;

        // Show success message
        showSuccess(`Password reset link has been sent to ${email}`);

        // In a real application, you would:
        // 1. Send a request to your backend
        // 2. Handle the response (success/error)
        // 3. Redirect or show appropriate message
    }, 1500);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    // Remove any existing messages
    removeMessages();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    const form = document.getElementById('forgotForm');
    form.insertBefore(errorDiv, form.querySelector('.form-group'));

    // Auto remove after 5 seconds
    setTimeout(removeMessages, 5000);
}

function showSuccess(message) {
    // Remove any existing messages
    removeMessages();

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    const form = document.getElementById('forgotForm');
    form.insertBefore(successDiv, form.querySelector('.form-group'));

    // Auto remove after 5 seconds
    setTimeout(removeMessages, 5000);
}

function removeMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(message => message.remove());
}