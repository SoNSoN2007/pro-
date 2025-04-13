/**
 * Checkout Page JavaScript
 * This script handles loading cart data, form validation, and purchase flow
 */

// Use the same course data for consistency with other pages
const coursesData = [{
        id: '1',
        title: 'Complete Web Development Bootcamp',
        instructor: 'Sarah Johnson',
        price: 89.99,
        discountPrice: 19.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
        category: 'Web Development',
        level: 'beginner',
        duration: '62 hours',
        isFeatured: true
    },
    {
        id: '2',
        title: 'Advanced JavaScript: From Fundamentals to Frameworks',
        instructor: 'Michael Chen',
        price: 119.99,
        discountPrice: 49.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
        category: 'JavaScript',
        level: 'intermediate',
        duration: '42 hours',
        isFeatured: true
    },
    {
        id: '3',
        title: 'UI/UX Design Masterclass',
        instructor: 'Emma Rodriguez',
        price: 69.99,
        discountPrice: null,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
        category: 'Design',
        level: 'beginner',
        duration: '28 hours',
        isFeatured: false
    },
    {
        id: '4',
        title: 'Data Science & Machine Learning with Python',
        instructor: 'James Wilson',
        price: 149.99,
        discountPrice: 79.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
        category: 'Data Science',
        level: 'advanced',
        duration: '56 hours',
        isFeatured: true
    },
    {
        id: '5',
        title: 'iOS App Development with Swift',
        instructor: 'Alex Turner',
        price: 129.99,
        discountPrice: 59.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?q=80&w=600&auto=format&fit=crop',
        category: 'Mobile Development',
        level: 'intermediate',
        duration: '38 hours',
        isFeatured: false
    },
    {
        id: '6',
        title: 'React Native for Mobile Developers',
        instructor: 'Lily Chen',
        price: 99.99,
        discountPrice: 39.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop',
        category: 'Mobile Development',
        level: 'intermediate',
        duration: '32 hours',
        isFeatured: false
    }
];

class CheckoutManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            this.loadCartData();
            this.setupEventListeners();
            this.setupFormValidation();
            this.updateCartBadge();
        } catch (error) {
            console.error('Error initializing checkout page:', error);
            this.handleEmptyCart();
        }
    }

    loadCartData() {
        try {
            // Get cart data from localStorage
            let cart = { items: [], totalItems: 0, totalPrice: 0 };
            const savedCart = localStorage.getItem('courseCart');

            if (savedCart) {
                cart = JSON.parse(savedCart);
            }

            this.cart = cart;

            // Check if cart is empty
            if (!cart.items || cart.items.length === 0) {
                this.handleEmptyCart();
                return;
            }

            // Render order items and update summary
            this.renderOrderItems();
            this.updateOrderSummary();
        } catch (error) {
            console.error('Error loading cart data:', error);
            this.handleEmptyCart();
        }
    }

    handleEmptyCart() {
        try {
            // Redirect to cart page if cart is empty
            alert('Your cart is empty. Please add courses before proceeding to checkout.');
            window.location.href = 'cart.html';
        } catch (error) {
            console.error('Error handling empty cart:', error);
        }
    }

    renderOrderItems() {
        try {
            const orderItemsContainer = document.getElementById('orderItems');
            if (!orderItemsContainer) {
                console.error('Order items container not found');
                return;
            }

            // Clear existing items
            orderItemsContainer.innerHTML = '';

            // Get the template
            const template = document.getElementById('orderItemTemplate');
            if (!template) {
                console.error('Order item template not found');
                return;
            }

            // Render each cart item
            this.cart.items.forEach(item => {
                // Find course data
                const course = coursesData.find(c => c.id === item.courseId);
                if (!course) {
                    console.warn(`Course with ID ${item.courseId} not found`);
                    return;
                }

                // Clone the template
                const clone = document.importNode(template.content, true);

                // Set image
                const imgEl = clone.querySelector('.order-item-image img');
                imgEl.src = course.image;
                imgEl.alt = course.title;

                // Set course details
                clone.querySelector('.font-medium').textContent = course.title;
                clone.querySelector('.text-sm').textContent = `by ${course.instructor}`;

                // Add the item to the container
                orderItemsContainer.appendChild(clone);
            });

            // Initialize Lucide icons for newly added elements
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                try {
                    lucide.createIcons();
                } catch (error) {
                    console.error('Error initializing Lucide icons:', error);
                }
            }
        } catch (error) {
            console.error('Error rendering order items:', error);
        }
    }

    updateOrderSummary() {
        try {
            // Calculate original price, discounts and total
            let originalPrice = 0;
            let finalPrice = 0;

            this.cart.items.forEach(item => {
                const course = coursesData.find(c => c.id === item.courseId);
                if (!course) return;

                originalPrice += course.price;
                finalPrice += (course.discountPrice || course.price);
            });

            const discount = originalPrice - finalPrice;

            // Update the summary elements
            const originalPriceEl = document.getElementById('originalPriceCheckout');
            const discountsEl = document.getElementById('discountsCheckout');
            const totalPriceEl = document.getElementById('totalPriceCheckout');
            const purchaseBtnTotalEl = document.getElementById('totalCheckoutPrice');

            if (originalPriceEl) {
                originalPriceEl.textContent = `$${originalPrice.toFixed(2)}`;
            }

            if (discountsEl) {
                discountsEl.textContent = `-$${discount.toFixed(2)}`;
            }

            if (totalPriceEl) {
                totalPriceEl.textContent = `$${finalPrice.toFixed(2)} USD`;
            }

            if (purchaseBtnTotalEl) {
                purchaseBtnTotalEl.textContent = `$${finalPrice.toFixed(2)}`;
            }
        } catch (error) {
            console.error('Error updating order summary:', error);
        }
    }

    updateCartBadge() {
        try {
            const cartBadge = document.getElementById('cartBadge');
            if (!cartBadge) return;

            cartBadge.textContent = this.cart.totalItems || 0;
        } catch (error) {
            console.error('Error updating cart badge:', error);
        }
    }

    setupFormValidation() {
        try {
            // Card number formatting and validation
            const cardNumberInput = document.getElementById('cardNumber');
            if (cardNumberInput) {
                cardNumberInput.addEventListener('input', (e) => {
                    // Remove any non-digit characters
                    let value = e.target.value.replace(/\D/g, '');

                    // Add spaces after every 4 digits
                    let formattedValue = '';
                    for (let i = 0; i < value.length; i++) {
                        if (i > 0 && i % 4 === 0) {
                            formattedValue += ' ';
                        }
                        formattedValue += value[i];
                    }

                    // Update the input value
                    e.target.value = formattedValue;
                });
            }

            // Expiry date formatting and validation
            const expiryDateInput = document.getElementById('expiryDate');
            if (expiryDateInput) {
                expiryDateInput.addEventListener('input', (e) => {
                    // Remove any non-digit characters
                    let value = e.target.value.replace(/\D/g, '');

                    // Add slash after 2 digits (MM/YY)
                    if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }

                    // Update the input value
                    e.target.value = value;
                });
            }

            // CVV validation - only allow numbers
            const cvvInput = document.getElementById('cvv');
            if (cvvInput) {
                cvvInput.addEventListener('input', (e) => {
                    // Remove any non-digit characters
                    e.target.value = e.target.value.replace(/\D/g, '');
                });
            }
        } catch (error) {
            console.error('Error setting up form validation:', error);
        }
    }

    setupEventListeners() {
        try {
            // Form submission
            const checkoutForm = document.getElementById('checkoutForm');
            if (checkoutForm) {
                checkoutForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.processPayment();
                });
            }
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    validateForm() {
        try {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const cardName = document.getElementById('cardName').value.trim();
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;

            // Basic validation
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                alert('Please enter a valid card number');
                return false;
            }

            if (cardName.length < 3) {
                alert('Please enter a valid cardholder name');
                return false;
            }

            if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return false;
            }

            // Check if the expiry date is in the future
            const [month, year] = expiryDate.split('/');
            const expiryMonth = parseInt(month, 10);
            const expiryYear = parseInt('20' + year, 10);

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
            const currentYear = currentDate.getFullYear();

            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                alert('Your card has expired. Please use a valid card.');
                return false;
            }

            if (cvv.length < 3) {
                alert('Please enter a valid CVV code');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error validating form:', error);
            return false;
        }
    }

    processPayment() {
        try {
            // Validate form
            if (!this.validateForm()) {
                return;
            }

            // Disable the purchase button and show processing state
            const purchaseBtn = document.getElementById('purchaseBtn');
            if (purchaseBtn) {
                const originalText = purchaseBtn.innerHTML;
                purchaseBtn.disabled = true;
                purchaseBtn.innerHTML = `<svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processing...`;

                // Simulate payment processing
                setTimeout(() => {
                    // Clear cart in localStorage
                    this.clearCart();

                    // Redirect to success page or show success message
                    alert('Payment successful! Your courses are now available in your account.');

                    // Redirect to courses page
                    window.location.href = 'courses.html';
                }, 2000);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('An error occurred while processing your payment. Please try again.');
        }
    }

    clearCart() {
        try {
            // Reset cart data
            localStorage.setItem('courseCart', JSON.stringify({ items: [], totalItems: 0, totalPrice: 0 }));
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }
}

// Initialize the checkout manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutManager();
});