
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { Course } from '../data/coursesData';
import { toast } from 'sonner';

type CartItem = {
  course: Course;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Course }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cart: CartState;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  purchasedCourses: Course[];
  setPurchasedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.course.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists in cart
        toast.info('This course is already in your cart');
        return state;
      }

      // Add new item
      const newItem = {
        course: action.payload,
        quantity: 1,
      };

      const updatedItems = [...state.items, newItem];
      const price = action.payload.discountPrice || action.payload.price;

      toast.success('Course added to cart');
      return {
        items: updatedItems,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + price,
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(
        (item) => item.course.id === action.payload
      );

      if (!itemToRemove) return state;

      const updatedItems = state.items.filter(
        (item) => item.course.id !== action.payload
      );

      const price = itemToRemove.course.discountPrice || itemToRemove.course.price;

      toast.info('Course removed from cart');
      return {
        items: updatedItems,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - price,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  // Retrieve cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedPurchases = localStorage.getItem('purchasedCourses');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartState;
        if (parsedCart.items.length > 0) {
          Object.assign(cart, parsedCart);
        }
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    if (savedPurchases) {
      try {
        const parsedPurchases = JSON.parse(savedPurchases) as Course[];
        if (parsedPurchases.length > 0) {
          setPurchasedCourses(parsedPurchases);
        }
      } catch (error) {
        console.error('Failed to parse purchased courses from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save purchased courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
  }, [purchasedCourses]);

  const addToCart = (course: Course) => {
    dispatch({ type: 'ADD_ITEM', payload: course });
  };

  const removeFromCart = (courseId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: courseId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        purchasedCourses,
        setPurchasedCourses,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
