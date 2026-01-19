import { useMemo } from "react";
import ProductCard from "./ProductCard";
import unbrandedsugarImg from "@/assets/business-lounge-serving-ginger-coffee-and-honey-drinks.jpg";
import cheeseImg from "@/assets/mozzarella-cheese-used-for-pizza-preparation.jpeg";
import gingerImg from "@/assets/daily-routine-hot-drink-with-ginger-coffee-and-honey.jpg";
import honeyImg from "@/assets/ffice-staff-coffee-break-with-ginger-and-honey-products.jpg";
import coffeeImg from "@/assets/event-hospitality-service-serving-ginger-coffee-and-honey.jpg";
import brandedhoneyImg from "@/assets/relaxed-home-use-of-ginger-coffee-and-honey-products.jpg";
import customBrandedImg from "@/assets/premium-client-service-with-ginger-coffee-and-honey-drinks.jpg";
import { getProductRankings } from "@/hooks/useProductRankings";
import { TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const baseProducts = [
    {
      name: "Ground Ginger in Sachets ",
      description: "Organic Ginger Root — bursting with natural flavor and health benefits. 20 sachets per small box, 480 per carton, 6.25g each.",
      price: "UGX 8,000",
      image: gingerImg,
    },
    {
      name: "Pure Honey in Sachets",
      description: "100% Natural Honey — harvested from local beekeepers. 20 sachets per small box, 480 per carton, 9g each.",
      price: "UGX 11,000",
      image: honeyImg,
    },
    {
      name: "Branded Honey in Sachets",
      description: "Branded Honey Sachets — 100% natural, sourced from local beekeepers. 20 sachets per small box, 480 per carton, 9g each.",
      price: "UGX 13,000",
      image: brandedhoneyImg,
    },
    {
      name: "Highland Arabica Coffee in Sachets",
      description: "Premium Highland Arabica Coffee — convenient coffee sachets for on-the-go enjoyment. 20 sachets per small box, 480 per carton, 6.25g each.",
      price: "UGX 9,000",
      image: coffeeImg,
    },
    {
      name: "Brown Sweet Sugar in Sachets (Unbranded)",
      description: "Unbranded Sugar Sachets — with our inhouse artwork. 250 sachets minimum per order, 1000 per carton, 6.25g each.",
      price: "UGX 28,000",
      image: unbrandedsugarImg,
    },
    {
      name: "Custom Branded Sachets (Premium Service)",
      description: "Personalized Sugar Sachets — with your business logo. 250 sachets minimum per order, 1000 per carton, 6.25g each.",
      price: "UGX 33,000",
      image: customBrandedImg,
    },
    {
      name: "Mozzarella Cheese",
      description: "Fresh Mozzarella Cheese — perfect for cooking and pizza preparation. A half kg per pack.",
      price: "UGX 21,000",
      image: cheeseImg,
    },
  ];

  // Sort products by order count (most ordered first)
  const products = useMemo(() => {
    const rankings = getProductRankings();
    
    return [...baseProducts].sort((a, b) => {
      const aRank = rankings.find((r) => r.name === a.name)?.orderCount || 0;
      const bRank = rankings.find((r) => r.name === b.name)?.orderCount || 0;
      return bRank - aRank; // Descending order
    });
  }, []);

  // Get top product name for badge display
  const topProduct = useMemo(() => {
    const rankings = getProductRankings();
    return rankings.length > 0 ? rankings[0].name : null;
  }, []);

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand-maroon">
            Our Products
          </h2>
          <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto px-4">
            Carefully selected natural products that bring quality to your daily life
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product, index) => (
            <div key={product.name} className="relative" style={{ animationDelay: `${index * 0.1}s` }}>
              {topProduct === product.name && (
                <div className="absolute -top-2 -right-2 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Price List Download Button */}
        <div className="mt-12 text-center">
          <a 
            href="/steadfastenterprises_standard_price_list.jpg" 
            download="steadfastenterprises_standard_price_list.jpg"
          >
            <Button 
              size="lg" 
              className="gap-3 text-xl sm:text-2xl px-10 sm:px-12 py-6 sm:py-8 shadow-2xl hover:shadow-3xl animate-[bounce_1s_ease-in-out_infinite] hover:animate-none hover:scale-110 transition-transform"
            >
              <Download className="h-7 w-7 sm:h-8 sm:w-8" />
              Download Price List
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
