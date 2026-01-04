import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Package } from "lucide-react";
import { incrementProductOrder } from "@/hooks/useProductRankings";

interface OrderFormProps {
  product: string;
  price: string;
  onClose: () => void;
}

const OrderForm = ({ product, price, onClose }: OrderFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: "1",
    paymentMethod: "mpesa",
  });

  // Extract numeric price value
  const unitPrice = parseInt(price.replace(/[^0-9]/g, ''));
  const totalPrice = unitPrice * parseInt(formData.quantity || "1");
  
  // Format price with commas
  const formatPrice = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "256700000000"; // Replace with actual business number
    const orderDetails = `${product} x${formData.quantity} - ${price} each`;
    
    // If M-Pesa payment selected, send details via WhatsApp
    if (formData.paymentMethod === "mpesa") {
      const message = `*New Order - M-Pesa Payment*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0A%0A*Order Items:*%0A${orderDetails}%0A%0A*Total: ${formatPrice(totalPrice)}*%0A%0APlease confirm payment details.`;
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      
      toast({
        title: "Order Sent! ✅",
        description: `${product} x${formData.quantity} - ${formatPrice(totalPrice)}. We've opened WhatsApp to confirm M-Pesa payment details with you.`,
        duration: 6000,
      });
    } else {
      const message = `*New Order - Cash on Delivery*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0A%0A*Order Items:*%0A${orderDetails}%0A%0A*Total: ${formatPrice(totalPrice)}*%0A%0ACash on Delivery requested.`;
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      
      toast({
        title: "Order Received! ✅",
        description: `${product} x${formData.quantity} - ${formatPrice(totalPrice)}. We've opened WhatsApp to confirm your delivery details.`,
        duration: 6000,
      });
    }

    // Track order for ranking
    incrementProductOrder(product, parseInt(formData.quantity || "1"));

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+256 700 123 456"
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm sm:text-base">Delivery Address</Label>
        <Textarea
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Kampala Central, Plot 123..."
          rows={3}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-sm sm:text-base">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          required
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="text-sm sm:text-base"
        />
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mt-2">
          <span>Unit Price: {price}</span>
          <span className="font-semibold text-foreground">Total: {formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm sm:text-base">Payment Method</Label>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
        >
          <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-secondary transition-smooth cursor-pointer">
            <RadioGroupItem value="mpesa" id="mpesa" />
            <Label htmlFor="mpesa" className="flex items-center cursor-pointer flex-1 text-sm sm:text-base">
              <CreditCard className="mr-2 h-4 w-4 text-primary" />
              Pay Now (M-Pesa via PesaPal)
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-secondary transition-smooth cursor-pointer">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1 text-sm sm:text-base">
              <Package className="mr-2 h-4 w-4 text-accent" />
              Cash on Delivery
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base">
        Place Order
      </Button>
    </form>
  );
};

export default OrderForm;
