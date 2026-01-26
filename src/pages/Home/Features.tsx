import { Card } from "@/components/ui/card";
import { Shield, FileText, MapPin, Smartphone, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All workers undergo background checks and skills verification for your peace of mind."
    },
    {
      icon: FileText,
      title: "Digital Contracts",
      description: "Clear, legal contracts protect both employers and workers with transparent terms."
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Know when your worker arrives and leaves with real-time location tracking."
    },
    {
      icon: Smartphone,
      title: "Easy Payments",
      description: "Secure digital payment system ensures timely and transparent salary processing."
    },
    {
      icon: Award,
      title: "Training & Certification",
      description: "Workers receive professional training and certification for quality service."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Support workers in building professional careers with development opportunities."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose HouseAid?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing domestic work with technology, transparency, and trust
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="inline-block p-4 bg-primary text-white rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

