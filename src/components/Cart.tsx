import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Trash2, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const MINIMUM_ORDER = 50000;
const TRANSPORT_FEE = 5000;

const Cart = ({ open, onClose }: CartProps) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Check if today is Friday
  const today = new Date();
  const isFriday = today.getDay() === 5; // 5 = Friday

  // Calculate subtotal of cart items
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      return sum + price * item.quantity;
    }, 0);
  };

  // Calculate total with transport fee (free on Fridays)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const transportFee = isFriday ? 0 : TRANSPORT_FEE;
    console.log(`Transport fee applied: ${transportFee}`); // For testing
    return subtotal + transportFee;
  };

  const formatPrice = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    if (subtotal < MINIMUM_ORDER) {
      toast({
        title: "Minimum Order Not Met",
        description: `Your order must be at least ${formatPrice(MINIMUM_ORDER)}. Current subtotal: ${formatPrice(subtotal)}`,
        variant: "destructive",
      });
      return;
    }

    const total = calculateTotal();
    const orderItems = items
      .map((item) => `${item.name} x${item.quantity} - ${item.price} each`)
      .join("%0A");

    const totalFormatted = formatPrice(total);

    const whatsappNumber = "+256756870718";
    const message = `*New Order - Cash on Delivery*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0A%0A*Order Items:*%0A${orderItems}%0A%0ASubtotal: ${formatPrice(subtotal)}%0ATransport: ${formatPrice(isFriday ? 0 : TRANSPORT_FEE)}%0A*Total: ${totalFormatted}*%0A%0ACash on Delivery requested.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    toast({
      title: "Order Received! ✅",
      description: `${items.length} item(s) - ${totalFormatted}. We've opened WhatsApp to confirm your delivery details.`,
      duration: 6000,
    });

    clearCart();
    onClose();
  };

  // Friday Sale Banner
  const FridayBanner = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded mb-4">
      🎉 <strong>Friday Sale:</strong> Free Transport Today!
    </div>
  );

  // Checkout form view
  if (showCheckout) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
            <SheetDescription>Complete your order details</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {isFriday && <FridayBanner />} {/* Banner only on Fridays */}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+256 700 123 456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Kampala Central, Plot 123..."
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2 p-3 border rounded-lg bg-secondary/50">
              <Package className="h-5 w-5 text-accent" />
              <span className="font-medium">Payment on Delivery</span>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Transport:</span>
                <span>{isFriday ? "UGX 0 (Friday Special!)" : formatPrice(TRANSPORT_FEE)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1 relative flex items-center justify-center">
                  Place Order
                  {isFriday && (
                    <span className="ml-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      FREE TRANSPORT!
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    );
  }

  // Cart overview
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 ? "Your cart is empty" : `${items.length} product(s) in cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Start adding products to your cart</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {isFriday && <FridayBanner />} {/* Banner only on Fridays */}

            {items.map((item) => (
              <div key={item.name} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Label className="text-xs">Qty:</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.name, parseInt(e.target.value) || 1)
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.name)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Transport:</span>
                <span>{isFriday ? "UGX 0 (Friday Special!)" : formatPrice(TRANSPORT_FEE)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              {calculateSubtotal() < MINIMUM_ORDER && (
                <p className="text-sm text-destructive text-center">
                  Minimum order: {formatPrice(MINIMUM_ORDER)}
                </p>
              )}
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full relative flex items-center justify-center"
                size="lg"
                disabled={calculateSubtotal() < MINIMUM_ORDER}
              >
                Proceed to Checkout
                {isFriday && (
                  <span className="ml-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    FREE TRANSPORT!
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
