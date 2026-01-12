import { useMemo } from "react";
import ProductCard from "./ProductCard";
import unbrandedsugarImg from "@/assets/n8.jpg";
import cheeseImg from "@/assets/cheese.jpeg";
import gingerImg from "@/assets/ginger.jpg";
import honeyImg from "@/assets/honey.jpg";
import coffeeImg from "@/assets/coffee.jpg";
import brandedhoneyImg from "@/assets/L8.jpg";
import customBrandedImg from "@/assets/custom-branded-sachets.jpg";
import { getProductRankings } from "@/hooks/useProductRankings";
import { TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const baseProducts = [
    {
      name: "Fresh Ginger",
      description: "Organic ginger root, packed with natural flavor and health benefits",
      price: "UGX 8,000",
      image: gingerImg,
    },
    {
      name: "Pure Honey",
      description: "100% natural honey, harvested from local beekeepers",
      price: "UGX 15,000",
      image: honeyImg,
    },
      {
      name: "Pure Honey",
      description: "100% natural honey, harvested from local beekeepers",
      price: "UGX 15,000",
      image: brandedhoneyImg,
    },
    {
      name: "Coffee Sachets",
      description: "Premium instant coffee sachets for convenience on the go",
      price: "UGX 3,000",
      image: coffeeImg,
    },
            {
      name: "Custom Branded Sachets",
      description: "Personalized sugar sachets with your business logo - minimum order 250 sachets",
      price: "UGX 60,000",
      image: unbrandedsugarImg,
    },
    {
      name: "Custom Branded Sachets",
      description: "Personalized sugar sachets with your business logo - minimum order 250 sachets",
      price: "UGX 60,000",
      image: customBrandedImg,
    },
    {
      name: "Custom Branded Sachets",
      description: "Personalized sugar sachets with your business logo - minimum order 250 sachets",
      price: "UGX 60,000",
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
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand-maroon">
            Our Products
          </h2>
          <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto px-4">
            Carefully selected natural products that bring quality to your daily life
          </p>
        </div>
        
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

        {/* Price List Download */}
        <div className="mt-12 text-center">
          <a 
            href="/price-list.png" 
            download="Steadfast-Price-List.png"
          >
            <Button 
              size="lg" 
              className="gap-3 text-lg px-8 py-6 shadow-lg hover:shadow-xl animate-[bounce_1s_ease-in-out_infinite] hover:animate-none hover:scale-110 transition-transform"
            >
              <Download className="h-6 w-6" />
              Download Price List
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
