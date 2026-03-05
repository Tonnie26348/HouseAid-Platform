import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          {/* Subtle Texture Layer */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
          />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
              Ready to experience <br /> 
              the HouseAid difference?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 font-medium">
              Join thousands of Kenyan homes and professional domestic specialists already building 
              careers and households on a foundation of trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95">
                <Link to="/join">Get Started Now <ArrowRight className="ml-3 w-6 h-6" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl text-xl font-bold bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
