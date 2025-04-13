
import React from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course } from '@/data/coursesData';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: {
    course: Course;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useCart();
  const { course } = item;
  
  return (
    <div className="flex items-center gap-4 py-4 px-4 bg-white rounded-md shadow-sm hover:shadow transition-shadow">
      <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start">
          <div>
            <h3 className="font-medium text-base truncate">{course.title}</h3>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-xs">{course.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-medium">
          ${(course.discountPrice || course.price).toFixed(2)}
        </p>
        {course.discountPrice && (
          <p className="text-xs text-muted-foreground line-through">
            ${course.price.toFixed(2)}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground flex-shrink-0"
        onClick={() => removeFromCart(course.id)}
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
