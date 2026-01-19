import { PremiumCarousel, PremiumCarouselSlide } from "@/components/ui/premium-carousel";

import customerLogo1 from "@/assets/ndeere.jpg";
import customerLogo2 from "@/assets/zara_gardens.webp";
import customerLogo3 from "@/assets/Jikoni.png";
import customerLogo4 from "@/assets/de_rain_eco_beach_resort.jpeg";
import customerLogo5 from "@/assets/nyaika_hotel.jpeg";
import customerLogo6 from "@/assets/mountain_of_the_moon.png";
import customerLogo7 from "@/assets/G's_restaurant.jpeg";
import customerLogo8 from "@/assets/oak_cafe.png";
import customerLogo9 from "@/assets/bmk_house.jpeg";
import customerLogo10 from "@/assets/mama_chai.jpg";
import customerLogo11 from "@/assets/amanetto.png";
import customerLogo12 from "@/assets/cafe_milano.jpeg";
import customerLogo13 from "@/assets/mbale_resort.png";
import customerLogo14 from "@/assets/molover_house.jpeg";  
import customerLogo15 from "@/assets/h&h_lusaniya.png";
import customerLogo16 from "@/assets/the_bend_25.jpeg";                       


const Testimonials = () => {
  const customers = [
    { name: "Customer 1", logo: customerLogo1 },
    { name: "Customer 2", logo: customerLogo2 },
    { name: "Customer 3", logo: customerLogo3 },
    { name: "Customer 4", logo: customerLogo4 },
    { name: "Customer 5", logo: customerLogo5 },
    { name: "Customer 6", logo: customerLogo6 },
    { name: "Customer 7", logo: customerLogo7 },
    { name: "Customer 8", logo: customerLogo8 },
    { name: "Customer 9", logo: customerLogo9 },
    { name: "Customer 10", logo: customerLogo10 },
    { name: "Customer 11", logo: customerLogo11 },  
    { name: "Customer 12", logo: customerLogo12 },
    { name: "Customer 13", logo: customerLogo13 },
    { name: "Customer 14", logo: customerLogo14 },
    { name: "Customer 15", logo: customerLogo15 },
    { name: "Customer 16", logo: customerLogo16 },     
  ];

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 md:py-20 px-4 bg-secondary/30"
    >
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
                <div className="flex items-center justify-center p-3 sm:p-4 bg-background rounded-full hover:shadow-md transition-all duration-300 w-20 h-20 sm:w-24 sm:h-24 mx-auto overflow-hidden">
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
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
