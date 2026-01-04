import { PremiumCarousel, PremiumCarouselSlide } from "@/components/ui/premium-carousel";

import customerLogo1 from "@/assets/ndeere.jpg";
import customerLogo2 from "@/assets/customer-logo-2.png";
import customerLogo3 from "@/assets/customer-logo-3.png";
import customerLogo4 from "@/assets/customer-logo-4.png";
import customerLogo5 from "@/assets/customer-logo-5.png";
import customerLogo6 from "@/assets/customer-logo-6.png";

const Testimonials = () => {
  const customers = [
    { name: "Customer 1", logo: customerLogo1 },
    { name: "Customer 2", logo: customerLogo2 },
    { name: "Customer 3", logo: customerLogo3 },
    { name: "Customer 4", logo: customerLogo4 },
    { name: "Customer 5", logo: customerLogo5 },
    { name: "Customer 6", logo: customerLogo6 },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand-maroon">
            Our Trusted Customers
          </h2>
          <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto px-4">
            Proud to serve leading businesses across Uganda
          </p>
        </div>

        <PremiumCarousel
          loop={true}
          showArrows={true}
          showDots={true}
          showCounter={true}
          slidesPerView={{ mobile: 2, tablet: 3, desktop: 6 }}
          className="max-w-6xl mx-auto"
        >
          {customers.map((customer, index) => (
            <PremiumCarouselSlide key={index}>
              <div className="p-1">
                <div className="flex items-center justify-center p-3 sm:p-4 bg-background rounded-full hover:shadow-md transition-smooth w-20 h-20 sm:w-24 sm:h-24 mx-auto border-2 border-border overflow-hidden">
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </PremiumCarouselSlide>
          ))}
        </PremiumCarousel>
      </div>
    </section>
  );
};

export default Testimonials;
