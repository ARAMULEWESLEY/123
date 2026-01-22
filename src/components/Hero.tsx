import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import coffeeSplash from "@/assets/staff-serving-hot-ginger-coffee-and-honey-drinks-at-event.jpeg";
import steadfastLogo from "@/assets/steadfast-logo.png";

const Hero = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { getTotalItems } = useCart();

  /* Auto-hide cart on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < lastScrollY || current < 80);
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openCart = () => {
    if ("vibrate" in navigator) navigator.vibrate(20);
    setIsCartOpen(true);
  };

  return (
    <>
      {/* FLOATING CART BUTTON */}
      <div
        className={`
          fixed left-4 top-1/2 -translate-y-1/2 z-50
          transition-all duration-300
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
        `}
      >
        <Button
          onClick={openCart}
          aria-label="Open cart"
          className="
            relative h-14 w-14 rounded-full
            bg-white/90 backdrop-blur-xl
            border border-white/40
            shadow-xl hover:shadow-2xl
            hover:scale-105 transition-all
          "
        >
          <ShoppingCart className="h-6 w-6 text-primary" />

          {getTotalItems() > 0 && (
            <span
              className="
                absolute -top-2 -right-2
                h-6 w-6 rounded-full
                bg-primary text-primary-foreground
                text-xs font-bold
                flex items-center justify-center
                animate-pulse shadow-md
              "
            >
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${coffeeSplash})`,
            filter: "brightness(0.7)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img
            src={steadfastLogo}
            alt="Steadfast Enterprises Logo"
            className="w-72 md:w-96 mx-auto mb-8 drop-shadow-2xl"
          />

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Sachet & Dairy Manufacturing Excellence in Uganda
          </h1>

          <p className="text-white/90 text-lg mb-10 max-w-3xl mx-auto">
            Premium production of sugar, ginger, honey, coffee & mozzarella —
            trusted across Uganda and East Africa.
          </p>

          <Button
            onClick={scrollToProducts}
            className="
              bg-white text-primary
              px-8 py-6 text-lg
              hover:scale-105 transition
              shadow-xl
            "
          >
            Explore Products
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none">
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64V120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* CART */}
      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Hero;
