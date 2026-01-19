import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import coffeeSplash from "@/assets/staff-serving-hot-ginger-coffee-and-honey-drinks-at-event.jpeg";
import steadfastLogo from "@/assets/steadfast-logo.png";

const Hero = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background"
        aria-label="Steadfast Enterprises Limited hero section"
      >
        {/* Cart button */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setIsCartOpen(true)}
            size="lg"
            aria-label="Open shopping cart"
            className="bg-white text-primary hover:bg-white/90 shadow-strong relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                aria-label={`${getTotalItems()} items in cart`}
              >
                {getTotalItems()}
              </span>
            )}
          </Button>
        </div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label="Coffee and natural product background representing Steadfast Enterprises manufacturing"
          style={{
            backgroundImage: `url(${coffeeSplash})`,
            filter: "brightness(0.7)",
          }}
        />

        {/* Visual Orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-brand-teal/15 rounded-full blur-3xl animate-float-slower" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/40" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-16 sm:py-20 max-w-4xl mx-auto animate-fade-in">
          {/* LOGO */}
          <div className="mb-6 sm:mb-8 animate-float">
            <img
              src={steadfastLogo}
              alt="Steadfast Enterprises Limited logo – sachet and dairy manufacturer in Uganda"
              className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mx-auto drop-shadow-2xl"
            />
          </div>

          {/* H1 — MOST IMPORTANT SEO ELEMENT */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-extrabold mb-6 max-w-3xl mx-auto leading-tight drop-shadow-lg">
            Sachet & Dairy Manufacturing Excellence in Uganda & East Africa
          </h1>

          {/* SUPPORTING COPY (AI-READABLE) */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Steadfast Enterprises Limited manufactures branded and unbranded
            sachets including sugar, ginger, honey, and coffee, as well as
            mozzarella cheese. Located on Kitetika–Gayaza Road, we serve Uganda
            and the wider East African region.
          </p>

          {/* CTA */}
          <Button
            onClick={scrollToProducts}
            size="lg"
            aria-label="Explore Steadfast Enterprises products"
            className="bg-white text-primary hover:bg-white/90 shadow-strong text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto transition-smooth hover:scale-105"
          >
            Explore Our Products
            <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
          </Button>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-hidden="true"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Hero;
