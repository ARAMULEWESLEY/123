import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type EmblaCarouselType = UseEmblaCarouselType[1];

interface PremiumCarouselProps {
  children: React.ReactNode;
  /** Enable infinite looping */
  loop?: boolean;
  /** Enable autoplay */
  autoplay?: boolean;
  /** Autoplay interval in milliseconds */
  autoplayInterval?: number;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show pagination dots */
  showDots?: boolean;
  /** Show slide counter */
  showCounter?: boolean;
  /** Additional class names */
  className?: string;
  /** Slides per view on different breakpoints */
  slidesPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

interface PremiumCarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Premium Carousel Component
 * A production-ready carousel with smooth animations, accessibility, and responsive design
 */
const PremiumCarousel = ({
  children,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
  animationDuration = 400,
  showArrows = true,
  showDots = true,
  showCounter = true,
  className,
  slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: PremiumCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    duration: animationDuration,
    dragFree: false,
    containScroll: "trimSnaps",
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Get slide count from children
  const slideCount = React.Children.count(children);

  // Update carousel state on scroll
  const onSelect = useCallback((api: EmblaCarouselType) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  // Initialize carousel
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || !emblaApi || prefersReducedMotion.current) return;

    const play = () => {
      autoplayRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else if (loop) {
          emblaApi.scrollTo(0);
        }
      }, autoplayInterval);
    };

    play();

    // Pause on interaction
    emblaApi.on("pointerDown", () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    });

    emblaApi.on("pointerUp", play);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayInterval, emblaApi, loop]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  return (
    <div
      className={cn("relative group", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Main carousel viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-lg"
        aria-live="polite"
      >
        <div
          className={cn(
            "flex touch-pan-y",
            prefersReducedMotion.current ? "" : "transition-transform"
          )}
          style={{
            transitionDuration: prefersReducedMotion.current
              ? "0ms"
              : `${animationDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={cn(
                "flex-shrink-0 min-w-0",
                "w-full",
                `sm:w-1/${slidesPerView.tablet || 2}`,
                `lg:w-1/${slidesPerView.desktop || 3}`
              )}
              style={{
                flex: `0 0 ${100 / (slidesPerView.mobile || 1)}%`,
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!loop && !canScrollPrev}
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "text-foreground/70 hover:text-foreground",
              "shadow-soft hover:shadow-medium",
              "transition-all duration-300 ease-out",
              "opacity-0 group-hover:opacity-100 focus:opacity-100",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!loop && !canScrollNext}
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "text-foreground/70 hover:text-foreground",
              "shadow-soft hover:shadow-medium",
              "transition-all duration-300 ease-out",
              "opacity-0 group-hover:opacity-100 focus:opacity-100",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Bottom controls container */}
      <div className="flex flex-col items-center gap-3 mt-6">
        {/* Pagination Dots */}
        {showDots && scrollSnaps.length > 1 && (
          <div
            className="flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "transition-all duration-300 ease-out rounded-full",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  selectedIndex === index
                    ? "w-8 h-2 bg-brand-maroon"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                role="tab"
                aria-selected={selectedIndex === index}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {showCounter && slideCount > 1 && (
          <div
            className={cn(
              "text-sm font-medium tracking-wide",
              "text-muted-foreground/70",
              "tabular-nums",
              prefersReducedMotion.current ? "" : "transition-opacity duration-300"
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-foreground font-semibold">{selectedIndex + 1}</span>
            <span className="mx-1.5 text-muted-foreground/50">/</span>
            <span>{scrollSnaps.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Premium Carousel Slide Component
 * Individual slide wrapper with proper styling
 */
const PremiumCarouselSlide = ({
  children,
  className,
}: PremiumCarouselSlideProps) => {
  return (
    <div className={cn("px-2 sm:px-3", className)}>
      {children}
    </div>
  );
};

export { PremiumCarousel, PremiumCarouselSlide };
