import { useState } from "react";
import { X } from "lucide-react";
import everydayProductUsage from "@/assets/everyday-use-of-ginger-coffee-and-honey-products.jpg";
import brandedSugarSachetsAtEvent from "@/assets/branded-sugar-sachets-served-at-event.jpg";
import brandedCoffeeSachetsEvent from "@/assets/branded-coffee-sachets-served-at-corporate-event.jpg";
import mozzarellaCheeseHomeKitchen from "@/assets/mozzarella-cheese-used-in-home-kitchen.jpg";
import brandedProductDisplayExpo from "@/assets/branded-sugar-coffee-ginger-and-honey-products-display-at-expo.jpg";
import officeTeaBreakProducts from "@/assets/office-tea-break-using-branded-coffee-ginger-honey-sachets.jpg";
import hospitalityIndustrySupply from "@/assets/hospitality-industry-supply-sugar-coffee-honey-ginger-and-mozzarella.jpg";
import staffServingEvent from "@/assets/serving-clients-at-corporate-event-with-ginger-coffee-honey-products.jpg";
import clientsEnjoyingProductsAtHome from "@/assets/customers-enjoying-ginger-and-honey-sachets-at-home.jpg";
import corporateEventBeverageService from "@/assets/event-guests-enjoying-ginger-coffee-and-honey-drinks.jpg";
import familyPreparingDrinksAtHome from "@/assets/staff-serving-hot-ginger-and-coffee-drinks-at-event.jpg";
import exhibitionProductDisplay from "@/assets/ginger-coffee-honey-products-display-at-business-expo.jpg";
import happyCustomersUsingProducts from "@/assets/happy-customers-using-ginger-and-honey-products.jpg";
import eventGuestsEnjoyingDrinks from "@/assets/office-pantry-stocked-with-ginger-coffee-and-honey-sachets.jpg";
import gingerDrinkPreparedAtHome from "@/assets/ginger-drink-prepared-at-home.jpg";
import coffeeSachetsOfficeBreak from "@/assets/coffee-sachets-used-during-office-break.jpg";
import mozzarellaCheeseFreshSlices from "@/assets/fresh-mozzarella-cheese-slices.jpg";
import homeEveningTeaWithHoney from "@/assets/home-evening-tea-with-honey-and-ginger.jpg";
import communityEventProductService from "@/assets/community-event-serving-sugar-coffee-ginger-and-honey.jpg";
import qualityControlFoodProduction from "@/assets/quality-control-for-sugar-honey-coffee-ginger-and-mozzarella.jpg";
import premiumClientFoodService from "@/assets/premium-client-food-service-with-sugar-coffee-honey-ginger.jpg";
import productExperienceLifestyle from "@/assets/food-and-beverage-product-experience-lifestyle.jpg";
import hospitalityServiceUsingProducts from "@/assets/hospitality-service-using-ginger-coffee-and-honey-products.jpg";
import homeEveningTeaMoment from "@/assets/home-evening-tea-with-ginger-coffee-and-honey.jpg";
import { PremiumCarousel, PremiumCarouselSlide } from "@/components/ui/premium-carousel";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const images = [
    { src: brandedProductDisplayExpo, alt: "Product Collection - Honey, Coffee & Ginger", description: "A curated collection of our honey, coffee, and ginger products." },
    { src: officeTeaBreakProducts, alt: "Full Product Range Display", description: "Display of the complete range of Steadfast Enterprises products." },
    { src: hospitalityIndustrySupply, alt: "Highland Arabica Coffee Box", description: "Close-up of Highland Arabica coffee box showing premium packaging." },
    { src: staffServingEvent, alt: "Coffee Sachets Arrangement", description: "Arranged coffee sachets demonstrating product variety." },
    { src: clientsEnjoyingProductsAtHome, alt: "Fresh Product", description: "Freshly sourced natural products ready for packaging." },
    { src: everydayProductUsage, alt: "Premium Sugar", description: "High-quality sugar sourced sustainably." },
    { src: brandedSugarSachetsAtEvent, alt: "Fresh Ginger", description: "Fresh ginger roots from local farms." },
    { src: brandedCoffeeSachetsEvent, alt: "Pure Honey", description: "Pure honey extracted naturally from our apiaries." },
    { src: mozzarellaCheeseHomeKitchen, alt: "Our Team", description: "Steadfast Enterprises team working together with passion." },
   { src: coffeeSachetsOfficeBreak, alt: "Innovation at Steadfast", description: "Our team brainstorming the next generation of honey products." },
    { src: familyPreparingDrinksAtHome, alt: "Steadfast Team Collaboration", description: "Precision and passion in every step of our process." },
    { src: premiumClientFoodService, alt: "Behind the Scenes", description: "Steadfast Enterprises team working together with passion." },
    { src: happyCustomersUsingProducts, alt: "Quality Assurance", description: "Expert hands ensuring every sachet meets our gold standard." },
    { src: homeEveningTeaWithHoney, alt: "The Creative Process", description: "Where tradition meets modern product design." },
    { src: corporateEventBeverageService, alt: "Our Collective Goal", description: "A shared vision for premium, natural wellness." },
    { src: homeEveningTeaMoment, alt: "Expert Logistics", description: "Meticulous attention to detail from the hive to your home." },
    { src: exhibitionProductDisplay, alt: "Team Culture", description: "Driven by a commitment to excellence and community." },
    { src: qualityControlFoodProduction, alt: "Research and Development", description: "Steadfast Enterprises team working together with passion." },
    { src: gingerDrinkPreparedAtHome, alt: "Steadfast Leadership", description: "Leading the industry with sustainable honey practices." },
    { src: productExperienceLifestyle, alt: "Daily Operations", description: "The heartbeat of our production facility." },
    { src: eventGuestsEnjoyingDrinks, alt: "Unity in Work", description: "Empowering our people to deliver their best." },
    { src: communityEventProductService, alt: "Packaging Precision", description: "Ensuring every sachet is a work of art." },
    { src: mozzarellaCheeseFreshSlices, alt: "Shared Success", description: "Celebrating milestones together as a family." },
    { src: hospitalityServiceUsingProducts, alt: "The Steadfast Standard", description: "Uncompromising quality in every single batch." }  ];

  const handleTouchStart = (index: number) => setTouchedIndex(index);
  const handleTouchEnd = () => setTouchedIndex(null);

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand-maroon">Our Gallery</h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground max-w-2xl mx-auto px-4">
            Take a closer look at our products and facilities
          </p>
        </div>

        <PremiumCarousel
          loop
          showArrows
          showDots
          showCounter
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          className="max-w-6xl mx-auto"
        >
          {images.map((image, index) => (
            <PremiumCarouselSlide key={index}>
              <div className="p-1">
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer group touch-manipulation"
                  onClick={() => setSelectedImage(image.src)}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                >
                  {/* Make container flexible, auto height based on image */}
                  <div className="w-full mx-auto">
                    <img
                      src={image.src}
                      alt={image.alt} // visible alt
                      className={`w-full h-auto max-h-[600px] object-contain transition-transform duration-500 group-hover:scale-105 ${
                        touchedIndex === index ? 'scale-105' : ''
                      }`}
                    />
                  </div>

                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-colors duration-300 group-hover:bg-black/30`} />

                  {/* Hidden description for AI / SEO */}
                  <div className="sr-only">
                    <p>{image.description}</p>
                  </div>
                </div>
              </div>
            </PremiumCarouselSlide>
          ))}
        </PremiumCarousel>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-brand-green transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery view"
            className="max-w-full max-h-full object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
