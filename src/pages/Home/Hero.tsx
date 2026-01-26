import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-home.jpg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Transforming <span className="text-primary">Domestic Work</span> in Kenya
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              Connecting verified, trained domestic workers with households through professionalism, technology, and trust.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link to="/employers">
                <Button size="lg" className="w-full sm:w-auto">
                  I'm Hiring <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/workers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  I'm a Worker
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
            <img
              src={heroImage}
              alt="Happy family with domestic worker in a modern living room"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover relative"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

