import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, description, price, image }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isTouched, setIsTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    addToCart({ name, price, image });
    toast({
      title: "Added to cart! 🛒",
      description: `${name} has been added to your cart`,
    });
  };

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const isInside = 
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;
    setIsTouched(isInside);
  };

  return (
    <Card 
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className={`group hover:shadow-strong transition-smooth overflow-hidden border-2 hover:border-primary animate-fade-in-up touch-manipulation ${
        isTouched ? 'shadow-strong border-primary scale-[1.02]' : ''
      }`}
    >
      <div className="overflow-hidden bg-white p-4">
        <img
          src={image}
          alt={name}
          className={`w-full h-auto max-h-64 object-contain transition-smooth group-hover:scale-105 mx-auto ${
            isTouched ? 'scale-105' : ''
          }`}
        />
      </div>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl text-brand-maroon">{name}</CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-2xl sm:text-3xl font-bold text-brand-maroon">{price}</p>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 active:bg-primary/90 active:scale-95 transition-smooth text-sm sm:text-base"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
