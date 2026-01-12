import { Instagram, Twitter } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const baseUrl = window.location.origin;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Steadfast Enterprises Limited",
    "url": baseUrl,
    "logo": baseUrl + "/steadfast-logo.png",
    "sameAs": [
      "https://www.instagram.com/yourprofile",
      "https://www.twitter.com/yourprofile",
      "https://www.tiktok.com/@yourprofile"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+256756870718",
        "contactType": "Customer Service",
        "areaServed": "UG",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "email": "info@steadfastug.com",
        "contactType": "Customer Support",
        "areaServed": "UG",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kitetika-Gayaza Rd",
      "addressLocality": "Mukono",
      "addressRegion": "Central Region",
      "addressCountry": "UG"
    }
  };

  return (
    <footer className="bg-foreground text-background py-8 sm:py-10 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Steadfast Enterprises</h3>
            <p className="text-background/80 text-sm">Creating Value</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="text-background/80 hover:text-background transition-smooth">Products</a></li>
              <li><a href="#about" className="text-background/80 hover:text-background transition-smooth">About Us</a></li>
              <li><a href="#gallery" className="text-background/80 hover:text-background transition-smooth">Gallery</a></li>
              <li><a href="#videos" className="text-background/80 hover:text-background transition-smooth">Videos</a></li>
              <li><a href="#testimonials" className="text-background/80 hover:text-background transition-smooth">Customers</a></li>
              <li><a href="#contact" className="text-background/80 hover:text-background transition-smooth">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>+256 7568 707 18</li>
              <li>info@steadfastug.com</li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-background/80 hover:text-background transition-smooth"><TikTokIcon className="w-5 h-5" /></a>
              <a href="#" className="text-background/80 hover:text-background transition-smooth"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-background/80 hover:text-background transition-smooth"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-background/80">
          <p>&copy; {new Date().getFullYear()} Steadfast Enterprises Limited. All rights reserved.</p>
        </div>

        {/* JSON-LD for SEO & AI */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </div>
    </footer>
  );
};

export default Footer;
