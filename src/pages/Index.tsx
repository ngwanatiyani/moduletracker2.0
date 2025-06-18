
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeatureCards from "@/components/FeatureCards";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <AboutSection />
      <FeatureCards />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
