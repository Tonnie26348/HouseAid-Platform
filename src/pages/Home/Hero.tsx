import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-home.jpg";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 md:pt-48 pb-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Domestic Help in Kenya</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              Find Trusted Help <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                With Confidence.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              The modern way to connect with verified, professional domestic workers. 
              Safe, transparent, and built for your peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/employers">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25 hover:scale-105 transition-all">
                  Hire Professional <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/workers">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all">
                  Join as Worker
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
                  +2k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-gray-500 font-medium">Trusted by 2,000+ Kenyan homes</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={heroImage}
                alt="Professional domestic worker"
                className="w-full h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Glass Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-1/4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Verification</p>
                  <p className="text-sm font-bold">100% Background Checked</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Community</p>
                  <p className="text-sm font-bold">Verified Professionals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


