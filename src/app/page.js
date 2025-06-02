"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaCoffee,
  FaPhone,
  FaAward,
  FaUsers,
  FaClock,
  FaLeaf,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MenuGallery from "@/components/MenuGallery";
import CafeOrderForm from "@/components/CafeOrderForm";
import Hero from "@/components/Hero";
import { MenuItem } from "@/data/menuData";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const router = useRouter();

  const handleOrderItems = (items) => {
    setSelectedItems(items);
    setShowOrderForm(true);
  };

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cream-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-amber-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Chocoloca Logo"
                  className="w-16 h-16 object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h1 className="text-xl font-medium text-amber-900 tracking-tight">
                  CHOCO LOCA
                </h1>
                <p className="text-xs text-amber-700 font-normal">
                  Cakes and Café
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2 text-amber-800">
                <FaPhone className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-normal">+1 (555) 123-CAFÉ</span>
              </div>
              <Button
                onClick={() => setShowOrderForm(true)}
                className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full shadow-none hover:shadow-md transition-all duration-300 font-medium text-sm"
              >
                ORDER NOW
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {showOrderForm ? (
            <OrderForm
              selectedItems={selectedItems} // Update to plural
              onBack={() => {
                setShowOrderForm(false);
                setSelectedItems([]);
                router.push("/");
              }}
              onGalleryBack={() => {
                setShowOrderForm(true);
                router.push("/");
              }}
            />
          ) : (
            <>
              <Hero onOrderNow={scrollToMenu} />
              <MenuGallery onOrderItem={handleOrderItems} />
            </>
          )}
          {/* Features Section */}
          <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-amber-900 mb-4 tracking-tight">
                  Why Choose Chocoloca Experience
                </h2>
                <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
                  Where artisanal food meets café culture in perfect harmony
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="bg-white border border-amber-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                      <FaAward className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl font-medium text-amber-900">
                      Artisan Crafted
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-amber-700 leading-relaxed text-sm">
                      Every dish and beverage made with passion using premium,
                      locally-sourced ingredients
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-amber-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                      <FaLeaf className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl font-medium text-amber-900">
                      Dietary Conscious
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-amber-700 leading-relaxed text-sm">
                      Extensive options for vegan, vegetarian, gluten-free, and
                      other dietary preferences
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-amber-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                      <FaClock className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl font-medium text-amber-900">
                      Fresh Daily
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-amber-700 leading-relaxed text-sm">
                      Everything prepared fresh daily, from our signature coffee
                      blends to artisanal pastries
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-amber-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.jpg"
                    alt="Chocoloca Logo"
                    className="w-18 h-18 object-contain"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="text-left">
                  <span className="text-xl font-medium text-white">
                    Chocoloca
                  </span>
                  <p className="text-xs text-amber-200 font-normal">
                    Cakes and Café
                  </p>
                </div>
              </div>
              <p className="text-amber-100 mb-6 text-base font-light">
                Where every bite tells a story, every sip creates memories
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-amber-200 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>
                    11/2, Sashtri Road, Thillai Nagar, Tiruchchirappalli 620018
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+1 (555) 123-CAFÉ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>hello@chocoloca.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
