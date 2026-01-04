import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Products />
      <About />
      <Gallery />
      <Videos />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
