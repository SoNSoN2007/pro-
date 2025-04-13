
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, clearCart } = useCart();
  
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-24 w-24 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center">Shopping Cart ({cart.totalItems})</h1>
            <Separator className="my-4" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
                  <h2 className="font-semibold">COURSE</h2>
                  <div className="flex space-x-16">
                    <span className="font-semibold">PRICE</span>
                    <span className="font-semibold">ACTION</span>
                  </div>
                </div>
                
                <div className="divide-y p-4 space-y-2">
                  {cart.items.map((item) => (
                    <CartItem key={item.course.id} item={item} />
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  asChild
                  className="text-primary"
                >
                  <Link to="/courses">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-red-600"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Original Price:</span>
                    <span>${cart.items.reduce((total, item) => total + item.course.price, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Discounts:</span>
                    <span className="text-green-600">
                      -${(
                        cart.items.reduce((total, item) => total + item.course.price, 0) - 
                        cart.items.reduce((total, item) => 
                          total + (item.course.discountPrice || item.course.price), 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${cart.totalPrice.toFixed(2)} USD</span>
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" size="lg" asChild>
                    <Link to="/checkout">
                      Proceed To Checkout
                    </Link>
                  </Button>
                  
                  <div className="mt-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-full border rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button className="absolute right-0 top-0 h-full rounded-l-none">
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-center text-muted-foreground">
                    <p>Secure Checkout</p>
                    <p>30-Day Money-Back Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
