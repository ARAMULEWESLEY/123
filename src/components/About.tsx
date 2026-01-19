import { useState, useMemo } from "react";
import { Target, Users, Heart } from "lucide-react";
import teamImg from "@/assets/branded-sugar-sachets-used-in-catering-service.jpg";
import team_lead_balikowa_edilisa_obama from "@/assets/team_lead_balikowa_edilisa_obama.jpg";
import our_ceo_paul_ahura from "@/assets/our_ceo_paul_ahura.jpeg";
import { PremiumCarousel, PremiumCarouselSlide } from "@/components/ui/premium-carousel";

const About = () => {
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We source only the finest natural products for our customers",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your satisfaction is our top priority in everything we do",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Supporting local producers and sustainable practices",
    },
  ];

  const teamMembers = [
     {
name: "Paul Ahura",
role: "Chief Executive Officer",
description: "Leading Steadfast Enterprises with vision, integrity, and a commitment to excellence.",
image: our_ceo_paul_ahura,
},
{
name: "Balikowa Edilisa Obama",
role: "Team Lead",
description: "Dedicated to supporting our customers and ensuring seamless operations.",
image: team_lead_balikowa_edilisa_obama,
},

  ];

  const handleTouchStart = (index: number) => setTouchedIndex(index);
  const handleTouchEnd = () => setTouchedIndex(null);

  // JSON-LD structured data for organization + team
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Steadfast Enterprises Limited",
      "url": window.location.origin,
      "logo": window.location.origin + "/logo.png",
      "description": "Steadfast Enterprises Limited produces premium natural products including sugar, ginger, honey, coffee, and mozzarella cheese. Deliveries across Uganda and East Africa.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kitetika-Gayaza Rd",
        "addressLocality": "Mukono",
        "addressRegion": "Central Region",
        "addressCountry": "UG",
      },
      "sameAs": [
        "https://www.facebook.com/steadfastenterprises",
        "https://www.linkedin.com/company/steadfastenterprises",
        "https://twitter.com/steadfast_ug"
      ],
      "employee": teamMembers.map((member) => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.description,
        "image": window.location.origin + member.image,
      })),
    };
  }, [teamMembers]);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4" aria-labelledby="about-heading">
      {/* JSON-LD script for SEO/AI */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-brand-maroon">
            About Steadfast Enterprises
          </h2>
          <p className="text-base sm:text-lg text-foreground max-w-2xl mx-auto px-4">
            Creating value through quality products and exceptional service
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <div className="animate-fade-in-up">
            <img
              src={teamImg}
              alt="Steadfast Enterprises Team"
              className="rounded-xl sm:rounded-2xl shadow-strong w-full"
            />
          </div>
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-maroon">Our Mission</h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              At Steadfast Enterprises Limited, we deliver premium natural products that enhance lives across Uganda and East Africa. We source the finest quality goods while supporting local communities and sustainable practices.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Our dedication to excellence and customer satisfaction has made us a trusted name in the industry. We create lasting value through quality, integrity, and service.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-maroon/10 mb-4 sm:mb-6">
                <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-brand-maroon" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-brand-maroon">{value.title}</h4>
              <p className="text-sm sm:text-base text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-brand-maroon">Meet Our Team</h3>
          
          <PremiumCarousel
            loop={true}
            showArrows={true}
            showDots={true}
            showCounter={true}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            className="max-w-5xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <PremiumCarouselSlide key={index}>
                <div className="p-2">
                  <div
                    className={`text-center p-6 sm:p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth touch-manipulation ${
                      touchedIndex === index ? 'shadow-medium scale-[1.02]' : ''
                    }`}
                    onTouchStart={() => handleTouchStart(index)}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                  >
                    <div className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6 rounded-full bg-muted overflow-hidden transition-transform duration-300 ${
                      touchedIndex === index ? 'scale-105' : ''
                    }`}>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{member.name}</h4>
                    <p className="text-sm sm:text-base text-brand-maroon font-semibold mb-3">{member.role}</p>

                    {/* Hidden for SEO/AI */}
                    <div className="sr-only" itemScope itemType="https://schema.org/Person">
                      <p itemProp="description">{member.description}</p>
                    </div>
                  </div>
                </div>
              </PremiumCarouselSlide>
            ))}
          </PremiumCarousel>
        </div>
      </div>
    </section>
  );
};

export default About;
