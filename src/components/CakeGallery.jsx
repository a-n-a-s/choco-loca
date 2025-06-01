import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
//import { Star, Heart, ShoppingBag } from "lucide-react";
import { TiStarOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const CakeGallery = ({ onOrderCake }) => {
  const cakes = [
    {
      id: 1,
      name: "Chocoloca Signature",
      description:
        "Rich chocolate cake with our signature coffee-infused ganache",
      price: "₹1,299 - ₹2,499",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Signature",
      flavors: ["Mocha Delight", "Dark Chocolate", "Coffee Cream"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.9,
      popular: true,
    },
    {
      id: 2,
      name: "Vanilla Bean Dream",
      description:
        "Delicate vanilla sponge perfect with our house-blend coffee",
      price: "₹1,199 - ₹2,299",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Classic",
      flavors: ["Madagascar Vanilla", "French Vanilla", "Vanilla Bean"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.8,
    },
    {
      id: 3,
      name: "Red Velvet Romance",
      description:
        "Luxurious red velvet cake, a café favorite with cream cheese frosting",
      price: "₹1,399 - ₹2,699",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      category: "Premium",
      flavors: ["Classic Red Velvet", "Pink Velvet", "Blue Velvet"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.9,
      popular: true,
    },
    {
      id: 4,
      name: "Seasonal Berry Bliss",
      description:
        "Fresh berry cake with seasonal fruit compote, perfect for afternoon tea",
      price: "₹1,299 - ₹2,499",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Seasonal",
      flavors: ["Mixed Berry", "Strawberry Rose", "Wild Berry"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.7,
    },
    {
      id: 5,
      name: "Lemon Café Special",
      description:
        "Bright lemon cake with Meyer lemon curd, pairs beautifully with espresso",
      price: "₹1,199 - ₹2,299",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: "Citrus",
      flavors: ["Meyer Lemon", "Lemon Lavender", "Lemon Raspberry"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.8,
    },
    {
      id: 6,
      name: "Spiced Carrot Delight",
      description:
        "Artisanal spiced carrot cake with toasted pecans, a cozy café classic",
      price: "₹1,399 - ₹2,599",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      category: "Artisan",
      flavors: ["Classic Carrot", "Carrot Pecan", "Spiced Carrot"],
      sizes: ["500g", "1kg", "1.5kg"],
      rating: 4.9,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-amber-900 mb-4 tracking-tight">
            Our Signature Cake Collection
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            Each cake is crafted fresh daily in our café kitchen using premium
            ingredients and time-honored recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cakes.map((cake) => (
            <Card
              key={cake.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-amber-200 rounded-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {cake.popular && (
                    <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-0 text-xs font-medium rounded-full">
                      CAFÉ FAVORITE
                    </Badge>
                  )}
                </div>
                {cake.rating && (
                  <div className="absolute top-3 right-3 flex items-center bg-white/95 px-2 py-1 rounded-full">
                    <TiStarOutline className="h-3 w-3 text-amber-400 fill-current mr-1" />
                    <span className="text-xs font-medium text-amber-900">
                      {cake.rating}
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-amber-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {cake.name}
                  </h3>
                  <p className="text-sm text-amber-700 mb-3 leading-relaxed">
                    {cake.description}
                  </p>
                  <p className="text-lg font-medium text-amber-900">
                    {cake.price}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-medium text-xs text-amber-900 mb-2 uppercase tracking-wide">
                      Sizes Available
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cake.sizes.map((size, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors duration-200 rounded-full"
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => onOrderCake(cake)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-full shadow-none hover:shadow-md transition-all duration-300 font-medium text-sm cursor-pointer"
                >
                  ORDER NOW
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeGallery;
