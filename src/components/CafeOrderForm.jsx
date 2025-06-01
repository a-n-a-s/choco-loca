import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
//import { CalendarIcon, ArrowLeft, Plus, Minus } from "lucide-react";
import  {FaArrowLeft , FaPlus ,FaMinus, FaCalendarAlt} from 'react-icons/fa'
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MenuItem } from "@/data/menuData";



const CafeOrderForm = ({ selectedItem, onBack }) => {
  const { toast } = useToast();
  const [date, setDate] = useState();
  const [orderItems, setOrderItems] = useState(
    selectedItem ? [{ item: selectedItem, quantity: 1 }] : []
  );
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    orderType: "",
    address: "",
    city: "",
    zipCode: "",
    specialRequests: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(prev => 
      prev.map((orderItem, i) => 
        i === index ? { ...orderItem, quantity: newQuantity } : orderItem
      )
    );
  };

  const removeItem = (index) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItemInstructions = (index, instructions) => {
    setOrderItems(prev => 
      prev.map((orderItem, i) => 
        i === index ? { ...orderItem, specialInstructions: instructions } : orderItem
      )
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, orderItem) => 
      total + (orderItem.item.price * orderItem.quantity), 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone || orderItems.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and add at least one item to your order",
        variant: "destructive",
      });
      return;
    }

    const orderSummary = {
      ...formData,
      items: orderItems,
      pickupDate: date ? format(date, "PPP") : "ASAP",
      orderDate: new Date().toISOString(),
      totalAmount: calculateTotal(),
    };

    console.log("Order submitted:", orderSummary);
    
    toast({
      title: "Order Received!",
      description: `Thank you for your order! Total: $${calculateTotal().toFixed(2)}. We'll contact you shortly to confirm.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>
          
          <h1 className="text-3xl font-light text-amber-900 mb-2 tracking-tight">Place Your Order</h1>
          <p className="text-amber-700">Fill in the details below and we'll prepare your order fresh</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Order Items */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((orderItem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                  <img 
                    src={orderItem.item.image} 
                    alt={orderItem.item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-900">{orderItem.item.name}</h3>
                    <p className="text-sm text-amber-700 mb-2">{orderItem.item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {orderItem.item.dietaryTags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, orderItem.quantity - 1)}
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <FaMinus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-amber-900 min-w-[2rem] text-center">
                          {orderItem.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, orderItem.quantity + 1)}
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <FaPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="font-medium text-amber-900">
                        ${(orderItem.item.price * orderItem.quantity).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Input
                        placeholder="Special instructions for this item..."
                        value={orderItem.specialInstructions || ""}
                        onChange={(e) => updateItemInstructions(index, e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {orderItems.length > 0 && (
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-medium text-amber-900">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  placeholder="Your full name"
                  required
                  className="rounded-full"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="rounded-full"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="rounded-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pickup/Delivery Information */}
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select onValueChange={(value) => handleInputChange("orderType", value)}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Café Pickup</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="dine-in">Dine In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pickupDate">Pickup/Delivery Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-full",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <FaCalendarAlt className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>ASAP or pick a time</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {formData.orderType === "delivery" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      className="rounded-full"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Any special requests or dietary restrictions..."
                  rows={3}
                  className="rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 px-12 py-3 text-lg rounded-full"
            >
              Place Order - ${calculateTotal().toFixed(2)}
            </Button>
          </div>
        </form>

        {/* Order Information */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-lg text-amber-900 mb-2">What happens next?</h3>
            <ul className="text-amber-700 space-y-1 text-sm">
              <li>• We'll confirm your order and provide an accurate pickup/delivery time</li>
              <li>• Payment can be made in-store, online, or upon delivery</li>
              <li>• You'll receive updates about your order status</li>
              <li>• All items are prepared fresh to order</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CafeOrderForm;