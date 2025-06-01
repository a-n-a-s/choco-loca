
import { Button } from "@/components/ui/button";
// import { Coffee, Sparkles, Award, Heart } from "lucide-react";
import { CiCoffeeCup } from "react-icons/ci";



const Hero = ({ onOrderClick }) => {
  return (
    <section className="relative py-32 px-4 text-center bg-gradient-to-b from-amber-50 to-orange-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 to-orange-50/80"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full shadow-sm mb-8">
            <CiCoffeeCup className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-amber-900 mb-6 leading-tight tracking-tight">
            CHOCO LOCA
            <span className="block font-normal text-amber-700">
              Cakes & Café
            </span>
          </h1>
          <p className="text-lg md:text-xl text-amber-800 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Where artisanal cakes meet perfect coffee. A cozy haven for sweet moments 
            and warm conversations.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Button 
            onClick={onOrderClick}
            size="lg"
            className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-base font-medium rounded-full shadow-none hover:shadow-md transition-all duration-300"
          >
            ORDER NOW
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border border-amber-400 text-amber-700 hover:bg-amber-100 px-8 py-3 text-base font-medium rounded-full shadow-none hover:shadow-md transition-all duration-300"
          >
            VISIT CAFÉ
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl mb-4">🍰</div>
            <h3 className="font-medium text-lg text-amber-900 mb-2">Artisan Cakes</h3>
            <p className="text-amber-700 text-sm leading-relaxed">Handcrafted daily with premium ingredients</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-4">☕</div>
            <h3 className="font-medium text-lg text-amber-900 mb-2">Specialty Coffee</h3>
            <p className="text-amber-700 text-sm leading-relaxed">Expertly brewed from finest beans worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-4">🏠</div>
            <h3 className="font-medium text-lg text-amber-900 mb-2">Cozy Atmosphere</h3>
            <p className="text-amber-700 text-sm leading-relaxed">Perfect space for relaxation and celebrations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;