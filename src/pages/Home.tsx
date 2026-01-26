import Hero from "./Home/Hero";
import Stats from "./Home/Stats";
import Features from "./Home/Features";
import HowItWorks from "./Home/HowItWorks";
import Testimonials from "./Home/Testimonials";
import CTA from "./Home/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;