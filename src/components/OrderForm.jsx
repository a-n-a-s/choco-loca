import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//import { CalendarIcon, ArrowLeft } from "lucide-react";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const OrderForm = ({ selectedItems, onBack }) => {
  const [date, setDate] = useState();
  const [formData, setFormData] = useState({
    // Customer Details
    customerName: "",
    email: "",
    phone: "",

    items:
      selectedItems?.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        total: item.price * (item.quantity || 1),
      })) || [],
    // Customization
    message: "",
    specialInstructions: "",

    // Delivery Details

    address: "",
    totalPrice:
      0 ||
      selectedItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.address ||
      selectedItems.length === 0
    ) {
      toast("Please fill all the details properly.");

      return;
    }

    // Create order summary
    const orderMsg = `*🍽️ NEW ORDER ALERT 🍽️*\n
*Order ID:* ${Math.floor(1000 + Math.random() * 9000)}\n
*Customer Details:*
👤 *Name:* ${formData.customerName}
📞 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || "Not provided"}
📍 *Address:* ${formData.address}\n
*Order Items:*
${selectedItems
  .map(
    (item) =>
      `➡️ ${item.name} (Qty: ${item.quantity || 1}) - Rs. ${
        item.price * (item.quantity || 1)
      }`
  )
  .join("\n")}\n
*Special Instructions:*
${formData.specialInstructions || "None"}\n
*Order Total:* Rs. ${selectedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    )}\n
Thank you!`;

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: orderMsg }),
      });

      const result = await response.json();
      console.log(response)
      if (response.ok) {
        toast.success("Order Recieved. Thank you for ordering!");

        setTimeout(() => {
          onBack(); // This will go back to the menu page
        }, 2000);

      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast("Something went wrong");
    }


  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Place Your Order
          </h1>
          <p className="text-gray-600">
            Fill in the details below and we'll contact you via WhatsApp to
            confirm your order
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Selected Items Display */}
          {selectedItems?.length > 0 && (
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-600">Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-amber-100 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-amber-800">Rs. {item.price}</Badge>
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 text-right font-medium">
                  Total: Rs.{" "}
                  {selectedItems.reduce(
                    (sum, item) => sum + item.price * (item.quantity || 1),
                    0
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    handleInputChange("customerName", e.target.value)
                  }
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="specialInstructions">
                  Special Instructions
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    handleInputChange("specialInstructions", e.target.value)
                  }
                  placeholder="Any special requests, dietary restrictions, design preferences..."
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Your Address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 px-12 py-3 text-lg"
            >
              Submit Order
            </Button>
          </div>
        </form>

        {/* Order Information */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>
                • We'll review your order and contact you within 2 hours via
                WhatsApp
              </li>
              <li>• We'll confirm all details, pricing, and payment method</li>
              <li>• A 50% deposit is required to confirm your order</li>
              <li>
                • We'll send you updates and photos during the baking process
              </li>
              <li>
                • Your delicious cake will be ready for pickup or delivery!
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderForm;
