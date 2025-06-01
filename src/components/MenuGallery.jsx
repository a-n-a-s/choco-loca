import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Cart} from '@/components/Cart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Leaf, ShoppingCart } from "lucide-react";
import { FaRegClock } from "react-icons/fa";
import { BiSolidLeaf } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import {
  menuItems,
  categories,
  dietaryFilters,
  MenuItem,
} from "@/data/menuData";

const MenuGallery = ({ onOrderItem }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      // selectedCategory === "All Items" || item.category === selectedCategory;
      (selectedCategory === "All Items" ||
        item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const dietaryMatch =
      selectedDietaryFilters.length === 0 ||
      selectedDietaryFilters.some((filter) =>
        item.dietaryTags.includes(filter)
      );
    return categoryMatch && dietaryMatch && item.available;
  });

  const toggleDietaryFilter = (filter) => {
    setSelectedDietaryFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const formatPrice = (price) => `₹${price.toFixed(2)}`;
  return (
    <section className="py-20 bg-white" id="menu">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-amber-900 mb-4 tracking-tight">
            Our Café Menu
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            From morning coffee to evening treats, discover our carefully
            crafted selection of fresh, local, and artisanal offerings
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-amber-50 rounded-full p-1 gap-2 cursor-pointer">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-full data-[state=active]:bg-amber-600 data-[state=active]:text-white text-xs md:text-sm "
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {/* //seacrh bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full outline-none p-3 border border-amber-300 rounded-full focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-amber-600 hover:text-amber-800"
            >
              ✕
            </button>
          )}
        </div>
        {/* ADd to cart button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={() => setShowCart(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <MdOutlineShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
        {/* Dietary Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-amber-900 mb-3 uppercase tracking-wide">
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {dietaryFilters.map((filter) => (
              <Button
                key={filter}
                variant={
                  selectedDietaryFilters.includes(filter)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => toggleDietaryFilter(filter)}
                className={`rounded-full text-xs ${
                  selectedDietaryFilters.includes(filter)
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-amber-300 text-amber-700 hover:bg-amber-50"
                }`}
              >
                <BiSolidLeaf className="h-3 w-3 mr-1" />
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-amber-200 rounded-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.dietaryTags.slice(0, 2).map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-amber-600 hover:bg-amber-700 text-white border-0 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {item.preparationTime && (
                  <div className="absolute top-3 right-3 flex items-center bg-white/95 px-2 py-1 rounded-full">
                    <FaRegClock className="h-3 w-3 text-amber-600 mr-1" />
                    <span className="text-xs font-medium text-amber-900">
                      {item.preparationTime}
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-amber-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-amber-700 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-xl font-medium text-amber-900">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-medium text-xs text-amber-900 mb-2 uppercase tracking-wide">
                      Dietary Tags
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {item.dietaryTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors duration-200 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-full shadow-none hover:shadow-md transition-all duration-300 font-medium text-sm cursor-pointer"
                >
                  <MdOutlineShoppingCart className="h-4 w-4 mr-2" />
                  ADD TO CART
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg">
              No items match your current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
      {/* Cart Modal */}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            onOrderItem(cartItems);
          }}
          onRemoveItem={(itemId) =>
            setCartItems((prev) => prev.filter((item) => item.id !== itemId))
          }
          onUpdateQuantity={(itemId, quantity) =>
            setCartItems((prev) =>
              prev.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
              )
            )
          }
        />
      )}
    </section>
  );
};

export default MenuGallery;
