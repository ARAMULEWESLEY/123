import { useState } from "react";
import { X } from "lucide-react";
import sugarImg from "@/assets/n1.jpg";
import gingerImg from "@/assets/n2.jpg";
import honeyImg from "@/assets/n4.jpg";
import coffeeImg from "@/assets/p3.jpg";
import teamImg from "@/assets/h2.jpg";
import galleryA1 from "@/assets/a8.jpg";
import galleryA2 from "@/assets/a7.jpg";
import galleryC3 from "@/assets/a9.jpg";
import galleryC4 from "@/assets/a2.jpg";
import galleryD2 from "@/assets/a1.jpg";
import galleryG3 from "@/assets/p7.jpg";
import galleryH3 from "@/assets/p4.jpg";
import { PremiumCarousel, PremiumCarouselSlide } from "@/components/ui/premium-carousel";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const images = [
    { src: galleryA1, alt: "Product Collection - Honey, Coffee & Ginger", description: "A curated collection of our honey, coffee, and ginger products." },
    { src: galleryA2, alt: "Full Product Range Display", description: "Display of the complete range of Steadfast Enterprises products." },
    { src: galleryC3, alt: "Highland Arabica Coffee Box", description: "Close-up of Highland Arabica coffee box showing premium packaging." },
    { src: galleryC4, alt: "Coffee Sachets Arrangement", description: "Arranged coffee sachets demonstrating product variety." },
    { src: galleryD2, alt: "Fresh Product", description: "Freshly sourced natural products ready for packaging." },
    { src: galleryG3, alt: "Ginger Immune Booster Box", description: "Box of ginger products that boost immunity and health." },
    { src: galleryH3, alt: "Natural Bee Honey Box", description: "Premium natural bee honey in a beautifully designed box." },
    { src: sugarImg, alt: "Premium Sugar", description: "High-quality sugar sourced sustainably." },
    { src: gingerImg, alt: "Fresh Ginger", description: "Fresh ginger roots from local farms." },
    { src: honeyImg, alt: "Pure Honey", description: "Pure honey extracted naturally from our apiaries." },
    { src: coffeeImg, alt: "Coffee Sachets", description: "Convenient coffee sachets for daily use." },
    { src: teamImg, alt: "Our Team", description: "Steadfast Enterprises team working together with passion." },
  ];

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
