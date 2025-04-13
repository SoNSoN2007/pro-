
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Lock, 
  CircleCheck,
  ChevronsUpDown,
  Calendar 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, clearCart, setPurchasedCourses, purchasedCourses } = useCart();
  const navigate = useNavigate();
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    setCardInfo({
      ...cardInfo,
      cardNumber: formattedValue.slice(0, 19) // Limit to 16 digits + 3 spaces
    });
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
      formattedValue = value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.slice(2, 4);
      }
    }
    
    setCardInfo({
      ...cardInfo,
      expiryDate: formattedValue
    });
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardInfo({
      ...cardInfo,
      cvv: value.slice(0, 3)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Add cart items to purchased courses
      const newPurchases = [...purchasedCourses, ...cart.items.map(item => item.course)];
      setPurchasedCourses(newPurchases);
      
      // Clear the cart
      clearCart();
      
      // Show success toast
      toast.success('Payment successful! Your courses are ready.');
      
      // Redirect to my courses page
      navigate('/my-courses');
    }, 2000);
  };
  
  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6 max-w-5xl">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <CreditCard className="h-10 w-10 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-muted-foreground">Secure payment processing</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="bg-gray-100 rounded p-1 h-8 w-12 flex items-center justify-center">
                              <svg viewBox="0 0 32 21" width="32" height="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><rect fill="#252525" width="32" height="21" rx="3"/><path d="M18.545 7.2V10a.9.9 0 1 1-1.8 0V7.2h-1.4v2.8a2.3 2.3 0 0 0 4.6 0V7.2h-1.4Zm-9.4 0v4.32h1.4V9.44h1.6c.83 0 1.5-.672 1.5-1.5 0-.828-.67-1.5-1.5-1.5h-3Zm1.4 1.2h1.3a.3.3 0 0 1 0 .6h-1.3v-.6Zm17-1.2-1.75 4.32h1.33l.35-.84h1.89l.34.84h1.34L29.445 7.2h-1.9Zm-.07 2.52.56-1.32.55 1.32h-1.11Z" fill="#FFF"/><path d="M11.245 7.2v4.32h1.4v-1.6h1a1.52 1.52 0 0 0 1.5-1.5c0-.828-.67-1.5-1.5-1.5h-2.4v.28Zm1.4 1.2h1a.3.3 0 1 1 0 .6h-1v-.6Z" fill="#F79410"/><path d="M12.645 9h1a.3.3 0 1 0 0-.6h-1v.6Zm-2.8-1.8h-1.4v2.32c0 1.66-2.5 1.66-2.5 0V7.2h-1.4v2.32c0 3.13 5.3 3.13 5.3 0V7.2Z" fill="#EA001B"/></g></g></svg>
                            </div>
                            <div className="bg-gray-100 rounded p-1 h-8 w-12 flex items-center justify-center">
                              <svg viewBox="0 0 32 21" width="32" height="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect fill="#016FD0" width="32" height="21" rx="3"/><path d="M18.5 6.295h-5v8.41h5v-8.41Z" fill="#FEFEFE"/><path d="M14 10.5c0-1.713.805-3.24 2.05-4.205A5.468 5.468 0 0 0 13 5C9.134 5 6 7.91 6 11.5S9.134 18 13 18a5.468 5.468 0 0 0 3.05-1.295A5.068 5.068 0 0 1 14 12.5v-2Z" fill="#016FD0"/><path d="M26 10.5c0 3.59-3.134 6.5-7 6.5a5.468 5.468 0 0 1-3.05-1.295A5.068 5.068 0 0 0 18 10.5V8.5c0-1.713-.805-3.24-2.05-4.205A5.468 5.468 0 0 1 19 5c3.866 0 7 2.91 7 6.5Z" fill="#FEFEFE"/></g></svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardInfo.cardNumber}
                                onChange={handleCardNumberChange}
                                className="pl-10"
                                required
                                maxLength={19}
                              />
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              placeholder="John Smith"
                              value={cardInfo.cardName}
                              onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <div className="relative">
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  value={cardInfo.expiryDate}
                                  onChange={handleExpiryDateChange}
                                  className="pl-10"
                                  required
                                  maxLength={5}
                                />
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <div className="relative">
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  value={cardInfo.cvv}
                                  onChange={handleCvvChange}
                                  className="pl-10"
                                  required
                                  maxLength={3}
                                  type="password"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm space-x-2">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span className="text-muted-foreground">Your payment info is secured with SSL encryption</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Purchase (${cart.totalPrice.toFixed(2)})
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.items.map((item) => (
                        <div key={item.course.id} className="flex gap-3">
                          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.course.image}
                              alt={item.course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">{item.course.title}</h3>
                            <p className="text-xs text-muted-foreground">by {item.course.instructor}</p>
                          </div>
                          <div className="text-sm font-medium">
                            ${(item.course.discountPrice || item.course.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cart.items.reduce((total, item) => total + item.course.price, 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discounts</span>
                        <span className="text-green-600">
                          -${(
                            cart.items.reduce((total, item) => total + item.course.price, 0) - 
                            cart.items.reduce((total, item) => 
                              total + (item.course.discountPrice || item.course.price), 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <div className="px-6 pb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex">
                      <CircleCheck className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">30-Day Money-Back Guarantee</p>
                        <p className="text-xs text-green-700 mt-1">Full refund if you're not satisfied with your purchase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="mt-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center justify-between cursor-pointer">
                    <span>Have a coupon?</span>
                    <ChevronsUpDown className="h-4 w-4" />
                  </h3>
                  <div className="flex mt-2">
                    <Input placeholder="Enter coupon code" className="rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none">Apply</Button>
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

export default Checkout;
