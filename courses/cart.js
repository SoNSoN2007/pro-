/**
 * Cart Page JavaScript
 * This script handles loading and managing cart items dynamically for the cart page
 */

// Use the same course data for consistency with course-details.js and courses.js
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

class CartManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        try {
            this.loadCartData();
            this.setupEventListeners();
            this.updateCartBadge();
        } catch (error) {
            console.error('Error initializing cart:', error);
            this.showEmptyCart();
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
                this.showEmptyCart();
                return;
            }

            // Render cart items and update summary
            this.renderCartItems();
            this.updateOrderSummary();
        } catch (error) {
            console.error('Error loading cart data:', error);
            this.showEmptyCart();
        }
    }

    showEmptyCart() {
        try {
            // Show empty cart message and hide cart content
            const emptyCartEl = document.getElementById('emptyCart');
            const cartContentEl = document.getElementById('cartContent');

            if (emptyCartEl) {
                emptyCartEl.classList.remove('hidden');
            }

            if (cartContentEl) {
                cartContentEl.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error showing empty cart message:', error);
        }
    }

    showCartContent() {
        try {
            // Show cart content and hide empty cart message
            const emptyCartEl = document.getElementById('emptyCart');
            const cartContentEl = document.getElementById('cartContent');

            if (emptyCartEl) {
                emptyCartEl.classList.add('hidden');
            }

            if (cartContentEl) {
                cartContentEl.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error showing cart content:', error);
        }
    }

    renderCartItems() {
        try {
            const cartItemsContainer = document.getElementById('cartItems');
            if (!cartItemsContainer) {
                console.error('Cart items container not found');
                return;
            }

            // Clear existing items
            cartItemsContainer.innerHTML = '';

            // Exit if cart is empty
            if (!this.cart.items || this.cart.items.length === 0) {
                this.showEmptyCart();
                return;
            }

            this.showCartContent();

            // Update item count in page title
            const itemCountEl = document.getElementById('itemCount');
            if (itemCountEl) {
                itemCountEl.textContent = this.cart.items.length;
            }

            // Get the template
            const template = document.getElementById('cartItemTemplate');
            if (!template) {
                console.error('Cart item template not found');
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

                // Set cart item data
                const cartItemEl = clone.querySelector('.cart-item');
                cartItemEl.dataset.id = course.id;

                // Set image
                const imgEl = clone.querySelector('.cart-item-image img');
                imgEl.src = course.image;
                imgEl.alt = course.title;

                // Set course details
                clone.querySelector('.cart-item-title').textContent = course.title;
                clone.querySelector('.cart-item-instructor').textContent = course.instructor;

                // Set rating
                clone.querySelector('.rating-value').textContent = course.rating.toFixed(1);

                // Set price
                const currentPriceEl = clone.querySelector('.current-price');
                currentPriceEl.textContent = `$${(course.discountPrice || course.price).toFixed(2)}`;

                const originalPriceEl = clone.querySelector('.original-price');
                if (course.discountPrice) {
                    originalPriceEl.textContent = `$${course.price.toFixed(2)}`;
                } else {
                    originalPriceEl.remove();
                }

                // Setup remove button
                const removeBtn = clone.querySelector('.btn-remove');
                removeBtn.addEventListener('click', () => {
                    this.removeCartItem(course.id);
                });

                // Add the item to the container
                cartItemsContainer.appendChild(clone);
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
            console.error('Error rendering cart items:', error);
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
            const originalPriceEl = document.getElementById('originalPrice');
            const discountsEl = document.getElementById('discounts');
            const totalPriceEl = document.getElementById('totalPrice');

            if (originalPriceEl) {
                originalPriceEl.textContent = `$${originalPrice.toFixed(2)}`;
            }

            if (discountsEl) {
                discountsEl.textContent = `-$${discount.toFixed(2)}`;
            }

            if (totalPriceEl) {
                totalPriceEl.textContent = `$${finalPrice.toFixed(2)} USD`;
            }
        } catch (error) {
            console.error('Error updating order summary:', error);
        }
    }

    removeCartItem(courseId) {
        try {
            // Find the item index
            const itemIndex = this.cart.items.findIndex(item => item.courseId === courseId);
            if (itemIndex === -1) return;

            // Find the course to get its price
            const course = coursesData.find(c => c.id === courseId);
            if (!course) return;

            // Remove item from cart
            this.cart.items.splice(itemIndex, 1);

            // Update cart totals
            this.cart.totalItems -= 1;
            this.cart.totalPrice -= (course.discountPrice || course.price);

            // Update localStorage
            this.saveCart();

            // Update the UI
            this.renderCartItems();
            this.updateOrderSummary();
            this.updateCartBadge();

            // Show empty cart if needed
            if (this.cart.items.length === 0) {
                this.showEmptyCart();
            }
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    }

    clearCart() {
        try {
            // Reset cart data
            this.cart = { items: [], totalItems: 0, totalPrice: 0 };

            // Update localStorage
            this.saveCart();

            // Update UI
            this.showEmptyCart();
            this.updateCartBadge();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    saveCart() {
        try {
            localStorage.setItem('courseCart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
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

    setupEventListeners() {
        try {
            // Clear cart button
            const clearCartBtn = document.getElementById('clearCartBtn');
            if (clearCartBtn) {
                clearCartBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to clear your cart?')) {
                        this.clearCart();
                    }
                });
            }

            // Apply coupon button
            const applyBtn = document.querySelector('.btn-apply');
            if (applyBtn) {
                applyBtn.addEventListener('click', () => {
                    const couponField = document.querySelector('.coupon-field');
                    if (!couponField) return;

                    const couponCode = couponField.value.trim();
                    if (!couponCode) {
                        alert('Please enter a coupon code');
                        return;
                    }

                    // Simple coupon handling - could be expanded in a real application
                    if (couponCode.toUpperCase() === 'DISCOUNT20') {
                        alert('Coupon applied successfully! 20% discount added.');
                        // Apply discount logic here
                    } else {
                        alert('Invalid coupon code');
                    }
                });
            }

            // Checkout button - redirect to checkout page
            const checkoutBtn = document.querySelector('.btn-checkout');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', (e) => {
                    if (this.cart.items.length === 0) {
                        e.preventDefault();
                        alert('Your cart is empty. Please add courses before proceeding to checkout.');
                    }
                    // Otherwise, let the default link behavior take the user to checkout.html
                });
            }
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }
}

// Initialize the cart manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});