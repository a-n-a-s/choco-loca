import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const Cart = ({ items, onClose, onCheckout, onRemoveItem, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-amber-900">Your Cart</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-amber-600 hover:text-amber-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <p className="text-amber-700 text-center py-12">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center border-b border-amber-100 pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900">{item.name}</h3>
                      <p className="text-sm text-amber-600">Rs. {item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-medium text-amber-900">
                  <span>Total:</span>
                  <span>Rs. {total}</span>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full shadow-none hover:shadow-md transition-all duration-300 font-medium"
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};